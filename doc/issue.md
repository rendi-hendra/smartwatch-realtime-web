buatkan issue.md yang berisi perencanaan untuk nanti di implementasikan oleh junior programer atau ai model yang lebih murah.

Mockup website nya ada di folder "doc/mockup"

Isi dari planning nya adalah sebagai berikut:
- Buatkan frontend untuk menampilkan data vote realtime
- Buatkan frontend untuk menampilkan grafik realtime
- Buatkan tanda kalau ada anomali

Jelaskan tahapan-tahapan yang harus dilakukan untuk mengimplementasikan fitur ini, anggap nanti yang mengimplementasikan adalah junior programer atau ai model yang lebih murah.


Buatkan UI&UX untuk website ini, refrensi/mockup nya ada di folder "doc/mockup-web.png" , gunakan style dari file style.css



buatkan issue.md yang berisi perencanaan untuk nanti di implementasikan oleh junior programer atau ai model yang lebih murah.

Isi dari planning nya adalah sebagai berikut:
- Hapus card yang tidak digunakan di halaman dashboard
- Hapus sidebar yang tidak digunakan, seperti profile, settings, dll
- Heart Rate (live, bpm, with status indicator)
   - SpO2 (percentage, normal status)
   - Health Status (normal/warning text)
   - Device Status (online/offline, last sync time)

Jelaskan tahapan-tahapan yang harus dilakukan untuk mengimplementasikan fitur ini, anggap nanti yang mengimplementasikan adalah junior programer atau ai model yang lebih murah.


Design and generate a complete production-ready web dashboard UI for a real-time smartwatch health monitoring system.

## Context

The system streams real-time health data from smartwatch devices through a backend into a web dashboard. The dashboard must prioritize real-time monitoring, clarity, and quick decision-making.

## Tech Assumption

* Frontend: Next.js
* Styling: shadcn
* Charts: Chart.js
* Data: Real-time subscription (e.g., Firebase Realtime Database)

---

## Layout Structure

### 1. Global Layout

* Left sidebar (fixed):

  * Logo: "SmartFit"
  * Menu:

    * Dashboard (active)
    * Analytics
    * Activity
    * Heart Rate

* Top navbar:

  * Page title: "Dashboard"
  * Subtitle: "Real-time health monitoring overview"
  * Right side:

    * Notification icon
    * User avatar

---

## 2. Dashboard Content (MAIN PRIORITY: REALTIME)

### A. Realtime Summary Cards (Top Section - 4 Cards)

Each card must have:

* Title
* Main value (large font)
* Status indicator (color-coded)
* Small contextual info

Cards:

1. Heart Rate (LIVE)

   * Value: e.g., "82 bpm"
   * Indicator: green (normal), yellow (warning), red (critical)
   * Subtext: "+2 bpm from last minute"
   * Badge: "LIVE"

2. SpO2

   * Value: e.g., "97%"
   * Status: Normal / Low
   * Color indicator

3. Health Status (Derived Insight)

   * Text: "Normal" / "Warning" / "Critical"
   * Subtext: "No anomalies detected" or specific warning

4. Device Status

   * Device name (e.g., Apple Watch)
   * Status: Online / Offline
   * Last sync: "3s ago"
   * LIVE indicator

---

### B. Main Chart Section (Core Visualization)

* Title: "Heart Rate Monitoring"

* Type: Line chart

* Data:

  * X-axis: Time (last 10–30 minutes)
  * Y-axis: Heart rate (bpm)

* Features:

  * Smooth line
  * Highlight latest value
  * Tooltip on hover
  * Real-time update animation
  * Show average value (optional)

* Top-right:

  * "LIVE" badge
  * "Last update: X seconds ago"

---

### C. Right Panel (Secondary Information)

1. Recent Activity (Log)

   * Show last 5–10 entries
   * Format:

     * Time → Value (e.g., "10:31 → HR 82 bpm")
   * Scrollable if needed

2. Quick Insight Box

   * Example:

     * "Heart rate stable"
     * "No abnormal activity detected"

---

### D. Secondary Section

1. Activity Overview (Steps Chart)

   * Line or bar chart
   * Last 7 days
   * Show goal line (e.g., 8000 steps)

2. Sleep Summary (Optional)

   * Donut chart
   * Deep / Light / REM / Awake

---

## 3. Design Requirements

* Style:

  * Clean, modern SaaS dashboard
  * Minimalist
  * Professional

* Colors:

  * Primary: blue
  * Success: green
  * Warning: yellow
  * Danger: red
  * Background: light gray / white

* UI Elements:

  * Rounded cards (large radius)
  * Soft shadows
  * Consistent spacing (grid system)
  * Clear typography hierarchy

---

## 4. Real-Time Behavior (IMPORTANT)

* Data must update automatically without refresh
* Show:

  * LIVE badge
  * Last update timestamp
* If no data:

  * Show "No data" state
* If disconnected:

  * Show "Device offline" warning

---

## 5. UX Rules

* Dashboard must be readable in under 5 seconds
* Prioritize:

  1. Heart Rate
  2. Status
  3. Device connection
* Avoid clutter
* Do not overload with too many charts

---

## 6. Output Requirements

Generate:

* Complete UI (component structure)
* Clean layout (ready for implementation)
* Responsive design (desktop-first, tablet-friendly)
* Clear separation of sections
* Production-quality design (not wireframe)

Optional (if supported):

* Include sample dummy data
* Include component names (e.g., <SummaryCard />, <HeartRateChart />)

---

## Goal

The final result should look like a professional real-time health monitoring dashboard used in production, not a generic fitness UI. It must clearly communicate live health status, trends, and system state.

