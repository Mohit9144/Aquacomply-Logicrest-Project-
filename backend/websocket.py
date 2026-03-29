from fastapi import WebSocket, WebSocketDisconnect
from typing import List, Dict
import json
import asyncio
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {
            "user": [],
            "admin": []
        }
        self.user_connections: Dict[int, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, user_id: int, role: str):
        await websocket.accept()
        if role not in self.active_connections:
            await websocket.close(code=1008)
            logger.warning(f"Rejected connection for unsupported role: {role}")
            return

        self.active_connections[role].append(websocket)
        
        if user_id not in self.user_connections:
            self.user_connections[user_id] = []
        self.user_connections[user_id].append(websocket)
        
        logger.info(f"User {user_id} ({role}) connected")

    def disconnect(self, websocket: WebSocket, user_id: int, role: str):
        if role in self.active_connections and websocket in self.active_connections[role]:
            self.active_connections[role].remove(websocket)
        
        if user_id in self.user_connections and websocket in self.user_connections[user_id]:
            self.user_connections[user_id].remove(websocket)
            if not self.user_connections[user_id]:
                del self.user_connections[user_id]
        
        logger.info(f"User {user_id} ({role}) disconnected")

    async def send_personal_message(self, message: str, user_id: int):
        if user_id in self.user_connections:
            disconnected = []
            for connection in self.user_connections[user_id]:
                try:
                    await connection.send_text(message)
                except Exception:
                    disconnected.append(connection)
            
            # Clean up disconnected connections
            for conn in disconnected:
                self.user_connections[user_id].remove(conn)

    async def broadcast_to_role(self, message: str, role: str):
        if role not in self.active_connections:
            return

        disconnected = []
        for connection in self.active_connections[role]:
            try:
                await connection.send_text(message)
            except Exception:
                disconnected.append(connection)
        
        # Clean up disconnected connections
        for conn in disconnected:
            self.active_connections[role].remove(conn)

    async def broadcast_to_all(self, message: str):
        await self.broadcast_to_role(message, "user")
        await self.broadcast_to_role(message, "admin")

manager = ConnectionManager()

async def websocket_endpoint(websocket: WebSocket, user_id: int, role: str):
    if role not in {"user", "admin"}:
        await websocket.close(code=1008)
        return

    await manager.connect(websocket, user_id, role)
    try:
        while True:
            # Keep connection alive and handle incoming messages
            data = await websocket.receive_text()
            try:
                message_data = json.loads(data)
                # Handle different message types
                if message_data.get("type") == "ping":
                    await websocket.send_text(json.dumps({"type": "pong"}))
                elif message_data.get("type") == "subscribe":
                    # Handle subscription to specific data streams
                    await handle_subscription(websocket, user_id, message_data)
            except json.JSONDecodeError:
                logger.error(f"Invalid JSON received from user {user_id}")
    except WebSocketDisconnect:
        manager.disconnect(websocket, user_id, role)

async def handle_subscription(websocket: WebSocket, user_id: int, data: dict):
    """Handle subscription to specific data streams"""
    subscription_type = data.get("subscription")
    
    if subscription_type == "live_data":
        # Send current live data
        from crud import get_live_monitoring_data
        from database import get_db
        
        db = next(get_db())
        try:
            live_data = get_live_monitoring_data(db, user_id)
            if live_data:
                await websocket.send_text(json.dumps({
                    "type": "live_data_update",
                    "data": live_data
                }))
        finally:
            db.close()

# Real-time data broadcasting functions
async def broadcast_sensor_update(sensor_data: dict):
    """Broadcast sensor data updates to relevant users"""
    message = json.dumps({
        "type": "sensor_update",
        "data": sensor_data,
        "timestamp": datetime.utcnow().isoformat()
    })
    
    # Send to admin users
    await manager.broadcast_to_role(message, "admin")
    
    # Send to specific user if we have plant information
    # This would need to be implemented based on your data structure

async def broadcast_alert(alert_data: dict):
    """Broadcast new alerts to relevant users"""
    message = json.dumps({
        "type": "new_alert",
        "data": alert_data,
        "timestamp": datetime.utcnow().isoformat()
    })
    
    # Send to admin users
    await manager.broadcast_to_role(message, "admin")
    
    # Send to specific user
    if "user_id" in alert_data:
        await manager.send_personal_message(message, alert_data["user_id"])

async def broadcast_plant_status_update(plant_data: dict):
    """Broadcast plant status updates"""
    message = json.dumps({
        "type": "plant_status_update",
        "data": plant_data,
        "timestamp": datetime.utcnow().isoformat()
    })
    
    # Send to admin users
    await manager.broadcast_to_role(message, "admin")

# Background task to simulate real-time data updates
async def simulate_real_time_data():
    """Simulate real-time sensor data for demonstration"""
    import random
    
    while True:
        # Simulate sensor data updates
        sensor_data = {
            "sensor_id": random.randint(1, 10),
            "sensor_type": random.choice(["BOD", "COD", "Turbidity", "Flow"]),
            "value": round(random.uniform(10, 100), 2),
            "unit": "mg/L",
            "status": "online"
        }
        
        await broadcast_sensor_update(sensor_data)
        
        # Simulate occasional alerts
        if random.random() < 0.1:  # 10% chance
            alert_data = {
                "alert_type": random.choice(["High BOD", "High COD", "Sensor Failure"]),
                "severity": random.choice(["low", "medium", "high", "critical"]),
                "message": "Simulated alert for demonstration",
                "user_id": 1  # Would be dynamic in real implementation
            }
            await broadcast_alert(alert_data)
        
        await asyncio.sleep(5)  # Update every 5 seconds
