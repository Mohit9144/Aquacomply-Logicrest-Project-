from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from models import UserRole, AlertSeverity, AlertStatus, DeviceStatus

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    company_name: str
    phone: Optional[str] = None
    role: UserRole = UserRole.USER

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Plant Schemas
class PlantBase(BaseModel):
    plant_name: str
    plant_type: str
    capacity_mld: Optional[float] = None
    location: Optional[str] = None

class PlantCreate(PlantBase):
    pass

class Plant(PlantBase):
    id: int
    user_id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Sensor Schemas
class SensorBase(BaseModel):
    sensor_type: str
    sensor_name: str
    model: Optional[str] = None

class Sensor(SensorBase):
    id: int
    plant_id: int
    status: DeviceStatus
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Water Quality Data Schemas
class WaterQualityDataBase(BaseModel):
    inflow_mld: Optional[float] = None
    treated_water_mld: Optional[float] = None
    reused_water_mld: Optional[float] = None
    bod_level: Optional[float] = None
    cod_level: Optional[float] = None
    turbidity_ntu: Optional[float] = None
    chlorine_level: Optional[float] = None
    ph_level: Optional[float] = None

class WaterQualityData(WaterQualityDataBase):
    id: int
    plant_id: int
    timestamp: datetime
    
    class Config:
        from_attributes = True

# Alert Schemas
class AlertBase(BaseModel):
    alert_type: str
    severity: AlertSeverity
    message: str
    recommended_action: Optional[str] = None
    threshold_value: Optional[float] = None
    actual_value: Optional[float] = None

class AlertCreate(AlertBase):
    plant_id: int

class Alert(AlertBase):
    id: int
    user_id: int
    plant_id: int
    status: AlertStatus
    created_at: datetime
    resolved_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Dashboard Schemas
class KPIData(BaseModel):
    title: str
    value: float
    unit: str
    status: str  # normal, warning, critical
    trend: Optional[str] = None  # up, down, stable

class UserDashboardResponse(BaseModel):
    kpis: List[KPIData]
    recent_alerts: List[Alert]
    latest_water_quality: WaterQualityData
    plant_info: Plant

class AdminDashboardResponse(BaseModel):
    total_clients: int
    active_plants: int
    total_water_processed: float
    active_alerts: int
    recent_alerts: List[Alert]
    plants_status: List[dict]

class ClientCreate(BaseModel):
    email: EmailStr
    full_name: str
    company_name: str
    phone: Optional[str] = None
    password: str
    plant: PlantCreate

class MonitoringData(BaseModel):
    plant_id: int
    plant_name: str
    bod_level: Optional[float] = None
    cod_level: Optional[float] = None
    turbidity: Optional[float] = None
    status: str
    last_update: datetime

class DeviceInfo(BaseModel):
    plant_id: int
    plant_name: str
    device_name: str
    device_type: str
    status: DeviceStatus
    last_data_time: Optional[datetime] = None
    data_delay_minutes: Optional[int] = None

class MonthlySummary(BaseModel):
    month: str
    avg_bod: float
    avg_cod: float
    total_water_treated: float
    total_water_reused: float
    efficiency_percentage: float
