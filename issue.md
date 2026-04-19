# Real-Time Smartwatch Health Dashboard

## Objective
Design and implement a complete, production-ready web dashboard UI for a real-time smartwatch health monitoring system. The UI must prioritize real-time data visibility, a clean modern SaaS aesthetic, and quick decision-making under 5 seconds.

## Tech Stack
* **Frontend Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS + shadcn/ui
* **Charts:** Chart.js (via `react-chartjs-2`)
* **Real-time Data:** Designed to be easily connected to Firebase Realtime Database or WebSockets.

---

## Task Details

### 1. Global Layout Adjustments
- [ ] **Simplify Sidebar Menu**:
  - Keep ONLY the following menus: `Dashboard` (active), `Analytics`, `Activity`, and `Heart Rate`.
  - Hapus (Remove) unused cards and sidebars like profile, settings, etc. from the main layout context to avoid clutter.
- [ ] **Update Top Navbar**:
  - Page title: "Dashboard"
  - Subtitle: "Real-time health monitoring overview"
  - Keep notification icon and user avatar on the right side.

### 2. Realtime Summary Cards (Top Section - 4 Cards)
Replace the existing general KPI cards with these strict real-time cards.
Each card must have: `Title`, `Main value (large font)`, `Status indicator (color-coded)`, and `Small contextual info`.

- [ ] **1. Heart Rate (LIVE)**
  - Value: e.g., "82 bpm"
  - Indicator: green (normal), yellow (warning), red (critical)
  - Subtext: "+2 bpm from last minute"
  - Badge: "LIVE" (Red blinking or solid)
- [ ] **2. SpO2**
  - Value: e.g., "97%"
  - Status: Normal / Low
  - Color indicator
- [ ] **3. Health Status (Derived Insight)**
  - Text: "Normal" / "Warning" / "Critical"
  - Subtext: "No anomalies detected" or specific warning
- [ ] **4. Device Status**
  - Device name (e.g., Apple Watch)
  - Status: Online / Offline
  - Last sync: "3s ago"
  - LIVE indicator

### 3. Main Chart Section (Core Visualization)
- [ ] **Create Heart Rate Monitoring Component**
  - Type: Line chart using Chart.js.
  - X-axis: Time (last 10–30 minutes)
  - Y-axis: Heart rate (bpm)
  - Features: Smooth line, tooltips, highlight latest value, and real-time update animations.
  - Display a "LIVE" badge and "Last update: X seconds ago" indicator in the top right.

### 4. Right Panel & Secondary Sections
- [ ] **Right Panel (Secondary Information)**
  - **Recent Activity (Log):** Display the last 5-10 entries in a scrollable format (e.g., "10:31 → HR 82 bpm").
  - **Quick Insight Box:** Display short, actionable text like "Heart rate stable" or "No abnormal activity detected".
- [ ] **Secondary Section (Bottom Grid)**
  - **Activity Overview:** A steps chart (bar or line) for the last 7 days showing a goal line (e.g., 8000 steps).
  - **Sleep Summary:** A donut chart showing Deep / Light / REM / Awake stages.

---

## Design & UI Requirements
- **Style:** Clean, minimalist, modern SaaS dashboard. Professional, not just a "generic fitness app".
- **Colors:**
  - Primary: Blue
  - Success: Green
  - Warning: Yellow
  - Danger: Red
  - Background: Light gray / White
- **UI Elements:** Use large border radius for cards, soft shadows, consistent spacing, and clear typography hierarchy.

## Real-Time Behavior Rules (UX)
1. Ensure the Dashboard is highly readable instantly.
2. Data must update automatically (simulate this with state for now).
3. If no data, render a "No data" state.
4. If disconnected, show a "Device offline" indicator.

---

## Definition of Done
- The layout is perfectly styled using responsive Tailwind classes (mobile and desktop-first).
- The four KPI cards accurately reflect the specific required text, layout, and colors.
- The new `Heart Rate Line Chart` is the centerpiece of the application.
- The UI builds without errors via `npm run build` or `npm run lint`.
