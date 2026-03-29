from fastapi import FastAPI, Depends, HTTPException, status, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, engine
import models
import schemas
import auth
import crud
import uvicorn
from websocket import websocket_endpoint, simulate_real_time_data, broadcast_sensor_update, broadcast_alert
from ai_guidance import advisor
import asyncio
import logging
import random
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Reacto Platform API", version="1.0.0")


def _get_cors_origins() -> list[str]:
    """Read CORS origins from env as comma-separated URLs."""
    raw_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
    origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]
    return origins or ["http://localhost:3000"]


cors_origins = _get_cors_origins()
allow_all_origins = cors_origins == ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=not allow_all_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Reacto Platform API", "version": "1.0.0"}

@app.post("/auth/login")
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "user": user}

# User Dashboard Endpoints
@app.get("/user/dashboard")
def get_user_dashboard(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    """Get user dashboard with KPI data"""
    dashboard_data = crud.get_user_dashboard_data(db, current_user.id)
    return dashboard_data

@app.get("/user/live-monitoring")
def get_live_monitoring(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    """Get live monitoring data"""
    live_data = crud.get_live_monitoring_data(db, current_user.id)
    return live_data

@app.get("/user/alerts")
def get_user_alerts(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    """Get user alerts"""
    alerts = crud.get_user_alerts(db, current_user.id)
    return alerts

@app.post("/user/alerts/{alert_id}/mark-read")
def mark_alert_read(alert_id: int, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    """Mark alert as read"""
    success = crud.mark_alert_as_read(db, alert_id, current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Alert not found")
    return {"message": "Alert marked as read"}

@app.get("/user/monthly-summary")
def get_monthly_summary(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    """Get monthly summary data"""
    summary = crud.get_monthly_summary(db, current_user.id)
    return summary

# Admin Dashboard Endpoints
@app.get("/admin/dashboard")
def get_admin_dashboard(current_user: models.User = Depends(auth.get_current_admin), db: Session = Depends(get_db)):
    """Get admin dashboard with overview of all clients"""
    dashboard_data = crud.get_admin_dashboard_data(db)
    return dashboard_data

@app.get("/admin/clients")
def get_clients(current_user: models.User = Depends(auth.get_current_admin), db: Session = Depends(get_db)):
    """Get all clients"""
    clients = crud.get_all_clients(db)
    return clients

@app.post("/admin/clients")
def create_client(client: schemas.ClientCreate, current_user: models.User = Depends(auth.get_current_admin), db: Session = Depends(get_db)):
    """Create new client"""
    try:
        return crud.create_client(db, client)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

@app.get("/admin/plants-monitoring")
def get_all_plants_monitoring(current_user: models.User = Depends(auth.get_current_admin), db: Session = Depends(get_db)):
    """Get monitoring data for all plants"""
    plants_data = crud.get_all_plants_monitoring(db)
    return plants_data

@app.get("/admin/alerts")
def get_all_alerts(current_user: models.User = Depends(auth.get_current_admin), db: Session = Depends(get_db)):
    """Get all client alerts"""
    alerts = crud.get_all_alerts(db)
    return alerts

@app.post("/admin/alerts/{alert_id}/resolve")
def resolve_alert(alert_id: int, current_user: models.User = Depends(auth.get_current_admin), db: Session = Depends(get_db)):
    """Resolve alert"""
    success = crud.resolve_alert(db, alert_id)
    if not success:
        raise HTTPException(status_code=404, detail="Alert not found")
    return {"message": "Alert resolved"}

@app.get("/admin/devices")
def get_device_monitoring(current_user: models.User = Depends(auth.get_current_admin), db: Session = Depends(get_db)):
    """Get device monitoring data"""
    devices = crud.get_device_monitoring(db)
    return devices

# WebSocket endpoint
@app.websocket("/ws/{user_id}/{role}")
async def websocket_route(websocket: WebSocket, user_id: int, role: str):
    await websocket_endpoint(websocket, user_id, role)


def _build_water_data_payload(data: models.WaterQualityData) -> dict:
    """Map water-quality ORM row into advisor input payload."""
    return {
        "bod_level": data.bod_level,
        "cod_level": data.cod_level,
        "turbidity_ntu": data.turbidity_ntu,
        "chlorine_level": data.chlorine_level,
        "ph_level": data.ph_level,
        "inflow_mld": data.inflow_mld,
        "treated_water_mld": data.treated_water_mld,
        "reused_water_mld": data.reused_water_mld,
    }

@app.on_event("startup")
async def startup_event():
    """Start background tasks"""
    # Start the real-time data simulation
    asyncio.create_task(simulate_real_time_data())
    logger.info("Reacto Platform API started with WebSocket support")

# Test endpoints for demonstration
@app.post("/test/sensor-data")
async def test_sensor_data():
    """Test endpoint to simulate sensor data"""
    sensor_data = {
        "sensor_id": random.randint(1, 10),
        "sensor_type": random.choice(["BOD", "COD", "Turbidity", "Flow"]),
        "value": round(random.uniform(10, 100), 2),
        "unit": "mg/L",
        "status": "online"
    }

    await broadcast_sensor_update(sensor_data)
    return {"message": "Sensor data broadcasted", "data": sensor_data}

@app.post("/test/alert")
async def test_alert():
    """Test endpoint to simulate alerts"""
    alert_data = {
        "alert_type": random.choice(["High BOD", "High COD", "Sensor Failure"]),
        "severity": random.choice(["low", "medium", "high", "critical"]),
        "message": "Test alert for demonstration",
        "user_id": 1
    }

    await broadcast_alert(alert_data)
    return {"message": "Alert broadcasted", "data": alert_data}

# AI Guidance endpoints
@app.get("/user/guidance")
def get_ai_guidance(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    """Get AI-powered operational guidance"""
    # Get latest water quality data for the user
    latest_data = crud.get_user_dashboard_data(db, current_user.id)
    
    if not latest_data or not latest_data.latest_water_quality:
        return {"message": "No data available for analysis"}
    
    # Convert to dict for analysis
    water_data = _build_water_data_payload(latest_data.latest_water_quality)

    guidance = advisor.get_operational_guidance(water_data)
    return guidance

@app.get("/admin/guidance/{plant_id}")
def get_admin_guidance(plant_id: int, current_user: models.User = Depends(auth.get_current_admin), db: Session = Depends(get_db)):
    """Get AI guidance for specific plant (admin only)"""
    # Get latest water quality data for the plant
    from sqlalchemy import desc
    latest_data = db.query(models.WaterQualityData).filter(
        models.WaterQualityData.plant_id == plant_id
    ).order_by(desc(models.WaterQualityData.timestamp)).first()
    
    if not latest_data:
        return {"message": "No data available for analysis"}
    
    # Convert to dict for analysis
    water_data = _build_water_data_payload(latest_data)

    guidance = advisor.get_operational_guidance(water_data)
    return guidance

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
