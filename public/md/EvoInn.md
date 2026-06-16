# Product Requirements Document — Frontend
## TagHotel Reservation System · Angular 17+ SPA
**Project Prefix:** `TagHotel`
**Version:** 1.2.0
**Date:** 2026-04-17
**Author:** Senior Angular Developer (10+ years)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Overview](#2-product-overview)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [Technology Stack](#4-technology-stack)
5. [Two-Project Split](#5-two-project-split)
6. [Project Structure — Admin](#6-project-structure--admin)
7. [Project Structure — Transaction](#7-project-structure--transaction)
8. [Routing Architecture — Admin](#8-routing-architecture--admin)
9. [Routing Architecture — Transaction](#9-routing-architecture--transaction)
10. [Core Layer (Shared Pattern)](#10-core-layer-shared-pattern)
11. [Shared / Reusable Components (Shared Pattern)](#11-shared--reusable-components-shared-pattern)
12. [Layout Module](#12-layout-module)
13. [Feature: Dashboard](#13-feature-dashboard)
14. [Feature: Master Data (Admin)](#14-feature-master-data-admin)
15. [Feature: Reservations (Transaction)](#15-feature-reservations-transaction)
16. [Feature: Key Handling (Transaction)](#16-feature-key-handling-transaction)
17. [Feature: Billing (Transaction)](#17-feature-billing-transaction)
18. [Feature: Cashier (Transaction)](#18-feature-cashier-transaction)
19. [UI / UX Design System](#19-ui--ux-design-system)
20. [State Management Strategy](#20-state-management-strategy)
21. [Real-Time Integration (SignalR)](#21-real-time-integration-signalr)
22. [API Integration Contract](#22-api-integration-contract)
23. [Non-Functional Requirements](#23-non-functional-requirements)
24. [Out of Scope](#24-out-of-scope)

---

## 1. Executive Summary

The TagHotel Angular frontend is split into **two independent Angular SPAs** that both consume the TagHotel ASP.NET Core 8 REST API:

| Project | Folder | Port | Purpose |
|---|---|---|---|
| **TagHotel-Admin** | `projects/taghotel-admin/` | 4200 | Reference data management — all CRUD screens for master data configuration |
| **TagHotel-Transaction** | `projects/taghotel-transaction/` | 4201 | Daily operations — dashboard, reservation lifecycle, key handling, billing, cashier closing |

**TagHotel-Transaction** additionally connects to a SignalR hub for real-time room-status and reservation updates.

Both projects live in the same Angular workspace (single `angular.json`), share the same TypeScript configuration, and follow the conventions defined in the project skill guides.

---

## 2. Product Overview

### 2.1 Target Users

| Role | Primary Project | Primary Screens |
|---|---|---|
| Receptionist | Transaction | Dashboard, Reservation List/Form, Key Handling |
| Cashier | Transaction | Billing, Daily Closing |
| Admin / Manager | Admin + Transaction | All Master Data screens, Dashboard |

> Token and module credentials are injected from the external auth system via the `Landing` route. Role enforcement is out of scope.

### 2.2 Feature Modules by Project

#### TagHotel-Admin
| Module | Screens |
|---|---|
| Room Category | List + Create/Edit (tab-based) |
| Room Facility | List + Create/Edit (tab-based) |
| Room Configuration | List + Create/Edit (tab-based) |
| Rate | List + Create/Edit (tab-based) |
| Extra Charge | List + Create/Edit (tab-based) |
| Additional Service | List + Create/Edit (tab-based) |

#### TagHotel-Transaction
| Module | Key Screens |
|---|---|
| Dashboard | KPI cards, occupancy chart, revenue charts, room grid, timeline, alerts |
| Reservations | List, Create/Edit, Detail View, Check-in, Check-out, Cancel |
| Key Handling | Issue Key, Return Key, Unreturned Keys list |
| Billing | Invoice List, Invoice Detail, Add Payment |
| Cashier | Daily Closing Summary |

---

## 3. Goals & Success Metrics

| Goal | Metric |
|---|---|
| Dashboard visible quickly | First meaningful paint ≤ 2 s on LAN |
| Real-time room grid updates | Tile state changes within ≤ 1 s of server event |
| No stale data after actions | Room grid, KPI cards, and alerts refresh after every SignalR event |
| Consistent UX across both apps | All CRUD forms follow identical tab-based pattern — same validation flow, same save/clear behavior |
| Zero uncaught HTTP errors | All API calls display errors via `MessagesComponent` |

---

## 4. Technology Stack

Both projects use the same stack:

| Concern | Choice | Version |
|---|---|---|
| Framework | Angular standalone components | 17+ |
| State | RxJS + component class properties | built-in |
| HTTP | `HttpService` wrapper (wraps `HttpClient`) | built-in |
| Real-time | `@microsoft/signalr` *(Transaction only)* | 7.x |
| Charts | `ng-apexcharts` *(Transaction only)* | latest |
| UI components | PrimeNG | 17.x |
| Icons | PrimeIcons | 6.x |
| Styling | Bootstrap 5 grid + custom SCSS | 5.x |
| Input masking | `ngx-mask` | 17.x |
| Encryption | CryptoJS (AES/CBC) | 4.x |
| Build | Angular CLI | 17+ |

> **No Angular Material. No Tailwind CSS. No Angular Signals.**  
> PrimeNG components are always imported via the central `PrimeConfig` — never import individual PrimeNG modules directly in a component.

---

## 5. Two-Project Split

### 5.1 Workspace Layout

```
taghotel-workspace/
├── angular.json                        ← defines both projects
├── tsconfig.json                       ← workspace-level TS config
├── package.json                        ← single node_modules
└── projects/
    ├── taghotel-admin/
    │   └── src/
    └── taghotel-transaction/
        └── src/
```

### 5.2 Build & Serve Commands

```bash
# Admin project
ng serve taghotel-admin                 # dev server → http://localhost:4200
ng build taghotel-admin                 # production → dist/taghotel-admin/

# Transaction project
ng serve taghotel-transaction           # dev server → http://localhost:4201
ng build taghotel-transaction           # production → dist/taghotel-transaction/
```

### 5.3 Cross-Project Navigation

The two SPAs are deployed independently. Where a deep link between them is required, use absolute `window.location.href` redirects configured in `assets/app-settings.json` under `appSettings.adminUrl` / `appSettings.transactionUrl`.

### 5.4 `angular.json` Project Registration

```jsonc
{
  "projects": {
    "taghotel-admin": {
      "projectType": "application",
      "root": "projects/taghotel-admin",
      "sourceRoot": "projects/taghotel-admin/src",
      "architect": {
        "build": { "options": { "outputPath": "dist/taghotel-admin" } },
        "serve": { "options": { "port": 4200 } }
      }
    },
    "taghotel-transaction": {
      "projectType": "application",
      "root": "projects/taghotel-transaction",
      "sourceRoot": "projects/taghotel-transaction/src",
      "architect": {
        "build": { "options": { "outputPath": "dist/taghotel-transaction" } },
        "serve": { "options": { "port": 4201 } }
      }
    }
  }
}
```

---

## 6. Project Structure — Admin

```
projects/taghotel-admin/src/
├── app/
│   ├── Models/                          ← All domain models (PascalCase .ts files)
│   │   ├── Response.ts
│   │   ├── UpdateData.ts
│   │   ├── RoomCategory.ts
│   │   ├── RoomFacility.ts
│   │   ├── RoomConfig.ts
│   │   ├── Rate.ts
│   │   ├── ExtraCharge.ts
│   │   └── AdditionalService.ts
│   │
│   ├── Services/                        ← All injectable services (PascalCase files)
│   │   ├── Http.service.ts
│   │   ├── Global.service.ts
│   │   ├── Encryption.service.ts
│   │   ├── RoomCategory.service.ts
│   │   ├── RoomFacility.service.ts
│   │   ├── RoomConfig.service.ts
│   │   ├── Rate.service.ts
│   │   ├── ExtraCharge.service.ts
│   │   └── AdditionalService.service.ts
│   │
│   ├── common-layout/                   ← Shell + all authenticated pages
│   │   ├── common-layout.component.*
│   │   ├── room-category/
│   │   ├── room-facility/
│   │   ├── room-config/
│   │   ├── rate/
│   │   ├── extra-charge/
│   │   └── additional-service/
│   │
│   ├── landing/                         ← Token validation entry page
│   ├── loading/                         ← Global loading spinner component
│   ├── messages/                        ← Global message/error display component
│   ├── common-functions/                ← Pure utility functions (date, number)
│   ├── prime.config.ts                  ← Central PrimeNG module registry
│   ├── app-settings.service.ts          ← Loads assets/app-settings.json at startup
│   ├── app.config.ts
│   └── app.routes.ts
│
└── assets/
    ├── app-settings.json                ← API URLs, encryption keys, module code
    └── Styles/                          ← Global SCSS partials
        ├── colors.scss
        ├── layout.scss
        ├── card.scss
        ├── buttons.scss
        ├── customize.scss
        ├── text.scss
        ├── table.scss
        ├── messages.scss
        └── validations.scss
```

---

## 7. Project Structure — Transaction

```
projects/taghotel-transaction/src/
├── app/
│   ├── Models/
│   │   ├── Response.ts
│   │   ├── UpdateData.ts
│   │   ├── Dashboard.ts
│   │   ├── Reservation.ts
│   │   ├── KeyHandling.ts
│   │   ├── Invoice.ts
│   │   ├── Payment.ts
│   │   └── CashierClosing.ts
│   │
│   ├── Services/
│   │   ├── Http.service.ts
│   │   ├── Global.service.ts
│   │   ├── Encryption.service.ts
│   │   ├── SignalR.service.ts           ← Hub connection + typed event observables
│   │   ├── Dashboard.service.ts
│   │   ├── Reservation.service.ts
│   │   ├── KeyHandling.service.ts
│   │   ├── Billing.service.ts
│   │   └── Cashier.service.ts
│   │
│   ├── common-layout/
│   │   ├── common-layout.component.*
│   │   ├── dashboard/
│   │   │   └── components/
│   │   │       ├── kpi-summary/
│   │   │       ├── occupancy-chart/
│   │   │       ├── revenue-chart/
│   │   │       ├── room-status-grid/
│   │   │       ├── reservations-timeline/
│   │   │       ├── service-usage-chart/
│   │   │       └── alerts-panel/
│   │   ├── reservation-list/
│   │   ├── reservation-form/
│   │   ├── reservation-detail/
│   │   ├── key-handling/
│   │   ├── invoice-list/
│   │   ├── invoice-detail/
│   │   └── cashier-closing/
│   │
│   ├── landing/
│   ├── loading/
│   ├── messages/
│   ├── common-functions/
│   ├── prime.config.ts
│   ├── app-settings.service.ts
│   ├── app.config.ts
│   └── app.routes.ts
│
└── assets/
    ├── app-settings.json
    └── Styles/                          ← same partials as Admin
```

---

## 8. Routing Architecture — Admin

All authenticated pages are **lazy-loaded child routes** under `path: 'app'`. All route paths use **PascalCase**. Route titles follow the pattern `'TagHotel | Admin | {PageName}'`.

```typescript
// projects/taghotel-admin/src/app/app.routes.ts
export const routes: Routes = [
  {
    path: 'Landing/:token',
    loadComponent: () => import('./landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'app',
    loadComponent: () => import('./common-layout/common-layout.component').then(m => m.CommonLayoutComponent),
    children: [
      { path: '', redirectTo: 'RoomCategory', pathMatch: 'full' },
      {
        title: 'TagHotel | Admin | Room Category',
        path: 'RoomCategory',
        loadComponent: () => import('./common-layout/room-category/room-category.component').then(m => m.RoomCategoryComponent)
      },
      {
        title: 'TagHotel | Admin | Room Facility',
        path: 'RoomFacility',
        loadComponent: () => import('./common-layout/room-facility/room-facility.component').then(m => m.RoomFacilityComponent)
      },
      {
        title: 'TagHotel | Admin | Room Configuration',
        path: 'RoomConfig',
        loadComponent: () => import('./common-layout/room-config/room-config.component').then(m => m.RoomConfigComponent)
      },
      {
        title: 'TagHotel | Admin | Rate',
        path: 'Rate',
        loadComponent: () => import('./common-layout/rate/rate.component').then(m => m.RateComponent)
      },
      {
        title: 'TagHotel | Admin | Extra Charge',
        path: 'ExtraCharge',
        loadComponent: () => import('./common-layout/extra-charge/extra-charge.component').then(m => m.ExtraChargeComponent)
      },
      {
        title: 'TagHotel | Admin | Additional Service',
        path: 'AdditionalService',
        loadComponent: () => import('./common-layout/additional-service/additional-service.component').then(m => m.AdditionalServiceComponent)
      },
    ]
  }
];
```

### Navigation Pattern

```typescript
// Navigate programmatically (inject Router in constructor)
this.Router.navigate(['/app/RoomCategory']);
this.Router.navigate(['/app/Rate'], { queryParams: { code: 'R001' } });
```

---

## 9. Routing Architecture — Transaction

```typescript
// projects/taghotel-transaction/src/app/app.routes.ts
export const routes: Routes = [
  {
    path: 'Landing/:token',
    loadComponent: () => import('./landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'app',
    loadComponent: () => import('./common-layout/common-layout.component').then(m => m.CommonLayoutComponent),
    children: [
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      {
        title: 'TagHotel | Transaction | Dashboard',
        path: 'Dashboard',
        loadComponent: () => import('./common-layout/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        title: 'TagHotel | Transaction | Reservations',
        path: 'ReservationList',
        loadComponent: () => import('./common-layout/reservation-list/reservation-list.component').then(m => m.ReservationListComponent)
      },
      {
        title: 'TagHotel | Transaction | Reservation Form',
        path: 'ReservationForm',
        loadComponent: () => import('./common-layout/reservation-form/reservation-form.component').then(m => m.ReservationFormComponent)
      },
      {
        title: 'TagHotel | Transaction | Reservation Detail',
        path: 'ReservationDetail',
        loadComponent: () => import('./common-layout/reservation-detail/reservation-detail.component').then(m => m.ReservationDetailComponent)
      },
      {
        title: 'TagHotel | Transaction | Key Handling',
        path: 'KeyHandling',
        loadComponent: () => import('./common-layout/key-handling/key-handling.component').then(m => m.KeyHandlingComponent)
      },
      {
        title: 'TagHotel | Transaction | Invoices',
        path: 'InvoiceList',
        loadComponent: () => import('./common-layout/invoice-list/invoice-list.component').then(m => m.InvoiceListComponent)
      },
      {
        title: 'TagHotel | Transaction | Invoice Detail',
        path: 'InvoiceDetail',
        loadComponent: () => import('./common-layout/invoice-detail/invoice-detail.component').then(m => m.InvoiceDetailComponent)
      },
      {
        title: 'TagHotel | Transaction | Daily Closing',
        path: 'CashierClosing',
        loadComponent: () => import('./common-layout/cashier-closing/cashier-closing.component').then(m => m.CashierClosingComponent)
      },
    ]
  }
];
```

### Navigation Pattern

```typescript
// List to detail
this.Router.navigate(['/app/ReservationDetail'], { queryParams: { reservationNo: res.reservationNo } });

// List to form (create)
this.Router.navigate(['/app/ReservationForm']);

// List to form (edit)
this.Router.navigate(['/app/ReservationForm'], { queryParams: { id: res.id } });
```

---

## 10. Core Layer (Shared Pattern)

Both projects independently implement the same core layer. There are **no Angular HTTP interceptors** — authentication and base URL are handled by `HttpService` and `GlobalService`.

### 10.1 `app-settings.json` — Environment Configuration

Environment switching is done by changing `activeCollectionName`. **Never hardcode API URLs anywhere in the codebase.**

```json
{
  "activeCollectionName": "TestEnv",
  "collections": [
    {
      "name": "TestEnv",
      "apiUrls": {
        "adminURL":   "http://localhost:5267",
        "key":        "zxcvbnmasdfghjkl",
        "iv":         "1234567890123456"
      },
      "appSettings": {
        "uploadFileSizeinKB": "5000000",
        "logouturl":          "http://localhost:4200",
        "moduleCode":         "TH"
      }
    },
    {
      "name": "PublishEnv",
      "apiUrls": { ... },
      "appSettings": { ... }
    }
  ]
}
```

### 10.2 `GlobalService` — Available Properties

`GlobalService` is populated at startup by `AppSettingsService` (via `APP_INITIALIZER`).

| Property | Source key | Purpose |
|---|---|---|
| `adminApiUrl` | `apiUrls.adminURL` | Base URL for all TagHotel API calls |
| `key` | `apiUrls.key` | AES encryption key |
| `iv` | `apiUrls.iv` | AES encryption IV |
| `moduleCode` | `appSettings.moduleCode` | Current module identifier sent in `X-Token-module` header |
| `logoutUrl` | `appSettings.logouturl` | Post-logout redirect URL |

### 10.3 `HttpService` — HTTP Methods

`HttpService` is the **only** way to make API calls. Never use `HttpClient` directly.

| Method | When to use |
|---|---|
| `postDataWithToken(data, endpoint, baseUrl)` | All authenticated POST (Insert, Update, Delete, action verbs) |
| `getDataWithToken(endpoint, queryString, baseUrl)` | All authenticated GET (Select) |
| `postData(data, endpoint, baseUrl)` | Unauthenticated POST (login only) |
| `getData(endpoint, queryString, baseUrl)` | Unauthenticated GET |

Token is read from `sessionStorage` key `"Token"` and injected automatically by `HttpService` as the `X-Token` header. Module code is sent as `X-Token-module`.

### 10.4 Response Model

```typescript
// Models/Response.ts
export class Response {
  code:        string = '';   // "1000" = success; "999" = validation; "998" = error
  description: string = '';   // error message when code != "1000"
  data:        any[]  = [];
}
```

Always check `data.code == "1000"` before using `data.data`.

### 10.5 Standard Service Structure

```typescript
// Services/RoomCategory.service.ts
@Injectable({ providedIn: 'root' })
export class RoomCategoryService {

  constructor(
    private HttpService: HttpService,
    private GlobalService: GlobalService
  ) {}

  Insert(data: RoomCategory): Observable<any> {
    return this.HttpService.postDataWithToken(data, 'api/TagHotel/RoomCategory/Insert', this.GlobalService.adminApiUrl);
  }

  Update(data: UpdateData): Observable<any> {
    return this.HttpService.postDataWithToken(data, 'api/TagHotel/RoomCategory/Update', this.GlobalService.adminApiUrl);
  }

  Delete(data: RoomCategory): Observable<any> {
    return this.HttpService.postDataWithToken(data, 'api/TagHotel/RoomCategory/Delete', this.GlobalService.adminApiUrl);
  }

  Select(code: string): Observable<any> {
    return this.HttpService.getDataWithToken(
      'api/TagHotel/RoomCategory/Select',
      `code=${code}`,
      this.GlobalService.adminApiUrl
    );
  }
}
```

**Service naming rules:**
- Inject `HttpService` and `GlobalService` with **PascalCase** parameter names matching the class
- Inject other services with **camelCase** in components (standard Angular convention)
- API endpoint format: `'api/TagHotel/{Module}/{Action}'` — never build full URLs in services
- Always return `Observable<any>` explicitly

### 10.6 Standard Subscribe Pattern

```typescript
this.loadingComponent?.showLoading('app-{feature}-data');
this.myService.Select('')
  .subscribe({
    next: (data: any) => {
      if (data.code == "1000") {
        this.recordList = data.data;
        this.noAnyRecords = this.recordList.length === 0;
        if (this.noAnyRecords) this.activeTabIndex = 1;
      } else {
        this.messagesComponent!.showError(data.description);
      }
      this.loadingComponent?.hideLoading('app-{feature}-data');
    },
    error: (error: any) => {
      this.messagesComponent?.showError(error);
      this.loadingComponent?.hideLoading('app-{feature}-data');
    },
  });
```

Always call `hideLoading` in **both** `next` and `error` handlers.

### 10.7 SignalR Service *(Transaction only)*

```typescript
// Services/SignalR.service.ts
@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hub = new HubConnectionBuilder()
    .withUrl(`${this.GlobalService.adminApiUrl}/signalRHub`)
    .withAutomaticReconnect()
    .build();

  readonly connectionState: WritableSignal<HubConnectionState> =
    signal(HubConnectionState.Disconnected);

  constructor(private GlobalService: GlobalService) {}

  async start(): Promise<void> {
    await this.hub.start();
    this.connectionState.set(HubConnectionState.Connected);
  }

  on<T>(event: string): Observable<T> {
    return new Observable<T>(observer =>
      this.hub.on(event, (data: T) => observer.next(data))
    );
  }
}
```

---

## 11. Shared / Reusable Components (Shared Pattern)

These components exist in both projects. Never duplicate their logic — always use the existing components.

| Component | Selector | Purpose |
|---|---|---|
| `MessagesComponent` | `app-messages` | Show success / error / warning messages inline |
| `LoadingComponent` | `app-loading` | Full-page loading spinner (keyed by CSS class string) |
| `CommonLayoutComponent` | `app-common-layout` | Main authenticated shell (sidebar + topbar + outlet) |

### `MessagesComponent` Usage

```html
<app-messages></app-messages>
```
```typescript
@ViewChild(MessagesComponent) messagesComponent: MessagesComponent | undefined;

this.messagesComponent!.showSuccess('Saved successfully. Code: ' + data.data[0].code);
this.messagesComponent!.showError(data.description);
this.messagesComponent?.showError(error);  // in error handler — use ?. for safety
```

Use `!` (non-null assertion) on the happy path. Use `?.` (optional chaining) in error handlers.

### `LoadingComponent` Usage

```html
<app-loading class="app-{feature}-data"></app-loading>
```
```typescript
@ViewChild(LoadingComponent) loadingComponent: LoadingComponent | undefined;

this.loadingComponent?.showLoading('app-{feature}-data');
// ... async work ...
this.loadingComponent?.hideLoading('app-{feature}-data');
```

The string passed to `showLoading`/`hideLoading` must match the CSS `class` attribute on `<app-loading>`.

---

## 12. Layout Module

Both projects share the same layout pattern. `CommonLayoutComponent` is the authenticated shell. Navigation menu is **handled separately** — do not implement menu logic inside feature components.

### 12.1 Topbar
- Property name / logo — left
- Current date / time — centre
- User display name + module label — right (read from `sessionStorage`)
- No logout button (managed by external auth system)

### 12.2 SignalR Connection Indicator *(Transaction only)*
Sidebar footer shows connection state dot:
- Green — Connected
- Amber pulsing — Reconnecting
- Red — Disconnected

---

## 13. Feature: Dashboard

> **Project: TagHotel-Transaction**

### 13.1 Page Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  [8 KPI Cards — full width row, responsive wrap]                    │
├──────────────────────────┬──────────────────────────────────────────┤
│  Occupancy Donut Chart   │  Room Status Grid                        │
│  (30% width)             │  (70% width, floor-grouped, scrollable)  │
├──────────────────────────┴──────────────────────────────────────────┤
│  Revenue Area Chart — Daily Trend (full width)                      │
├─────────────────────┬────────────────────┬──────────────────────────┤
│  Revenue Bar Chart  │  Service Usage     │  Alerts Panel            │
│  (Rooms/Svc/Meals)  │  Horizontal Bar    │  (scrollable, real-time) │
├─────────────────────┴────────────────────┴──────────────────────────┤
│  Upcoming Reservations Timeline (full width)                        │
└─────────────────────────────────────────────────────────────────────┘
```

### 13.2 Component Structure

Dashboard is a page component (`dashboard.component.ts`) with sub-components in `dashboard/components/`. Each sub-component is standalone and receives its data via `@Input()`.

Sub-components:
- `kpi-summary/` — 8 KPI cards row
- `occupancy-chart/` — ApexCharts donut
- `revenue-chart/` — area + grouped-bar charts
- `room-status-grid/` — coloured tile grid + side panel
- `reservations-timeline/` — upcoming bookings table
- `service-usage-chart/` — horizontal bar chart
- `alerts-panel/` — scrollable alert list

### 13.3 Data Loading

On `ngOnInit`, all 6 calls run in parallel via `forkJoin`. Results are stored in component class properties and passed to sub-components via `@Input()`.

```typescript
forkJoin({
  summary:      this.dashboardService.GetSummary(),
  roomGrid:     this.dashboardService.GetRoomStatusGrid(),
  revenue:      this.dashboardService.GetRevenueAnalytics(30),
  upcoming:     this.dashboardService.GetUpcomingReservations(7),
  serviceUsage: this.dashboardService.GetServiceUsage(30),
  alerts:       this.dashboardService.GetAlerts()
}).subscribe({
  next: (results) => { /* assign to class properties */ },
  error: (error) => { this.messagesComponent?.showError(error); }
});
```

### 13.4 KPI Cards

8 cards laid out in a responsive Bootstrap row. Each card uses `color-card-container` CSS class with a color variant:

| Card | API Field | Color class |
|---|---|---|
| Total Rooms | `totalRooms` | grey |
| Available | `availableRooms` | green |
| Occupied | `occupiedRooms` | red |
| Reserved | `reservedRooms` | yellow |
| Today Check-ins | `todayCheckIns` | blue |
| Today Check-outs | `todayCheckOuts` | blue |
| Today Revenue | `todayRevenue` | green |
| Pending Payments | `pendingPayments` | red |

### 13.5 Occupancy Chart

ApexCharts donut. Series: `[available, occupied, reserved, maintenance]`. Colors: `['#28A745', '#D9534F', '#FFC107', '#94a3b8']`. Center annotation shows occupancy percentage.

### 13.6 Revenue Charts

**Area chart (daily trend):** Last 30 days, single series `Total Revenue`, smooth curve with gradient fill.

**Grouped bar chart (breakdown):** Last 7 days, three series: `Room`, `Service`, `Meal`.

### 13.7 Room Status Grid

- Each room = tile with background colour by status: Available `#28A745`, Occupied `#D9534F`, Reserved `#FFC107`, Maintenance `#94a3b8`
- Rooms grouped by floor inside collapsible `p-panel` components
- Tile click → opens `p-dialog` (or inline side panel) showing room details + quick actions:
  - **Check In** (Reserved/Confirmed rooms only)
  - **Check Out** (Occupied rooms only)
  - **Mark as Maintenance** / **Clear Maintenance**
  - **Assign Service** → navigates to `ReservationDetail`

**Real-time update:** subscribes to `ReceiveNotification_ReservationUpdated` from `SignalRService`, reloads room grid on event.

### 13.8 Reservations Timeline

PrimeNG `p-table` (read-only, no pagination controls visible — max 10 rows). Columns: `reservationNo`, `guestName`, `roomNo`, `checkInDate`, `checkOutDate`, `source`, `status`.

- Late arrival rows highlighted in amber
- Row click → `this.Router.navigate(['/app/ReservationDetail'], { queryParams: { reservationNo: row.reservationNo } })`
- "View All" button → `this.Router.navigate(['/app/ReservationList'])`

### 13.9 Alerts Panel

Scrollable `<ul>`, max height 280px. Each item shows severity icon (`pi pi-exclamation-triangle` / `pi pi-times-circle`), message text, and a clickable reference chip that navigates to the relevant page.

| Alert Type | Navigate to |
|---|---|
| `PendingCheckout` | `/app/ReservationDetail?reservationNo=...` |
| `UnpaidInvoice` | `/app/InvoiceDetail?invoiceNo=...` |
| `KeyNotReturned` | `/app/KeyHandling` |
| `Overbooking` | `/app/ReservationDetail?reservationNo=...` |

Real-time refresh on `ReceiveNotification_ReservationUpdated` and `ReceiveNotification_KeyStatusUpdated`.

### 13.10 Dashboard Refresh Strategy

| Trigger | Refreshed sections |
|---|---|
| Page load (`ngOnInit`) | All 6 sections via `forkJoin` |
| `ReceiveNotification_ReservationUpdated` | KPI cards, Room grid, Alerts, Timeline |
| `ReceiveNotification_KeyStatusUpdated` | Alerts panel |
| Manual "Refresh" button | Full `forkJoin` reload |

No polling. SignalR replaces all interval-based refreshes.

---

## 14. Feature: Master Data (Admin)

> **Project: TagHotel-Admin**

All six master data entities follow the **identical tab-based CRUD pattern** described below. Described once; applies to all.

### 14.1 Page Skeleton

Every CRUD page uses `.main-card-container` with a `p-tabView` containing **two tabs**:

```html
<p-confirmDialog />
<div class="main-card-container">
  <app-messages></app-messages>
  <app-loading class="app-{feature}-data"></app-loading>

  <p-tabView [(activeIndex)]="activeTabIndex">
    <p-tabPanel header="Existing Records" [disabled]="noAnyRecords">
      <!-- p-table goes here -->
    </p-tabPanel>
    <p-tabPanel header="Add / Edit Record">
      <!-- Reactive form goes here -->
    </p-tabPanel>
  </p-tabView>
</div>
```

**Tab switching logic:**
- After data load: if no records exist → `activeTabIndex = 1` (jump to form)
- When records exist → `activeTabIndex = 0` (show list)
- Edit action → `patchValue` form + set `activeTabIndex = 1`

### 14.2 Component Class Structure

```typescript
@Component({
  selector: 'app-room-category',
  standalone: true,
  imports: [ReactiveFormsModule, PrimeConfig, MessagesComponent, LoadingComponent],
  templateUrl: './room-category.component.html',
  styleUrl: './room-category.component.scss'
})
export class RoomCategoryComponent {
  @ViewChild(LoadingComponent)      loadingComponent!:   LoadingComponent | undefined;
  @ViewChild(FormGroupDirective)    FormDirective!:       FormGroupDirective | undefined;
  @ViewChild(MessagesComponent)     messagesComponent!:  MessagesComponent | undefined;
  @ViewChild('dt2')                 dt2!:                Table | undefined;

  mode:              string       = 'I';
  OperationBtnText:  string       = 'Save';
  formSubmitted:     boolean      = false;
  noAnyRecords:      boolean      = true;
  activeTabIndex:    number       = 0;
  userid:            number       = Number(sessionStorage.getItem('LoggedUserID')!);
  updateData:        UpdateData   = new UpdateData();
  Form:              FormGroup | undefined;
  recordList:        RoomCategory[] = [];

  constructor(
    private fb:                  FormBuilder,
    private roomCategoryService: RoomCategoryService
  ) {
    this.Form = this.fb.group({
      id:          new FormControl(),
      code:        new FormControl(),
      name:        new FormControl('', [Validators.required]),
      maxOccupancy:new FormControl('', [Validators.required, Validators.min(1)]),
      basePrice:   new FormControl('', [Validators.required, Validators.min(0)]),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void { this.loadExisting(); }
}
```

### 14.3 List Tab — `p-table`

```html
<p-table
  #dt2
  [value]="recordList"
  styleClass="p-datatable-striped p-datatable-sm sm"
  [tableStyle]="{ 'min-width': '50rem' }"
  [paginator]="true"
  [rows]="5"
  [rowsPerPageOptions]="[5, 10, 20]"
  [globalFilterFields]="['name', 'code']"
>
  <ng-template pTemplate="caption">
    <div class="flex justify-content-end align-items-center">
      <div class="p-inputgroup" style="width: 40%; min-width: 300px">
        <span class="p-inputgroup-addon"><i class="pi pi-search"></i></span>
        <input pInputText type="text" (input)="onFilterGlobal($event)" placeholder="Search keyword" />
      </div>
    </div>
  </ng-template>

  <ng-template pTemplate="header">
    <tr>
      <th style="width: 150px">Code</th>
      <th>Name</th>
      <th>Max Occupancy</th>
      <th>Base Price</th>
      <th></th>
    </tr>
    <tr>
      <th><p-columnFilter type="text" field="code" placeholder="Search" /></th>
      <th><p-columnFilter type="text" field="name" placeholder="Search" /></th>
      <th></th><th></th><th></th>
    </tr>
  </ng-template>

  <ng-template pTemplate="body" let-item>
    <tr>
      <td>{{ item.code }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.maxOccupancy }}</td>
      <td>{{ item.basePrice }}</td>
      <td>
        <button type="button" pButton pRipple icon="pi pi-file-edit" class="p-button-blue"
          (click)="selectToUpdate(item)"></button>&nbsp;
        <button type="button" pButton pRipple icon="pi pi-trash" class="p-button-red"
          (click)="deleteConfirmation(item, $event)"></button>
      </td>
    </tr>
  </ng-template>

  <ng-template pTemplate="emptymessage">
    <tr><td colspan="5" class="text-left">No data found</td></tr>
  </ng-template>
</p-table>
```

### 14.4 Form Tab — Reactive Form

```html
<form [formGroup]="Form!" (submit)="onSubmit()">
  <div class="row">
    <div class="col-md-4">
      <div class="p-field p-fluid">
        <label>Name <span class="text-danger">*</span></label>
        <div class="flex">
          <input pInputText type="text" formControlName="name" />
        </div>
        @if (Form?.get('name')!.invalid && (Form?.get('name')!.touched || formSubmitted)) {
          <div class="invalid-error-label">Name is required</div>
        }
      </div>
    </div>
    <!-- ... other fields ... -->
  </div>

  <div class="row mt-2">
    <div class="col-md-4 offset-md-8">
      <div class="d-flex justify-content-end">
        <button type="button" class="primary-buttons p-button-green" pButton pRipple (click)="onSubmit()">
          <span>{{ OperationBtnText }}</span>
        </button>&nbsp;
        @if (OperationBtnText == 'Update') {
          <button type="button" class="primary-buttons p-button-red" pButton pRipple (click)="deleteThis()">
            <span>Delete</span>
          </button>&nbsp;
        }
        <button type="button" class="primary-buttons p-button-yellow" pButton pRipple (click)="clearForm()">
          <span>Clear</span>
        </button>
      </div>
    </div>
  </div>
</form>
```

### 14.5 Form / List Methods

```typescript
loadExisting(): void {
  this.loadingComponent?.showLoading('app-{feature}-data');
  this.roomCategoryService.Select('').subscribe({
    next: (data: any) => {
      if (data.code == "1000") {
        this.recordList = data.data;
        this.noAnyRecords = this.recordList.length === 0;
        if (this.noAnyRecords) this.activeTabIndex = 1;
      } else {
        this.messagesComponent!.showError(data.description);
      }
      this.loadingComponent?.hideLoading('app-{feature}-data');
    },
    error: (error: any) => {
      this.messagesComponent?.showError(error);
      this.loadingComponent?.hideLoading('app-{feature}-data');
    }
  });
}

onSubmit(): void {
  this.formSubmitted = true;
  if (this.Form!.invalid) return;
  this.formSubmitted = false;
  this.loadingComponent?.showLoading('app-{feature}-data');

  const model: RoomCategory = { ...this.Form!.value, user: this.userid };

  if (this.OperationBtnText == 'Save') {
    this.roomCategoryService.Insert(model).subscribe({ ... });
  } else {
    this.updateData.newData = model;
    this.updateData.userID = this.userid;
    this.roomCategoryService.Update(this.updateData).subscribe({ ... });
  }
}

selectToUpdate(record: RoomCategory): void {
  this.Form!.patchValue({ ...record });
  this.updateData.oldData = { ...record };  // always clone
  this.OperationBtnText = 'Update';
  this.activeTabIndex = 1;
}

clearForm(): void {
  this.Form?.reset();
  this.OperationBtnText = 'Save';
  this.formSubmitted = false;
}

deleteConfirmation(item: RoomCategory, event: Event): void {
  this.confirmationService.confirm({
    target: event.target as EventTarget,
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptButtonStyleClass: 'primary-buttons p-button-green',
    rejectButtonStyleClass: 'primary-buttons p-button-red',
    acceptIcon: 'none',
    rejectIcon: 'none',
    accept: () => { this.delete(item); }
  });
}

onFilterGlobal(event: Event): void {
  const input = event.target as HTMLInputElement;
  this.dt2?.filterGlobal(input.value, 'contains');
}
```

### 14.6 Entity-Specific Fields

#### Room Category
| Field | Control | Validation |
|---|---|---|
| Name | `pInputText` | Required |
| Max Occupancy | `pInputText` (number) | Required, min 1 |
| Base Price | `pInputText` (number) | Required, min 0 |
| Description | `textarea pInputText` | Optional |

#### Room Facility
| Field | Control | Validation |
|---|---|---|
| Name | `pInputText` | Required |
| Icon Key | `pInputText` | Optional (icon preview rendered live with `<i class="pi {{iconKey}}">`) |

#### Room Configuration
| Field | Control | Validation |
|---|---|---|
| Room No | `pInputText` | Required |
| Floor | `pInputText` | Required |
| Category | `p-dropdown` (from RoomCategory API) | Required |
| Status | `p-dropdown` (Available / Maintenance) | Required |
| Facilities | `p-multiSelect` (from RoomFacility API) | Optional |

#### Rate
| Field | Control | Validation |
|---|---|---|
| Name | `pInputText` | Required |
| Category | `p-dropdown` | Required |
| Rate Type | `p-dropdown` (Daily / Seasonal / Special) | Required |
| Amount | `pInputText` (number) | Required |
| Meal Plan | `p-dropdown` (FB / HB / BB / None) | Required |
| Season Start / End | `p-calendar` (shown when type = Seasonal) | Conditional required |

#### Extra Charge
| Field | Control | Validation |
|---|---|---|
| Name | `pInputText` | Required |
| Charge Type | `p-dropdown` (Percentage / Fixed) | Required |
| Value | `pInputText` (number) | Required, min 0 |
| Is Default | `p-toggleButton` (Yes/No) | — |

#### Additional Service
| Field | Control | Validation |
|---|---|---|
| Name | `pInputText` | Required |
| Pricing Type | `p-dropdown` (Fixed / Hourly / PerUsage) | Required |
| Unit Price | `pInputText` (number) | Required, min 0 |

---

## 15. Feature: Reservations (Transaction)

> **Project: TagHotel-Transaction**

### 15.1 Reservation List (`reservation-list.component`)

**Filter bar (above table):**
- `p-calendar` — filter by check-in date
- `p-dropdown` — status filter (All / Pending / Confirmed / CheckedIn / CheckedOut / Cancelled)
- `pInputText` — search by guest name or reservation number

**`p-table` columns:** `reservationNo`, `guestName`, `roomNo`, `checkInDate`, `checkOutDate`, `source`, `adults+children`, status badge

**Row action buttons:**
- `pi pi-eye` (blue) → navigate to `ReservationDetail?reservationNo=...`
- `pi pi-file-edit` (blue) → navigate to `ReservationForm?id=...` (only if Pending or Confirmed)
- `pi pi-times` (red) → `deleteConfirmation` → `POST Cancel` (only if Pending or Confirmed)

### 15.2 Reservation Form (`reservation-form.component`)

Uses `.main-card-container` with `sub-card-container` sections. On init, reads `queryParams.id`; if present, loads existing record and switches `OperationBtnText = 'Update'`.

**Section 1 — Guest Information:**
| Field | Control | Validation |
|---|---|---|
| Guest Name | `pInputText` | Required |
| Phone | `p-inputMask` mask `9999999999` | Required |
| Email | `pInputText` type email | Email format |
| ID Number | `pInputText` | Required |

**Section 2 — Booking Details:**
| Field | Control | Validation |
|---|---|---|
| Source | `p-dropdown` (Walk-in / Online / Agent) | Required |
| Check-in Date | `p-calendar` | Required, not in past |
| Check-out Date | `p-calendar` | Required, after check-in |
| Adults | `pInputText` (number) | Required, min 1 |
| Children | `pInputText` (number) | Optional, min 0 |
| Meal Plan | `p-dropdown` (FB / HB / BB / None) | Required |

**Section 3 — Room Selection:**
On date change → call `RoomConfig/SelectAvailable` and reload room `p-dropdown`. Selecting room auto-fills category, max occupancy, base rate display.

**Section 4 — Rate Selection:**
`p-dropdown` filtered by room's category via `Rate/SelectByCategory`.

**Section 5 — Services (optional):**
`p-table` with add-row functionality. Columns: Service (`p-dropdown`), Qty, Unit Price (auto-filled), Total.

**Section 6 — Deposit:**
| Field | Control |
|---|---|
| Deposit Amount | `pInputText` (number) |
| Notes | `textarea pInputText` |

**Save behaviour:**
- API `code = "999"` (availability conflict) → `messagesComponent.showError(data.description)`
- On success → navigate to `ReservationDetail?reservationNo=...`

### 15.3 Reservation Detail (`reservation-detail.component`)

Read from `queryParams.reservationNo` on init. Uses `.main-card-container` with `sub-card-container` sections.

**Sections:** guest info, booking dates + nights + room + rate, services table, billing summary (charges / deposit / balance due).

**Context-sensitive action buttons** (PrimeNG `pButton pRipple`):

| Status | Buttons shown |
|---|---|
| Pending | Edit (`p-button-blue`), Confirm (`p-button-green`), Cancel (`p-button-red`) |
| Confirmed | Check In (`p-button-green`), Cancel (`p-button-red`) |
| CheckedIn | Add Service (`p-button-blue`), Generate Invoice (`p-button-blue`), Check Out (`p-button-green`) |
| CheckedOut | View Invoice (`p-button-blue`) |
| Cancelled | — |

**Check-in flow:** captures `actualCheckIn` datetime via `p-calendar` dialog → `POST CheckIn` → reload detail.

**Check-out flow:** `deleteConfirmation`-style dialog → `POST CheckOut` → navigate to `InvoiceDetail?invoiceNo=...`.

---

## 16. Feature: Key Handling (Transaction)

> **Project: TagHotel-Transaction**

### 16.1 Key Handling Component (`key-handling.component`)

Uses `p-tabView` with tabs: **All Keys** / **Issued** / **Returned**.

**`p-table` columns:** `code`, `roomNo`, `guestName`, `reservationNo`, `issuedAt`, `returnedAt`, status badge.

Rows where key is unreturned > 24h get a red row style class.

**Issue Key button** → opens `p-dialog` (Issue Key form — see 16.2).
**Return button** on Issued rows → opens `p-dialog` (Return Key form — see 16.3).

After successful Issue or Return: reload key list + real-time `ReceiveNotification_KeyStatusUpdated` fires.

### 16.2 Issue Key Form (`p-dialog`)

| Field | Control | Validation |
|---|---|---|
| Room | `p-dropdown` (Occupied rooms only) | Required |
| Reservation No | `pInputText` (auto-filled from room) | Required |
| Guest Name | `pInputText` (auto-filled) | Required |
| Issued At | `p-calendar` (showTime=true, defaults to now) | Required |

### 16.3 Return Key Form (`p-dialog`)

Pre-filled from `GET KeyHandling/Select?code=`. All fields read-only except:

| Field | Control | Validation |
|---|---|---|
| Returned At | `p-calendar` (showTime=true, defaults to now) | Required |

---

## 17. Feature: Billing (Transaction)

> **Project: TagHotel-Transaction**

### 17.1 Invoice List (`invoice-list.component`)

**Filters:** search by invoice no, `p-calendar` date range, `p-dropdown` status.

**`p-table` columns:** `invoiceNo`, `reservationNo`, `guestName`, `roomNo`, `totalAmount`, `balanceDue`, status badge.

**Row actions:**
- `pi pi-eye` → navigate to `InvoiceDetail?invoiceNo=...`
- `pi pi-dollar` (blue, visible when status ≠ Paid) → opens Add Payment `p-dialog`

### 17.2 Invoice Detail (`invoice-detail.component`)

Read from `queryParams.invoiceNo` on init.

**Sections:** header card (invoice no, reservation no, guest, room, dates, status), line items `p-table`, charges summary panel, payments `p-table`.

**Charges summary panel:**
```
Room Charges:       xxx.xx
Service Charges:    xxx.xx
Meal Charges:       xxx.xx
Extra Charges:      xxx.xx
──────────────────────────
Sub Total:          xxx.xx
Tax:                xxx.xx
──────────────────────────
TOTAL:              xxx.xx
Deposit Paid:      -xxx.xx
──────────────────────────
BALANCE DUE:        xxx.xx
```

**Action buttons:**
- **Generate Invoice** → `POST Billing/GenerateInvoice` (visible if no invoice exists)
- **Add Payment** → opens `p-dialog` (Payment Form — see 17.3)
- **Print** → `window.print()`

### 17.3 Payment Form (`p-dialog`)

| Field | Control | Validation |
|---|---|---|
| Payment Method | `p-dropdown` (Cash / Card / Online) | Required |
| Type | `p-dropdown` (Payment / Deposit / Refund) | Required |
| Amount | `pInputText` (number) | Required, min 0.01 |
| Reference No | `pInputText` | Required when Method = Card or Online |
| Payment Date | `p-calendar` (defaults to today) | Required |

On save: `POST Billing/AddPayment` → close dialog → reload invoice detail.

---

## 18. Feature: Cashier (Transaction)

> **Project: TagHotel-Transaction**

### 18.1 Daily Closing Component (`cashier-closing.component`)

Uses `.main-card-container`. Date selector (`p-calendar`, defaults to today) triggers reload of summary on change.

**Summary panel (read-only):**

| Label | Field |
|---|---|
| Total Invoices | `totalInvoices` |
| Cash Collected | `cashTotal` |
| Card Collected | `cardTotal` |
| Online Collected | `onlineTotal` |
| Grand Total | `grandTotal` |
| Deposits Collected | `depositsCollected` |
| Refunds Issued | `refundsIssued` |
| Net Revenue | `netRevenue` |

**Closing status:**
- If already closed → show `sub-card-container` banner: "Day Closed by `closedBy` at `closedAt`" (green)
- If not closed → show **"Close Day"** button (`p-button-green`)

**Close Day flow:**
- Click → `confirmationService.confirm(...)` — "This will finalise the day. Continue?"
- Confirm → `POST Cashier/CloseDay`
- `code = "999"` (pending invoices) → `messagesComponent.showError(data.description)`
- Success → reload summary

---

## 19. UI / UX Design System

Both projects use the same design system. All styles come from global SCSS partials in `src/assets/Styles/`. Component `.scss` files remain empty unless a style is truly local and has no global equivalent.

### 19.1 Colour Variables (`colors.scss`)

| Variable | Value | Usage |
|---|---|---|
| `$primary-color` | `#073f64` | Nav background, primary borders |
| `$sub-color` | `#a4c3d8` | Card borders, sub-section accents |
| `$primary-text-color` | `#031a29` | Body text |
| `$sub-text-color` | `#062e49` | Sub-labels |
| `$body-color` | `#f0f0f0` | Page background |

### 19.2 Container Classes (`card.scss`)

| Class | Usage |
|---|---|
| `main-card-container` | Page-level white card (border-radius 10px, padding 10px) |
| `sub-card-container` | Left-bordered sub-section within a page |
| `color-card-container.blue/green/yellow/red` | KPI summary cards |
| `card-bordered.blue` | Selected/active tile (blue tint) |
| `card-bordered.ash` | Available/unselected tile (grey) |
| `card-bordered-transparent` | Filter/search panel border |

### 19.3 Typography Classes (`text.scss`)

| Class | Effect |
|---|---|
| `n-text-primary` | Primary brand color, bold |
| `n-text-sub` | Sub-text color, weight 400 |
| `n-text-title` | Black, bold — section headings |
| `n-text-disabled` | Grey, thin |
| `n-text-lightblue` | `#007BC2`, bold |
| `n-text-lightgreen` | `#6DC100` |
| `sm` / `md` / `lg` / `xlg` | Font size modifiers |

Combine semantic + visual: `class="sub-card-title n-text-sub md"`.

### 19.4 Button Classes (`buttons.scss`)

| Class | Color | Text | Use for |
|---|---|---|---|
| `p-button-green` | `#28A745` | white | Save / Confirm / Accept |
| `p-button-red` | `#D9534F` | white | Delete / Cancel / Danger |
| `p-button-blue` | `#003366` | white | Edit / Navigate / Primary action |
| `p-button-yellow` | `#FFC107` | black | Clear / Secondary action |

All buttons use `pButton pRipple` directives. Form-level buttons add class `primary-buttons` (`min-width: 100px`). Icon-only table buttons omit `primary-buttons`.

Hover effect on all color buttons: `transform: translateY(-2px)` with deeper box-shadow.

### 19.5 Form Layout Rules

- Wrap every input in `<div class="p-field p-fluid">`
- Place label above every input (`<label>` element, not placeholder-as-label)
- Use Bootstrap grid columns: `col-md-3`, `col-md-4`, `col-md-5`, `col-md-6`
- Validation errors: `<div class="invalid-error-label">` (small red text)
- Form action buttons right-aligned in last column: `<div class="d-flex justify-content-end">`
- Reset with explicit defaults: `this.Form.reset({ field: 'default' })` — never plain `.reset()`

### 19.6 Table Rules

- Always use `styleClass="p-datatable-striped p-datatable-sm sm"`
- Always include global search bar in `caption` template
- Always add `p-columnFilter` row beneath the header row
- Always include `emptymessage` template with `"No data found"`
- Always set `[paginator]="true" [rows]="5" [rowsPerPageOptions]="[5, 10, 20]"`

### 19.7 Responsive Breakpoints

| Breakpoint | Width | Behaviour |
|---|---|---|
| Desktop | ≥ 1280px | Full sidebar + all columns |
| Laptop | 1024–1279px | Sidebar collapsible |
| Tablet | 768–1023px | Sidebar hidden (hamburger), single-column cards |

Mobile (< 768px) is not in scope.

### 19.8 Adding New SCSS

| What you need | Add to file |
|---|---|
| New text color / typography | `text.scss` |
| New card / container | `card.scss` |
| New button variant | `buttons.scss` |
| New table style | `table.scss` |
| New form / input override | `customize.scss` |
| New layout helper | `layout.scss` |
| New color variable | `colors.scss` |
| Validation display | `validations.scss` |
| Toast / message style | `messages.scss` |

Only add a new `@import` to `styles.scss` when creating a brand-new partial file.

---

## 20. State Management Strategy

Standard Angular class properties and RxJS `subscribe` pattern. No Angular Signals. No NgRx.

```typescript
// Component class properties hold state
recordList:   RoomCategory[] = [];
selectedItem: RoomCategory | undefined;
isLoading:    boolean = false;
```

Cross-component communication uses Angular service with `Subject` or `BehaviorSubject`. Component output to parent uses the `output()` function:

```typescript
// Child → parent
getSelected = output<Customer>();
this.getSelected.emit(customer);

// Parent → child
@Input() reservationNo: string | undefined;
```

Always use constructor injection — never the `inject()` function.

---

## 21. Real-Time Integration (SignalR)

> **Project: TagHotel-Transaction only**

### 21.1 Connection Lifecycle

Started in `AppComponent.ngOnInit()`:

```typescript
ngOnInit() {
  this.signalRService.start().catch(err =>
    console.warn('SignalR failed to connect:', err)
  );
}
```

`withAutomaticReconnect()` handles transient disconnections.

### 21.2 Event Subscriptions

| Event | Subscribed in | Action |
|---|---|---|
| `ReceiveNotification_ReservationUpdated` | `DashboardComponent` | Reload KPI cards + room grid + alerts + timeline |
| `ReceiveNotification_ReservationUpdated` | Room status grid sub-component | Reload room tiles |
| `ReceiveNotification_ReservationUpdated` | `ReservationListComponent` | Reload list |
| `ReceiveNotification_KeyStatusUpdated` | `DashboardComponent` | Reload alerts panel |
| `ReceiveNotification_KeyStatusUpdated` | `KeyHandlingComponent` | Reload key list |

Unsubscribe in `ngOnDestroy` to prevent memory leaks:

```typescript
private subscription = new Subscription();

ngOnInit() {
  this.subscription.add(
    this.signalRService.on<any>('ReceiveNotification_ReservationUpdated')
      .subscribe(() => this.loadRoomGrid())
  );
}

ngOnDestroy() { this.subscription.unsubscribe(); }
```

---

## 22. API Integration Contract

All calls go through `HttpService`. Domain-specific services wrap `HttpService`. Both projects call the same backend.

### Base URL

Configured in `assets/app-settings.json` → `apiUrls.adminURL`, read via `GlobalService.adminApiUrl`.

Endpoint format: `api/TagHotel/{Module}/{Action}`

### Admin Project — Service Method Map

| Service | Method | HTTP | Endpoint |
|---|---|---|---|
| `RoomCategoryService` | `Select(code)` | GET | `RoomCategory/Select` |
| | `Insert(data)` | POST | `RoomCategory/Insert` |
| | `Update(data)` | POST | `RoomCategory/Update` |
| | `Delete(data)` | POST | `RoomCategory/Delete` |
| `RoomFacilityService` | `Select(code)` | GET | `RoomFacility/Select` |
| | `Insert/Update/Delete` | POST | `RoomFacility/*` |
| `RoomConfigService` | `Select(code)` | GET | `RoomConfig/Select` |
| | `Insert/Update/Delete` | POST | `RoomConfig/*` |
| `RateService` | `Select(code)` | GET | `Rate/Select` |
| | `SelectByCategory(cat)` | GET | `Rate/SelectByCategory` |
| | `Insert/Update/Delete` | POST | `Rate/*` |
| `ExtraChargeService` | `Select/Insert/Update/Delete` | GET/POST | `ExtraCharge/*` |
| `AdditionalServiceService` | `Select/Insert/Update/Delete` | GET/POST | `AdditionalService/*` |

### Transaction Project — Service Method Map

| Service | Method | HTTP | Endpoint |
|---|---|---|---|
| `RoomConfigService` | `SelectAvailable(params)` | GET | `RoomConfig/SelectAvailable` |
| | `UpdateStatus(data)` | POST | `RoomConfig/UpdateStatus` |
| `ReservationService` | `SelectByDate(date, status)` | GET | `Reservation/SelectByDate` |
| | `SelectDetail(no)` | GET | `Reservation/SelectDetail` |
| | `Insert(data)` | POST | `Reservation/Insert` |
| | `Update(data)` | POST | `Reservation/Update` |
| | `CheckIn(data)` | POST | `Reservation/CheckIn` |
| | `CheckOut(data)` | POST | `Reservation/CheckOut` |
| | `Cancel(data)` | POST | `Reservation/Cancel` |
| | `AddService(data)` | POST | `Reservation/AddService` |
| `KeyHandlingService` | `Select(code)` | GET | `KeyHandling/Select` |
| | `SelectUnreturned()` | GET | `KeyHandling/SelectUnreturned` |
| | `Insert(data)` | POST | `KeyHandling/Insert` |
| | `Return(data)` | POST | `KeyHandling/Return` |
| `BillingService` | `GenerateInvoice(data)` | POST | `Billing/GenerateInvoice` |
| | `AddPayment(data)` | POST | `Billing/AddPayment` |
| | `SelectDetail(no)` | GET | `Billing/SelectDetail` |
| | `SelectList(params)` | GET | `Billing/SelectList` |
| `CashierService` | `SelectClosing(date)` | GET | `Cashier/SelectClosing` |
| | `CloseDay(data)` | POST | `Cashier/CloseDay` |
| `DashboardService` | `GetSummary()` | GET | `Dashboard/Summary` |
| | `GetRoomStatusGrid()` | GET | `Dashboard/RoomStatusGrid` |
| | `GetRevenueAnalytics(days)` | GET | `Dashboard/RevenueAnalytics` |
| | `GetUpcomingReservations(days)` | GET | `Dashboard/UpcomingReservations` |
| | `GetServiceUsage(days)` | GET | `Dashboard/ServiceUsage` |
| | `GetAlerts()` | GET | `Dashboard/Alerts` |

---

## 23. Non-Functional Requirements

### Performance
| Requirement | Target |
|---|---|
| Dashboard first contentful paint | ≤ 2 s on LAN (all 6 API calls in parallel) |
| Admin list page load | ≤ 1 s on LAN |
| Room grid render (100 rooms) | ≤ 100 ms |
| SignalR tile update | ≤ 1 s after server event |

### Code Quality
- Strict TypeScript (`"strict": true`)
- No `any` types in models — `Observable<any>` permitted only in service return types
- Standalone components only — no `NgModule` declarations
- PrimeNG always imported via `PrimeConfig` — never individual module imports
- No `HttpClient` directly in components or services — always via `HttpService`
- No `alert()` or `console.error()` for user-facing errors — always `MessagesComponent`
- No `inject()` function — always constructor injection
- Each project is independently buildable with no cross-project imports

### Security
- Token stored in `sessionStorage` key `"Token"` — injected automatically by `HttpService`
- Encryption keys in `assets/app-settings.json` — do not commit production keys to source control
- No `innerHTML` binding with unescaped content

### Browser Support
- Chrome 115+, Edge 115+, Firefox 115+
- Desktop-first; tablet (768px+) supported. Mobile < 768px not in scope.

---

## 24. Out of Scope

| Item | Note |
|---|---|
| Login screen / auth UI | External system issues the token via the Landing route |
| Menu management | Handled by a separate module — do not implement menu logic in feature components |
| User management / role-based UI hiding | External system |
| Guest-facing portal | Internal staff tool only |
| Mobile native app | Not required |
| Print / PDF invoices | Future sprint (browser `window.print()` available as interim) |
| Email / SMS notifications | Future sprint |
| Dark mode | Not required |
| Multi-language / i18n | Not required |

---

*End of Frontend Angular PRD — TagHotel v1.2.0*
