# Reacto Project Optimization Roadmap

This roadmap tracks end-to-end optimization from prototype quality to production readiness.

## Phase 1: Core Runtime (Completed)

1. Backend query optimization
- Removed repeated N+1 DB lookups in plant and sensor monitoring paths.
- Added batched latest-record loaders for plant water quality and sensor data.

2. API and logic cleanup
- Centralized water-quality payload mapping for operations guidance.
- Removed redundant imports and repeated runtime work.

3. Reliability hardening
- Added WebSocket role validation and safer disconnect handling.
- Added DB connection health checks with `pool_pre_ping`.

4. Feature completeness
- Implemented admin client creation flow (user + plant in one transaction path).

## Phase 2: Backend Performance and Security (Next)

1. Add DB indexes
- `water_quality_data (plant_id, timestamp)`
- `sensor_data (sensor_id, timestamp)`
- `alerts (user_id, status, created_at)`

2. Pagination and filtering
- Add pagination for `/admin/alerts`, `/admin/clients`, `/admin/plants-monitoring`.

3. Caching
- Cache admin dashboard aggregates for short windows (30-60 seconds).

4. Security improvements
- Restrict CORS origins by environment.
- Rate-limit auth and test endpoints.
- Move test endpoints behind feature flag for non-production usage.

## Phase 3: Frontend Optimization

1. Rendering and load
- Split route bundles and lazy-load heavy pages.
- Memoize expensive dashboard visual components.

2. Data flow
- Debounce search/filter interactions in admin views.
- Add stale-while-revalidate patterns for dashboard data.

3. UX resilience
- Add skeleton loaders and retry states.
- Improve offline and websocket reconnect handling.

## Phase 4: Platform and Operations

1. Observability
- Add request timing, structured logs, and error tracing.

2. CI checks
- Lint, type-check, and basic API smoke tests on each push.

3. Deployment readiness
- Environment-specific settings and secrets policy.
- Healthcheck endpoints and graceful startup/shutdown.

## Suggested KPIs for Optimization

- API p95 latency for dashboard endpoints
- WebSocket reconnect success rate
- Admin dashboard query time
- Time-to-interactive for user and admin dashboards
- Error rate by endpoint and role
