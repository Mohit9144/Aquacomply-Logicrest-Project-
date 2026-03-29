# Reacto Platform: Full Problem Statement and Product Structure

## 1. Problem Statement

### Context
Across hotels, industrial units, and residential complexes, small-scale Sewage Treatment Plants (STPs) are deployed to treat wastewater. Most are still manually operated, weakly monitored, and not guided by actionable intelligence.

At the same time, regulatory expectations are increasing. Bulk users are expected to consistently meet discharge and reuse quality norms (BOD, COD, turbidity, chlorination, pH) while controlling operational cost.

### Core Problem
Most bulk users have STPs installed but still lack visibility, intelligence, and guidance to run them efficiently.

## 2. Current Pain Points

1. Lack of real-time monitoring
- Manual readings or periodic checks dominate operations.
- No continuous, reliable tracking of BOD, COD, turbidity, chlorination, and flow.
- Impact: delayed detection and inconsistent treatment quality.

2. No technical guidance for operators
- Teams can see numbers but cannot map readings to actions.
- Example: BOD spikes without an immediate action cue.
- Impact: trial-and-error operations and poor process stability.

3. Reactive operations instead of proactive management
- Problems are identified after threshold breaches.
- No predictive warning or early intervention support.
- Impact: sudden failures, compliance risk, and emergency handling.

4. No visibility for business owners
- Owners/management lack meaningful dashboards and summaries.
- Impact: weak accountability and low decision confidence.

5. Underutilization of treated water
- Recovered water is often not reused effectively.
- Impact: higher freshwater purchase and resource wastage.

6. No centralized view for service providers
- Multi-plant service teams cannot monitor all clients in one control center.
- Impact: delayed support and poor scaling of service quality.

7. Device/PLC data not converted to value
- Sensor and PLC streams exist, but are not well visualized or interpreted.
- Impact: data collection without operational intelligence.

## 3. Business and Environmental Impact

These issues lead to:
- Poor treatment performance and variable discharge quality
- Increased operational cost and avoidable downtime
- Higher environmental non-compliance risk
- Loss of water reuse potential
- Low scalability for service providers managing multiple plants

## 4. Product Opportunity

A single platform can solve this by combining:
- Real-time visibility into plant health
- Actionable operational cues from raw telemetry
- Guided operations for non-expert users
- Centralized remote monitoring for admin/service teams
- Better reuse tracking and optimization

## 5. Positioning

### One-line problem summary
Bulk users have STPs, but they lack visibility, intelligence, and guidance to operate them efficiently.

### Positioning statement
The problem is not the absence of treatment systems, it is the absence of intelligence and usability around them.

## 6. Product Structure

Reacto Platform has two operating surfaces:

1. User Side (Hotels/Industries)
- Objective: simple, clear, actionable
- Outcome: users understand plant condition in 5 seconds and know what to do next

2. Admin Side (Service Provider Team)
- Objective: control, monitoring, scale
- Outcome: admins can monitor all clients, prioritize issues, and support proactively

## 7. User Side Modules

1. Dashboard (main screen)
- KPIs: inflow, treated water, reused water, BOD, COD, turbidity, chlorine level
- Visual logic: color-coded status (normal/warning/critical)
- UI blocks: KPI cards, short trend chart (last 24h), overall status indicator

2. Live monitoring panel
- Real-time values updating every few seconds
- Sensor health indicators (online/offline, delay)
- Compact time-series visuals

3. Alert system
- Alert types: high BOD, high COD, turbidity breach, sensor failure
- Severity bands: critical/warning
- Actions: mark as read, track state

4. Monthly summary
- BOD average, COD average, total water treated
- Reuse and compliance trend view

5. Settings
- Profile and plant details
- Alert preferences and basic controls

## 8. Admin Side Modules

1. Admin dashboard
- KPIs: total clients, active plants, total processed water, alerts count
- Global system health and operational snapshot

2. Client management
- Client list, plant records, add/edit workflows
- Search and filter for operations teams

3. Live monitoring (all plants)
- Multi-plant grid with plant status cards
- Quick drill-down to plant details

4. Alert control center
- Unified alert queue across clients
- Filter by severity, lifecycle tracking, resolve workflows

5. Device/sensor monitoring
- Device online/offline state, data delay, communication quality

6. Client support panel
- Operator issues, admin notes, recommended actions

7. Data management
- Raw telemetry view and export workflows

8. Role management
- Admin roles, permissions, access boundaries

## 9. System Data Flow

Device -> PLC -> Cloud -> Backend -> Frontend

This flow powers both:
- user-facing operational guidance
- admin-facing centralized control

## 10. MVP Priority (Minimum Prototype)

### Must build first
User side:
- Dashboard
- Alerts
- Operations guidance panel

Admin side:
- Client management
- Live monitoring
- Alert control center

### Product UX principle
- User side: understand in 5 seconds
- Admin side: control everything from one place

## 11. Success Criteria for MVP

- Users can identify plant health and next action in less than 5 seconds
- Alerts trigger on threshold breaches and are visible in both user/admin panels
- Admin can monitor all active plants from one screen
- Operational guidance is visible and understandable to non-experts
- Monthly summary surfaces treatment and reuse outcomes
