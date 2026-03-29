# Reacto Platform - Water Treatment Monitoring System

A comprehensive water treatment monitoring platform that provides real-time insights, operational guidance, and centralized management for sewage treatment plants (STPs).

## Product Brief

- Full problem statement and product structure: [REACTO_PRODUCT_BRIEF.md](REACTO_PRODUCT_BRIEF.md)
- Optimization execution roadmap: [PROJECT_OPTIMIZATION_ROADMAP.md](PROJECT_OPTIMIZATION_ROADMAP.md)

## 🌊 Features

### User Side (Hotels / Industries)
- **Real-time Dashboard**: KPI cards showing inflow, treated water, BOD, COD, turbidity, and chlorine levels
- **Live Monitoring**: Real-time sensor data with auto-refresh capabilities
- **Alert System**: Smart notifications for critical parameters with severity levels
- **Monthly Reports**: Comprehensive analytics and performance summaries
- **Operations Guidance**: Actionable guidance for plant optimization
- **Settings**: User preferences and plant configuration

### Admin Side (Service Providers)
- **Admin Dashboard**: Overview of all clients and system performance
- **Client Management**: Add, edit, and manage client accounts and plants
- **Plant Monitoring**: Centralized view of all plant statuses
- **Alert Control Center**: Manage and resolve all client alerts
- **Device Monitoring**: Track sensor health and connectivity
- **System Health**: Overall platform performance metrics

## 🏗️ Architecture

### Backend (FastAPI)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT-based secure authentication
- **Real-time**: WebSocket connections for live updates
- **Guidance Engine**: Rule-based system for operational priorities
- **APIs**: RESTful endpoints for all platform features

### Frontend (React)
- **UI Framework**: Tailwind CSS for modern, responsive design
- **State Management**: React Context API for global state
- **Real-time**: WebSocket integration for live data
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography

## 📊 Key Metrics Monitored

- **BOD** (Biochemical Oxygen Demand): ≤30 mg/L
- **COD** (Chemical Oxygen Demand): ≤250 mg/L  
- **Turbidity**: ≤5 NTU
- **Chlorine**: 0.5 mg/L (residual)
- **pH**: 6.5 - 8.5
- **Flow Rates**: Inflow, treated, and reused water volumes

## Operations Guidance System

The platform includes an intelligent advisory system that:

- **Analyzes** real-time water quality parameters
- **Detects** anomalies and potential issues
- **Recommends** specific operational actions
- **Optimizes** treatment processes
- **Ensures** regulatory compliance
- **Suggests** maintenance schedules

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- Redis (for WebSocket sessions)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run database migrations:
```bash
# Create database tables (handled automatically on first run)
```

5. Start the backend server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📱 Demo Credentials

### User Login
- **Email**: user@example.com
- **Password**: password

### Admin Login  
- **Email**: admin@example.com
- **Password**: password

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - User authentication

### User Endpoints
- `GET /user/dashboard` - Dashboard data
- `GET /user/live-monitoring` - Real-time monitoring
- `GET /user/alerts` - User alerts
- `POST /user/alerts/{id}/mark-read` - Mark alert as read
- `GET /user/monthly-summary` - Monthly analytics
- `GET /user/guidance` - Plant operational guidance

### Admin Endpoints
- `GET /admin/dashboard` - Admin overview
- `GET /admin/clients` - Client management
- `POST /admin/clients` - Create new client
- `GET /admin/plants-monitoring` - All plants status
- `GET /admin/alerts` - All alerts
- `POST /admin/alerts/{id}/resolve` - Resolve alert
- `GET /admin/devices` - Device monitoring
- `GET /admin/guidance/{plant_id}` - Plant-specific guidance

### WebSocket
- `WS /ws/{user_id}/{role}` - Real-time data connection

## 🎯 Use Cases

### Hotels & Resorts
- Monitor wastewater treatment from kitchen, laundry, and guest facilities
- Ensure compliance with environmental regulations
- Optimize water reuse for landscaping and cooling systems
- Reduce operational costs through operational guidance

### Industrial Facilities
- Track treatment of industrial effluents
- Maintain compliance with discharge standards
- Prevent environmental violations
- Optimize chemical usage and energy consumption

### Residential Complexes
- Monitor community STP performance
- Ensure treated water quality for reuse
- Track system efficiency and maintenance needs
- Provide transparency to residents

## 🔒 Security Features

- JWT-based authentication with secure token handling
- Role-based access control (User/Admin)
- Encrypted data transmission (HTTPS/WSS)
- SQL injection prevention with ORM
- CORS protection for API endpoints

## 📈 Performance Features

- Real-time WebSocket connections for live data
- Efficient database queries with proper indexing
- Responsive UI with optimized rendering
- Auto-reconnection for WebSocket connections
- Background data synchronization

## 🛠️ Development

### Project Structure
```
reacto-platform/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── models.py            # Database models
│   ├── schemas.py           # Pydantic schemas
│   ├── crud.py              # Database operations
│   ├── auth.py              # Authentication logic
│   ├── websocket.py         # WebSocket handling
│   ├── ai_guidance.py       # Operational guidance engine
│   └── database.py          # Database configuration
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # React contexts
│   │   ├── pages/           # Page components
│   │   └── App.js           # Main application
│   └── package.json
└── README.md
```

### Adding New Features

1. **Backend**: Add new endpoints in `main.py`, models in `models.py`, and business logic in `crud.py`
2. **Frontend**: Create new components in `components/`, pages in `pages/`, and update routing in `App.js`
3. **Guidance Rules**: Update operational logic in `ai_guidance.py`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🚢 Deployment

### Production Environment Files

- Backend template: `backend/.env.production.example`
- Frontend template: `frontend/.env.production.example`

Create `.env` files from these templates and set real values before deploying.

### Recommended: Full-Stack Render Blueprint

This repository includes a complete `render.yaml` blueprint with:

- `reacto-postgres` (managed PostgreSQL)
- `reacto-redis` (managed Redis)
- `reacto-backend` (FastAPI web service)
- `reacto-frontend` (React static site)

This is the best option for your website because backend, frontend, database, and cache are provisioned together and remain environment-consistent.

1. Push repository to GitHub.
2. In Render, choose New + Blueprint and connect this repo.
3. Render will detect all services from `render.yaml`.
4. Before first deploy, set these env vars:
	- Backend `CORS_ORIGINS=https://<your-frontend-domain>`
	- Frontend `REACT_APP_API_BASE_URL=https://<your-backend-domain>`
	- Frontend `REACT_APP_WS_BASE_URL=wss://<your-backend-domain>`
5. Deploy the blueprint.
6. Verify:
	- Backend root `GET /` returns API version JSON.
	- Frontend login works.
	- Live monitoring updates over WebSocket.

### Alternative Frontend Hosting (Optional)

If you prefer, you can host frontend on Vercel/Netlify and keep backend on Render.

1. Import `frontend` as app root.
2. Build command: `npm run build`
3. Publish directory: `build`
4. Set:
	- `REACT_APP_API_BASE_URL=https://<your-backend-domain>`
	- `REACT_APP_WS_BASE_URL=wss://<your-backend-domain>`
5. Redeploy and retest login + live updates.

### Enterprise Single-File Demo Deployment

For quick sharing of `enterprise-ui.html`, deploy it as a static site (Netlify Drop, GitHub Pages, or Vercel static project).

## 📱 Android Browser Compatibility Checklist

The project now includes Android-focused viewport and metadata updates (including `viewport-fit=cover`, PWA-capable tags, and dynamic viewport height usage where needed).

Before release, verify on at least one Android Chrome device:

1. Login page fits screen without horizontal scroll.
2. Sidebar remains fixed while main content scrolls.
3. Charts render fully without clipping or large empty gaps.
4. Touch interactions work on tabs, buttons, and cards.
5. Address-bar show/hide does not break full-height layouts.
6. WebSocket reconnect works after temporary network loss.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common issues

## 🌟 Future Enhancements

- Mobile app for iOS and Android
- Advanced machine learning models
- Integration with IoT sensor networks
- Automated chemical dosing control
- Predictive maintenance algorithms
- Multi-tenant architecture
- Advanced reporting and analytics
- Integration with regulatory systems
- SMS and email notifications
- Mobile push notifications
