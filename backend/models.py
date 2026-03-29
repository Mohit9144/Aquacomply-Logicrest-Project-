from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime
import enum

class UserRole(enum.Enum):
    USER = "user"
    ADMIN = "admin"

class AlertSeverity(enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class AlertStatus(enum.Enum):
    ACTIVE = "active"
    READ = "read"
    RESOLVED = "resolved"

class DeviceStatus(enum.Enum):
    ONLINE = "online"
    OFFLINE = "offline"
    WARNING = "warning"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    company_name = Column(String, nullable=False)
    phone = Column(String)
    role = Column(Enum(UserRole), default=UserRole.USER)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    plants = relationship("Plant", back_populates="user")
    alerts = relationship("Alert", back_populates="user")

class Plant(Base):
    __tablename__ = "plants"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    plant_name = Column(String, nullable=False)
    plant_type = Column(String)  # Hotel, Industry, Residential
    capacity_mld = Column(Float)  # Million Liters per Day
    location = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="plants")
    sensors = relationship("Sensor", back_populates="plant")
    water_quality_data = relationship("WaterQualityData", back_populates="plant")
    alerts = relationship("Alert", back_populates="plant")

class Sensor(Base):
    __tablename__ = "sensors"
    
    id = Column(Integer, primary_key=True, index=True)
    plant_id = Column(Integer, ForeignKey("plants.id"), nullable=False)
    sensor_type = Column(String, nullable=False)  # BOD, COD, Turbidity, Chlorine, Flow
    sensor_name = Column(String, nullable=False)
    model = Column(String)
    installation_date = Column(DateTime)
    last_maintenance = Column(DateTime)
    status = Column(Enum(DeviceStatus), default=DeviceStatus.ONLINE)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    plant = relationship("Plant", back_populates="sensors")
    sensor_data = relationship("SensorData", back_populates="sensor")

class SensorData(Base):
    __tablename__ = "sensor_data"
    
    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(Integer, ForeignKey("sensors.id"), nullable=False)
    value = Column(Float, nullable=False)
    unit = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    is_valid = Column(Boolean, default=True)
    
    # Relationships
    sensor = relationship("Sensor", back_populates="sensor_data")

class WaterQualityData(Base):
    __tablename__ = "water_quality_data"
    
    id = Column(Integer, primary_key=True, index=True)
    plant_id = Column(Integer, ForeignKey("plants.id"), nullable=False)
    inflow_mld = Column(Float)
    treated_water_mld = Column(Float)
    reused_water_mld = Column(Float)
    bod_level = Column(Float)  # mg/L
    cod_level = Column(Float)  # mg/L
    turbidity_ntu = Column(Float)  # NTU
    chlorine_level = Column(Float)  # mg/L
    ph_level = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    plant = relationship("Plant", back_populates="water_quality_data")

class Alert(Base):
    __tablename__ = "alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    plant_id = Column(Integer, ForeignKey("plants.id"), nullable=False)
    alert_type = Column(String, nullable=False)  # High BOD, High COD, Sensor Failure, etc.
    severity = Column(Enum(AlertSeverity), nullable=False)
    status = Column(Enum(AlertStatus), default=AlertStatus.ACTIVE)
    message = Column(Text, nullable=False)
    recommended_action = Column(Text)
    threshold_value = Column(Float)
    actual_value = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime)
    resolved_by = Column(Integer, ForeignKey("users.id"))
    
    # Relationships
    user = relationship("User", back_populates="alerts", foreign_keys=[user_id])
    plant = relationship("Plant", back_populates="alerts")

class MaintenanceLog(Base):
    __tablename__ = "maintenance_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    plant_id = Column(Integer, ForeignKey("plants.id"), nullable=False)
    maintenance_type = Column(String, nullable=False)
    description = Column(Text)
    performed_by = Column(String)
    cost = Column(Float)
    next_maintenance_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    plant = relationship("Plant")

class SystemSettings(Base):
    __tablename__ = "system_settings"
    
    id = Column(Integer, primary_key=True, index=True)
    setting_key = Column(String, unique=True, nullable=False)
    setting_value = Column(Text)
    description = Column(Text)
    updated_at = Column(DateTime, default=datetime.utcnow)
