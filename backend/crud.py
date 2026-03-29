from sqlalchemy.orm import Session
from sqlalchemy import desc, func, and_
from models import User, Plant, WaterQualityData, Alert, Sensor, SensorData, DeviceStatus, AlertStatus
from schemas import KPIData, UserDashboardResponse, AdminDashboardResponse, MonitoringData, DeviceInfo, MonthlySummary
from datetime import datetime, timedelta
from typing import Dict


def _get_latest_water_quality_by_plant(db: Session, plant_ids: list[int]) -> Dict[int, WaterQualityData]:
    """Fetch latest water-quality row per plant in a single query."""
    if not plant_ids:
        return {}

    latest_subquery = (
        db.query(
            WaterQualityData.plant_id.label("plant_id"),
            func.max(WaterQualityData.timestamp).label("max_timestamp"),
        )
        .filter(WaterQualityData.plant_id.in_(plant_ids))
        .group_by(WaterQualityData.plant_id)
        .subquery()
    )

    latest_rows = (
        db.query(WaterQualityData)
        .join(
            latest_subquery,
            and_(
                WaterQualityData.plant_id == latest_subquery.c.plant_id,
                WaterQualityData.timestamp == latest_subquery.c.max_timestamp,
            ),
        )
        .all()
    )
    return {row.plant_id: row for row in latest_rows}


def _get_latest_sensor_data_by_sensor(db: Session, sensor_ids: list[int]) -> Dict[int, SensorData]:
    """Fetch latest sensor-data row per sensor in a single query."""
    if not sensor_ids:
        return {}

    latest_subquery = (
        db.query(
            SensorData.sensor_id.label("sensor_id"),
            func.max(SensorData.timestamp).label("max_timestamp"),
        )
        .filter(SensorData.sensor_id.in_(sensor_ids))
        .group_by(SensorData.sensor_id)
        .subquery()
    )

    latest_rows = (
        db.query(SensorData)
        .join(
            latest_subquery,
            and_(
                SensorData.sensor_id == latest_subquery.c.sensor_id,
                SensorData.timestamp == latest_subquery.c.max_timestamp,
            ),
        )
        .all()
    )
    return {row.sensor_id: row for row in latest_rows}


def _derive_plant_status(latest_data: WaterQualityData | None) -> str:
    if not latest_data:
        return "normal"

    if (latest_data.turbidity_ntu or 0) > 5:
        return "critical"
    if (latest_data.bod_level or 0) > 30 or (latest_data.cod_level or 0) > 250:
        return "warning"
    return "normal"

# User Dashboard CRUD
def get_user_dashboard_data(db: Session, user_id: int):
    """Get user dashboard with KPI data"""
    # Get user's plant
    plant = db.query(Plant).filter(Plant.user_id == user_id, Plant.is_active.is_(True)).first()
    if not plant:
        return None
    
    # Get latest water quality data
    latest_data = db.query(WaterQualityData).filter(
        WaterQualityData.plant_id == plant.id
    ).order_by(desc(WaterQualityData.timestamp)).first()
    
    # Generate KPIs
    kpis = []
    if latest_data:
        kpis = [
            KPIData(
                title="Inflow",
                value=latest_data.inflow_mld or 0,
                unit="MLD",
                status="normal",
                trend="stable"
            ),
            KPIData(
                title="Treated Water",
                value=latest_data.treated_water_mld or 0,
                unit="MLD",
                status="normal",
                trend="up"
            ),
            KPIData(
                title="Reused Water",
                value=latest_data.reused_water_mld or 0,
                unit="MLD",
                status="normal",
                trend="up"
            ),
            KPIData(
                title="BOD",
                value=latest_data.bod_level or 0,
                unit="mg/L",
                status="critical" if (latest_data.bod_level or 0) > 30 else "normal",
                trend="down" if latest_data.bod_level and latest_data.bod_level < 30 else "up"
            ),
            KPIData(
                title="COD",
                value=latest_data.cod_level or 0,
                unit="mg/L",
                status="warning" if (latest_data.cod_level or 0) > 250 else "normal",
                trend="stable"
            ),
            KPIData(
                title="Turbidity",
                value=latest_data.turbidity_ntu or 0,
                unit="NTU",
                status="critical" if (latest_data.turbidity_ntu or 0) > 5 else "normal",
                trend="down"
            ),
            KPIData(
                title="Chlorine",
                value=latest_data.chlorine_level or 0,
                unit="mg/L",
                status="normal",
                trend="stable"
            )
        ]
    
    # Get recent alerts
    recent_alerts = db.query(Alert).filter(
        Alert.user_id == user_id,
        Alert.status != AlertStatus.RESOLVED
    ).order_by(desc(Alert.created_at)).limit(5).all()
    
    return UserDashboardResponse(
        kpis=kpis,
        recent_alerts=recent_alerts,
        latest_water_quality=latest_data,
        plant_info=plant
    )

def get_live_monitoring_data(db: Session, user_id: int):
    """Get live monitoring data"""
    plant = db.query(Plant).filter(Plant.user_id == user_id, Plant.is_active.is_(True)).first()
    if not plant:
        return None

    # Get latest sensor data
    sensors = db.query(Sensor).filter(Sensor.plant_id == plant.id, Sensor.is_active.is_(True)).all()
    latest_by_sensor = _get_latest_sensor_data_by_sensor(db, [sensor.id for sensor in sensors])

    monitoring_data = []
    for sensor in sensors:
        latest_reading = latest_by_sensor.get(sensor.id)

        if latest_reading:
            monitoring_data.append({
                "sensor_name": sensor.sensor_name,
                "sensor_type": sensor.sensor_type,
                "value": latest_reading.value,
                "unit": latest_reading.unit,
                "timestamp": latest_reading.timestamp,
                "status": sensor.status.value
            })
    
    return {
        "plant_name": plant.plant_name,
        "sensors": monitoring_data,
        "last_update": datetime.utcnow()
    }

def get_user_alerts(db: Session, user_id: int):
    """Get user alerts"""
    return db.query(Alert).filter(
        Alert.user_id == user_id
    ).order_by(desc(Alert.created_at)).all()

def mark_alert_as_read(db: Session, alert_id: int, user_id: int):
    """Mark alert as read"""
    alert = db.query(Alert).filter(
        Alert.id == alert_id,
        Alert.user_id == user_id
    ).first()
    
    if alert:
        alert.status = AlertStatus.READ
        db.commit()
        return True
    return False

def get_monthly_summary(db: Session, user_id: int):
    """Get monthly summary data"""
    plant = db.query(Plant).filter(Plant.user_id == user_id, Plant.is_active.is_(True)).first()
    if not plant:
        return None
    
    # Get data for the current month
    current_month = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    monthly_data = db.query(WaterQualityData).filter(
        WaterQualityData.plant_id == plant.id,
        WaterQualityData.timestamp >= current_month
    ).all()
    
    if not monthly_data:
        return None
    
    # Calculate averages and totals
    avg_bod = sum(data.bod_level or 0 for data in monthly_data) / len(monthly_data)
    avg_cod = sum(data.cod_level or 0 for data in monthly_data) / len(monthly_data)
    total_treated = sum(data.treated_water_mld or 0 for data in monthly_data)
    total_reused = sum(data.reused_water_mld or 0 for data in monthly_data)
    
    efficiency = (total_reused / total_treated * 100) if total_treated > 0 else 0
    
    return MonthlySummary(
        month=current_month.strftime("%B %Y"),
        avg_bod=avg_bod,
        avg_cod=avg_cod,
        total_water_treated=total_treated,
        total_water_reused=total_reused,
        efficiency_percentage=efficiency
    )

# Admin Dashboard CRUD
def get_admin_dashboard_data(db: Session):
    """Get admin dashboard with overview of all clients"""
    total_clients = db.query(User).filter(User.role == "user").count()
    plants = db.query(Plant).filter(Plant.is_active.is_(True)).all()
    active_plants = len(plants)
    
    # Calculate total water processed in last 30 days
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    total_water_processed = db.query(func.sum(WaterQualityData.treated_water_mld)).filter(
        WaterQualityData.timestamp >= thirty_days_ago
    ).scalar() or 0
    
    active_alerts = db.query(Alert).filter(Alert.status == AlertStatus.ACTIVE).count()
    
    # Get recent alerts
    recent_alerts = db.query(Alert).order_by(desc(Alert.created_at)).limit(10).all()
    
    # Get plants status
    latest_by_plant = _get_latest_water_quality_by_plant(db, [plant.id for plant in plants])
    plants_status = []
    for plant in plants:
        latest_data = latest_by_plant.get(plant.id)

        plants_status.append({
            "plant_id": plant.id,
            "plant_name": plant.plant_name,
            "company": plant.user.company_name,
            "status": _derive_plant_status(latest_data),
            "last_update": latest_data.timestamp if latest_data else None
        })
    
    return AdminDashboardResponse(
        total_clients=total_clients,
        active_plants=active_plants,
        total_water_processed=total_water_processed,
        active_alerts=active_alerts,
        recent_alerts=recent_alerts,
        plants_status=plants_status
    )

def get_all_clients(db: Session):
    """Get all clients"""
    return db.query(User).filter(User.role == "user").all()

def create_client(db: Session, client_data):
    """Create new client along with a primary plant."""
    existing = db.query(User).filter(User.email == client_data.email).first()
    if existing:
        raise ValueError("Client with this email already exists")

    from auth import get_password_hash

    user = User(
        email=client_data.email,
        full_name=client_data.full_name,
        company_name=client_data.company_name,
        phone=client_data.phone,
        password_hash=get_password_hash(client_data.password),
    )
    db.add(user)
    db.flush()

    plant = Plant(
        user_id=user.id,
        plant_name=client_data.plant.plant_name,
        plant_type=client_data.plant.plant_type,
        capacity_mld=client_data.plant.capacity_mld,
        location=client_data.plant.location,
        is_active=True,
    )
    db.add(plant)
    db.commit()
    db.refresh(user)
    db.refresh(plant)

    return {
        "user": user,
        "plant": plant,
        "message": "Client created successfully",
    }

def get_all_plants_monitoring(db: Session):
    """Get monitoring data for all plants"""
    plants = db.query(Plant).filter(Plant.is_active.is_(True)).all()
    latest_by_plant = _get_latest_water_quality_by_plant(db, [plant.id for plant in plants])
    monitoring_data = []

    for plant in plants:
        latest_data = latest_by_plant.get(plant.id)

        monitoring_data.append(MonitoringData(
            plant_id=plant.id,
            plant_name=plant.plant_name,
            bod_level=latest_data.bod_level if latest_data else None,
            cod_level=latest_data.cod_level if latest_data else None,
            turbidity=latest_data.turbidity_ntu if latest_data else None,
            status=_derive_plant_status(latest_data),
            last_update=latest_data.timestamp if latest_data else datetime.utcnow()
        ))
    
    return monitoring_data

def get_all_alerts(db: Session):
    """Get all client alerts"""
    return db.query(Alert).order_by(desc(Alert.created_at)).all()

def resolve_alert(db: Session, alert_id: int):
    """Resolve alert"""
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if alert:
        alert.status = AlertStatus.RESOLVED
        alert.resolved_at = datetime.utcnow()
        db.commit()
        return True
    return False

def get_device_monitoring(db: Session):
    """Get device monitoring data"""
    sensors = db.query(Sensor).all()
    latest_by_sensor = _get_latest_sensor_data_by_sensor(db, [sensor.id for sensor in sensors])
    devices = []

    for sensor in sensors:
        latest_data = latest_by_sensor.get(sensor.id)

        data_delay = None
        if latest_data:
            delay = datetime.utcnow() - latest_data.timestamp
            data_delay = int(delay.total_seconds() / 60)
        
        devices.append(DeviceInfo(
            plant_id=sensor.plant_id,
            plant_name=sensor.plant.plant_name,
            device_name=sensor.sensor_name,
            device_type=sensor.sensor_type,
            status=sensor.status,
            last_data_time=latest_data.timestamp if latest_data else None,
            data_delay_minutes=data_delay
        ))
    
    return devices
