# Tag Evo Restaurant Order Management System
## User Manual — Version 1.0
### Prepared by: TagTeam Engineering | Document Date: April 2026

---

> **Document Classification:** End-User Training & Operations Manual
> **System:** Tag Evo Restaurant Order Management Platform
> **Audience:** Restaurant Staff, Kitchen Team, Cashiers, Managers, Administrators

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [User Roles & Access Levels](#2-user-roles--access-levels)
3. [Dashboard](#3-dashboard)
4. [Order Creation — Stue Order](#4-order-creation--stue-order)
5. [Order Movement — Kitchen & Bar Tracking](#5-order-movement--kitchen--bar-tracking)
6. [Cashier — Billing Queue](#6-cashier--billing-queue)
7. [Cashier Payment — Payment Processing](#7-cashier-payment--payment-processing)
8. [Order Cancellation — Request](#8-order-cancellation--request)
9. [Order Cancellation — Approval](#9-order-cancellation--approval)
10. [Movement Statuses Reference](#10-movement-statuses-reference)
11. [Best Practices](#11-best-practices)
12. [Troubleshooting & FAQs](#12-troubleshooting--faqs)

---

## 1. Introduction

### 1.1 Purpose of This Manual

This User Manual provides complete operational guidance for the **Tag Evo Restaurant Order Management System** — a modern, real-time digital platform that connects the front-of-house (waiters, cashiers) with the back-of-house (kitchen, bar) to streamline restaurant operations end to end.

The system eliminates paper-based order taking, reduces communication errors between staff, accelerates order fulfilment, and provides management with live operational visibility and financial analytics.

### 1.2 System Overview

Tag Evo Restaurant Order is a web-based Angular application that operates across all devices on the restaurant's local network. It provides:

- **Digital order creation** by servers and waiters directly at tables or counters
- **Real-time kitchen and bar displays** that update instantly as orders arrive
- **Live order movement tracking** with status progression from queue to serving
- **Integrated cashier and payment processing** with multi-method payment support
- **Management dashboards** with KPIs, revenue charts, and operational analytics
- **Structured cancellation workflows** with approval and full audit trails

### 1.3 Restaurant Workflow Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    COMPLETE RESTAURANT ORDER WORKFLOW                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────┐                                                   │
│  │   Customer Arrives   │                                                   │
│  └──────────┬───────────┘                                                   │
│             │                                                               │
│             ▼                                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │              Server Creates Order  (Stue Order Module)               │  │
│  │   Selects table · order type · food items · add-ons · quantities     │  │
│  └──────────────────────────────────┬─────────────────────────────────┘  │
│                                     │                                      │
│                                     ▼                                      │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │         System Routes Order in Real-Time via SignalR                 │  │
│  │              (Instant — no manual refresh needed)                    │  │
│  └─────────────────────┬──────────────────────────┬────────────────────┘  │
│                         │                          │                        │
│              ┌──────────▼──────────┐   ┌──────────▼──────────┐            │
│              │   Kitchen Display   │   │    Bar Display       │            │
│              │  Food items → Chefs │   │  Beverages → Bar     │            │
│              │                     │   │  Chefs               │            │
│              │  Checking → Queued  │   │  Checking → Queued   │            │
│              │  → Preparing        │   │  → Preparing         │            │
│              │  → Ready to Serve   │   │  → Ready to Serve    │            │
│              │  → Served           │   │  → Served            │            │
│              └──────────┬──────────┘   └──────────┬──────────┘            │
│                         │                          │                        │
│                         └────────────┬─────────────┘                       │
│                                      │ All items Served                    │
│                                      ▼                                     │
│              ┌──────────────────────────────────────────────┐              │
│              │         Cashier Billing Queue                 │              │
│              │  Cashier reviews · applies charges · prints   │              │
│              └───────────────────────┬──────────────────────┘              │
│                                      │                                      │
│                                      ▼                                      │
│              ┌──────────────────────────────────────────────┐              │
│              │  Payment Processed (Cash / Card / Split)      │              │
│              └───────────────────────┬──────────────────────┘              │
│                                      │                                      │
│                                      ▼                                      │
│              ┌──────────────────────────────────────────────┐              │
│              │         Order Closed — Table Freed            │              │
│              └──────────────────────────────────────────────┘              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

> **Note:** The system uses Microsoft SignalR (WebSocket technology) to push real-time updates to all screens in under 1 second.

---

## 2. User Roles & Access Levels

The system enforces strict role-based access control. Each user is assigned a role by the administrator, which determines which modules they can access and what data they can view.

### 2.1 Role Summary Table

| Role | Full Name | Access Scope |
|------|-----------|--------------|
| **Administrator** | System Administrator | Full access — all modules, all orders, all departments |
| **Kitchen Head** | Head Chef / Kitchen Manager | Kitchen module — all kitchen orders across every chef |
| **Chef** | Kitchen Chef | Kitchen module — only orders personally assigned to them |
| **Bar Head** | Head Bartender / Bar Manager | Bar module — all bar orders across every bar chef |
| **Bar Chef** | Bartender / Bar Chef | Bar module — only orders personally assigned to them |
| **Server / Waiter** | Stue (Server) | Order creation only — no kitchen or bar access |
| **Cashier** | Cashier / Billing Staff | Cashier billing and payment processing modules |

### 2.2 Detailed Role Descriptions

#### Administrator

The Administrator has unrestricted access to every module within the system. Intended for restaurant managers, owners, or system operators.

**Capabilities:**
- View and manage all orders regardless of table, server, or department
- Monitor the complete Order Movement dashboard — sees all kitchen and bar orders simultaneously
- Access the full Dashboard with financial KPIs, revenue trends, and analytics
- View and action all cancellation approval requests
- Access cashier and payment modules

---

#### Kitchen Head

The Kitchen Head oversees all food preparation activities across the entire kitchen department.

**Capabilities:**
- View **all active kitchen orders** assigned to any chef in the kitchen
- Monitor preparation status across all kitchen staff at once
- Identify delayed or stuck orders across the entire kitchen
- Cannot view bar or beverage orders

---

#### Chef (Kitchen Chef)

Kitchen Chefs see only the orders that have been assigned to them personally.

**Capabilities:**
- View orders assigned specifically to their user account
- Update food item statuses: Start Preparing → Ready → Serve
- Cannot see orders assigned to other chefs
- Cannot view bar or beverage orders

---

#### Bar Head

The Bar Head oversees all beverage preparation and bar service activities.

**Capabilities:**
- View **all active bar orders** assigned to any bar chef
- Monitor beverage preparation status across all bar staff
- Identify overdue bar orders and act on bottlenecks
- Cannot view kitchen food orders

---

#### Bar Chef (Bartender)

- View bar orders assigned specifically to their bar station
- Update beverage item statuses through the preparation flow
- Cannot see orders assigned to other bar staff
- Cannot view kitchen food orders

---

#### Server / Waiter

- Create new orders for tables via the Stue Order module
- Add food items, portions, add-ons, and customer details
- Submit cancellation requests for active orders
- Cannot access kitchen or bar displays

---

#### Cashier

- View the queue of orders ready for payment settlement
- Review order items and apply applicable charges
- Print bills and invoices for customers
- Process payments via cash, card, or split payment methods
- Close orders after successful payment settlement

---

## 3. Dashboard

**Access:** Menu → Dashboard | **Intended Users:** Administrator, Managers

The Dashboard is the management's operational command center, providing a consolidated view of restaurant performance through live KPI cards, visual charts, and real-time order and table status summaries.

### 3.1 Date Range Selector

| Preset | Description |
|--------|-------------|
| Today | Data from the current calendar day |
| Yesterday | Data from the previous day |
| Last 7 Days | Rolling 7-day window |
| Last 30 Days | Rolling 30-day window |
| Custom Range | User-specified from/to date range |

### 3.2 KPI Cards

Nine Key Performance Indicator cards display current values with delta comparisons. A **green arrow** indicates improvement; a **red arrow** indicates decline.

| KPI Card | Description | Unit |
|----------|-------------|------|
| Total Revenue | Net revenue in the selected period | Rs |
| Total Orders | Number of orders placed | Count |
| Average Order Value | Revenue ÷ Orders | Rs |
| Paid Orders | Orders fully settled | Count |
| Active Orders | Orders currently open | Count |
| Occupied Tables | Tables currently in use | Count |
| Total Tables | Total restaurant table capacity | Count |
| Reserved Tables | Tables reserved but not yet in use | Count |
| Average Prep Time | Average kitchen preparation time | Minutes |

> **Screenshot Placeholder — KPI Cards**
> `[ Insert screenshot of the 9 KPI cards row ]`

### 3.3 Charts & Visual Analytics

**Revenue Trend (Line Chart)** — Plots daily revenue and order count over the selected date range.

**Order Type Distribution (Doughnut Chart)** — Breakdown by service type: Dine In, Takeaway, Delivery, and Package.

**Peak Hours (Bar Chart)** — Identifies which hours generate the most orders and revenue.

> **Screenshot Placeholder — Charts Section**
> `[ Insert screenshot of revenue trend, order type distribution, and peak hours charts ]`

### 3.4 Table Status Summary

| Status | Meaning |
|--------|---------|
| Occupied | Table has an active ongoing order |
| Available | Table is empty and ready for new guests |
| Reserved | Table is booked but not yet in use |

### 3.5 Recent Orders, Top Items & Payment Breakdown

- **Recent Orders:** Last 10 orders with order number, table, type, amount, status, and time
- **Top Selling Items:** Top 8 food items ranked by units sold and revenue
- **Category Revenue:** Horizontal progress bars by food category
- **Payment Breakdown:** Split between cash, credit card, debit card, and split transactions

> **Screenshot Placeholder — Dashboard Lower Section**
> `[ Insert screenshot of table status, recent orders, top items, and payment breakdown ]`

---

## 4. Order Creation — Stue Order

**Access:** Menu → Order | **Intended Users:** Server / Waiter, Administrator

The Stue Order module is the entry point of the order lifecycle. Once an order is submitted, it immediately flows to the kitchen and/or bar for preparation.

### 4.1 Creating a New Order — Step by Step

```
Step 1: Select Your Server Identity
         └─ Links the order to your account for tracking

Step 2: Select Order Type
         └─ Dine In / Takeaway / Delivery / Package

Step 3: Select Table  (Dine-In only)
         └─ Choose an Available table and enter guest count

Step 4: Link Customer  (Optional)
         └─ Search by name or phone number for loyalty tracking

Step 5: Add Food Items
         └─ Browse by category → select item → choose portion
            → set quantity → add any add-ons

Step 6: Add Special Notes  (Optional)
         └─ For dietary requirements or special preparation requests

Step 7: Review & Submit
         └─ Verify everything → click Submit → system returns Order Number

Step 8: Payment Decision
         └─ Pay Now (immediate) or Pay Later (cashier after meal)
```

> **Screenshot Placeholder — Stue Order Module**
> `[ Insert screenshot of food selector with category tabs and order summary ]`

### 4.2 Order Types Reference

| Order Type | Table Required | Payment Timing | Typical Workflow |
|------------|----------------|----------------|------------------|
| Dine In | Yes | After meal (Pay Later) | Table → Kitchen/Bar → Served → Cashier |
| Takeaway | No | On collection | Counter → Kitchen → Ready → Cashier |
| Delivery | No | Pre-payment or on delivery | Kitchen → Packed → Dispatch |
| Package | No | Pre-arranged | Special handling |

> **Important:** Always use the **Add More** function on an existing order when a customer wants additional items — never create a second order for the same table.

---

## 5. Order Movement — Kitchen & Bar Tracking

**Access:** Menu → Order Movement | **Intended Users:** Chef, Kitchen Head, Bar Chef, Bar Head, Administrator

The Order Movement module is the **heart of kitchen and bar operations**, providing a real-time live display of all active orders updated instantly via SignalR.

### 5.1 What Happens After an Order Is Placed

1. The system saves the order with all food items
2. A real-time notification is broadcast to all connected screens within one second
3. The new order immediately appears with a highlight animation
4. Each food item starts in the **Checking** stage
5. Kitchen sees kitchen items; bar sees bar items — routing is automatic

### 5.2 Kitchen vs. Bar Routing

| Destination | Who Sees It | Examples |
|-------------|------------|---------|
| Kitchen | Chef, Kitchen Head, Administrator | Grilled Chicken, Pasta, Salads |
| Bar | Bar Chef, Bar Head, Administrator | Fresh Lime Juice, Cocktails, Coffee |

> A single order may contain items for both kitchen and bar simultaneously — each department only sees their relevant items.

### 5.3 Role-Based Visibility

| Role | Orders Visible | Department |
|------|----------------|------------|
| Chef | Only personally assigned orders | Kitchen only |
| Kitchen Head | All kitchen orders — across every chef | Kitchen only |
| Bar Chef | Only personally assigned bar orders | Bar only |
| Bar Head | All bar orders — across every bar chef | Bar only |
| Administrator | All orders — kitchen and bar combined | Full visibility |

### 5.4 The Complete Order Lifecycle

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                     ORDER PREPARATION LIFECYCLE                              ║
╠══════════╦══════════╦══════════╦══════════════╦══════════╦══════════════════╣
║          ║          ║          ║              ║          ║                  ║
║ CHECKING ║  QUEUED  ║PREPARING ║ READY TO     ║  SERVED  ║    BILLING       ║
║          ║          ║          ║   SERVE      ║          ║                  ║
║  Order   ║  Chef    ║ Active   ║   Food       ║  Item    ║ All items done   ║
║ arrives  ║ accepted ║ cooking  ║  ready at    ║delivered ║ → Cashier queue  ║
║ at       ║ the      ║ or       ║  the pass.   ║ to       ║ appears auto-    ║
║ station  ║ order    ║ mixing   ║  Server to   ║ customer ║ matically        ║
║          ║          ║ in prog. ║  collect     ║ table    ║                  ║
╠══════════╬══════════╬══════════╬══════════════╬══════════╬══════════════════╣
║  Action: ║  Action: ║  Action: ║   Action:    ║  Auto →  ║   Cashier        ║
║   Take   ║   Start  ║   Ready  ║    Serve     ║  Billing ║   takes over     ║
╠══════════╬══════════╬══════════╬══════════════╬══════════╬══════════════════╣
║  By:     ║  By:     ║  By:     ║   By:        ║  By:     ║  By:             ║
║ Kitchen/ ║ Kitchen/ ║ Kitchen/ ║  Server /    ║  System  ║  Cashier         ║
║   Bar    ║   Bar    ║   Bar    ║  Waiter      ║  (auto)  ║                  ║
╚══════════╩══════════╩══════════╩══════════════╩══════════╩══════════════════╝
```

> **Key Rule:** An order moves to the Billing stage — and appears in the Cashier queue — **only when every single item** across both kitchen and bar has been confirmed as Served.

### 5.5 Action Button Reference

| Current Stage | Button Shown | Next Stage | Who Acts |
|---------------|--------------|------------|----------|
| Checking | Take | Queued | Chef / Bar Chef |
| Queued | Start | Preparing | Chef / Bar Chef |
| Preparing | Ready | Ready to Serve | Chef / Bar Chef |
| Ready to Serve | Serve | Served | Server / Waiter |
| Served | — (automatic) | Billing | System |

> **Screenshot Placeholder — Order Movement Screen**
> `[ Insert screenshot of the Order Movement dashboard with order cards and status action buttons ]`

### 5.6 Stage Descriptions

**Checking** — Order just arrived. All kitchen/bar staff can see it. No preparation started. Chef must "Take" it to claim ownership.

**Queued** — A specific chef has accepted the order. It is linked to their account. Others no longer see it in the unassigned queue. Preparation is next.

**Preparing** — Active cooking or beverage preparation is underway. The most time-sensitive stage. Long durations here signal delays. Kitchen Head monitors this closely.

**Ready to Serve** — Food or drink is fully prepared and waiting at the pass. Responsibility shifts to the server. Items should not stay here more than 2–3 minutes.

**Served** — Item delivered to the customer's table and confirmed by the server. When ALL items across both departments reach this stage, the system automatically triggers Billing.

**Billing** — Entire order complete. Automatically moved to the Cashier module. No further kitchen/bar action required. Cashier takes over.

### 5.7 Additional Features

**Pinned Orders** — Pin up to 3 orders to the sidebar for priority tracking. They remain visible at the top regardless of scroll position.

**Bulk Action** — Use "Select All" or check multiple food item checkboxes, then advance all selected items to the next stage simultaneously.

**Table Change** — Click "Change Table" on the order card → select new table → confirm. Order updates system-wide instantly.

**Add More Items** — Click "Add More" → select additional items → submit. New items start at Checking stage and broadcast in real-time to all screens.

**Food Item Cancellation** — Click the cancel icon next to a food item → enter a mandatory remark → confirm. The item is removed from the active queue.

### 5.8 Real-Time Notification Events

| Event | Trigger | Screen Response |
|-------|---------|----------------|
| New Order | Server submits an order | New order card appears with animation |
| Order Updated | Table or server changed | Order card info updates instantly |
| Add More | Extra items added to order | New food items appear on existing card |
| Food Status Changed | Item stage advanced by another user | Status badge updates in real-time |

---

## 6. Cashier — Billing Queue

**Access:** Menu → Cashier | **Intended Users:** Cashier, Administrator

Displays all orders fully served and ready for payment. When every food and beverage item reaches the Served stage, the order automatically appears here — no manual action required.

### 6.1 Screen Layout

- **Pinned Orders (Left Sidebar):** Up to 3 priority orders for fast billing
- **Finished Orders List (Main Area):** All orders awaiting payment, auto-updated in real-time

Each card shows: Order Number, Table, Customer Name, Order Type, Date/Time, Guest Count, Server Name, and **Total Amount**.

> **Screenshot Placeholder — Cashier Queue**
> `[ Insert screenshot of the cashier module with pinned and regular order queues ]`

### 6.2 Viewing Order Details

Click **"View Items"** to open the Order Details Modal showing complete itemized list, individual prices, quantities, add-on summaries, and line totals.

### 6.3 Applying Charges

| Charge Type | How It Works | Example |
|-------------|-------------|---------|
| Percentage-Based | Calculated as % of subtotal automatically | 10% Service Charge |
| Flat Amount | Fixed amount added directly to the total | Rs. 200 Cover Charge |

Toggle charges with checkboxes — totals recalculate in real-time.

### 6.4 Printing the Bill

Click **"Print Bill"** in the modal → system generates a formatted invoice with restaurant branding, itemized list, applied charges, grand total → browser print dialog opens automatically.

> **Screenshot Placeholder — Bill Print Preview**
> `[ Insert screenshot of the formatted bill / invoice ]`

### 6.5 Proceeding to Payment

Click the **"Pay"** button on the order card to navigate to the Payment Processing screen.

---

## 7. Cashier Payment — Payment Processing

**Access:** Navigated from Cashier via "Pay" button | **Intended Users:** Cashier, Administrator

### 7.1 Screen Layout

| Panel | Content |
|-------|---------|
| Left — Order Summary | Read-only: all items, charges, subtotal, total charges, grand total |
| Right — Payment Form | Payment method selector, amount fields, balance display, Submit button |

> **Screenshot Placeholder — Payment Processing Screen**
> `[ Insert screenshot of the payment screen with order summary and payment form ]`

### 7.2 Payment Method: Cash

1. Select **"Cash"** as payment method
2. Enter the cash amount received
3. View balance: **Green** = overpayment (return change) | **Red** = underpayment (cannot submit)
4. Submit — only enabled when amount ≥ Grand Total

### 7.3 Payment Method: Card

1. Select **"Card"** as payment method
2. Choose Card Type: Credit or Debit
3. Select the Bank from the filtered list
4. Enter the amount and confirm

### 7.4 Payment Method: Split Payment

| Split Type | How to Use | When to Use |
|------------|-----------|-------------|
| Cash + Card | Enter cash → select card type and bank → use "Fill Remaining to Card" | Part cash, part card |
| Card + Card | Configure Card 1 → configure Card 2 → use "Fill Remaining to Card 2" | Two different cards |

### 7.5 Payment Validation Rules

| Rule | Condition |
|------|-----------|
| Amount Coverage | Total paid ≥ Grand Total |
| Card Type | Must be selected for card payments |
| Bank | Must be selected for card payments |
| Amount > Zero | All amounts must be greater than zero |
| Split Balance | Sum of split amounts must cover grand total |

> **Note:** The Submit button remains disabled until all validations pass.

### 7.6 Completing Payment & Early Pay

After Submit: transaction is recorded, order removed from queue. Click **"Close Order"** to formally close it.

**Early Pay Orders** (created with "Pay Now"): can be settled immediately after order creation — bypass the "all items served" requirement.

---

## 8. Order Cancellation — Request

**Access:** Menu → Order Cancellation → Request | **Intended Users:** Server / Waiter, Administrator

Allows authorized staff to submit a formal request to cancel an active order. Manager approval is required — no silent cancellations.

### 8.1 Submitting a Cancellation Request

```
Step 1: Select the order from the left panel
         └─ Search by order number or table name

Step 2: System checks for existing pending requests
         └─ Duplicate requests are prevented automatically

Step 3: Review food items and their current stages
         └─ Shown in the right panel

Step 4: Enter a cancellation remark
         └─ Minimum 5 characters · Maximum 300 characters · Mandatory

Step 5: Click "Submit Request"
         └─ Enters manager's approval queue with Pending status
```

> **Screenshot Placeholder — Cancellation Request Screen**
> `[ Insert screenshot of the two-panel cancellation request interface ]`

> **Important:** Submitting a request does NOT immediately cancel the order. Kitchen staff should continue preparation until the manager formally approves.

### 8.2 Remark Requirements

| Requirement | Rule |
|-------------|------|
| Minimum Length | 5 characters |
| Maximum Length | 300 characters |
| Mandatory | Yes — cannot submit without a remark |

---

## 9. Order Cancellation — Approval

**Access:** Menu → Order Cancellation → Approve | **Intended Users:** Administrator, Manager-level roles

### 9.1 Screen Tabs

| Tab | Content |
|-----|---------|
| Pending Requests | Requests awaiting manager action |
| Recent Decisions | History of approved and rejected requests |

### 9.2 Approving a Request

1. Click **"Review"** on any pending request
2. Review order details and the staff member's remark
3. Optionally add an approval remark
4. Click **"Approve"** — order is cancelled, recorded with manager identity and timestamp

### 9.3 Rejecting a Request

1. Open the request dialog
2. Enter a **mandatory rejection remark** (min 5 characters)
3. Click **"Reject"** — order remains active, kitchen continues preparation

> **Screenshot Placeholder — Cancellation Approval Screen**
> `[ Insert screenshot of the approval module with pending tab and review dialog ]`

### 9.4 Audit Trail

| Data Point | Description |
|------------|-------------|
| Request ID | Unique identifier per request |
| Order Number | The order referenced |
| Requested By | Staff name and identity |
| Requested On | Date and time of submission |
| Cancellation Remark | Reason given by requestor |
| Decision Status | Pending / Approved / Rejected |
| Decided By | Manager name and identity |
| Decision Date/Time | Exact timestamp of the decision |
| Manager Remark | Manager's approval or rejection explanation |

---

## 10. Movement Statuses Reference

All order movement stages are controlled by the system's order process movement database table.

### 10.1 Complete Status Reference

| Stage | Description | Sequence | Next Action | Responsible Party | Display Label |
|-------|-------------|----------|-------------|-------------------|---------------|
| **Checking** | Order arrives at station — just received | 1st | Take the order | Kitchen / Bar Staff | Checking |
| **Queued** | Chef has accepted the order into their queue | 2nd | Start preparing | Assigned Chef / Bar Chef | Queued |
| **Preparing** | Active cooking or preparation underway | 3rd | Mark as ready | Assigned Chef / Bar Chef | Preparing |
| **Ready to Serve** | Fully prepared — awaiting server collection | 4th | Serve to customer | Server / Waiter | Ready |
| **Served** | Delivered to customer's table | 5th | Submit to billing (auto) | System (automatic) | Served |
| **Billing** | All items served — moves to cashier queue | 6th (Final) | Process payment | Cashier | Submitted |

### 10.2 Status Flow Visualization

```
┌────────────┐     ┌────────────┐     ┌────────────┐     ┌──────────────┐     ┌────────────┐     ┌────────────┐
│            │     │            │     │            │     │              │     │            │     │            │
│  CHECKING  │────▶│   QUEUED   │────▶│ PREPARING  │────▶│ READY TO     │────▶│   SERVED   │────▶│  BILLING   │
│            │     │            │     │            │     │   SERVE      │     │            │     │            │
│  Kitchen/  │     │  Kitchen/  │     │  Kitchen/  │     │  Server /    │     │  System    │     │  Cashier   │
│  Bar Staff │     │  Bar Staff │     │  Bar Staff │     │  Waiter      │     │  (Auto)    │     │            │
│            │     │            │     │            │     │              │     │            │     │            │
│  "Take" ▶  │     │  "Start" ▶ │     │  "Ready" ▶ │     │  "Serve" ▶   │     │   Auto ▶   │     │  Payment   │
└────────────┘     └────────────┘     └────────────┘     └──────────────┘     └────────────┘     └────────────┘
```

### 10.3 Responsible Party Guide

| Responsible Party | Roles | Responsibility |
|-------------------|-------|----------------|
| Kitchen / Bar Staff | Chef, Kitchen Head, Bar Chef, Bar Head | Take, start, and complete preparation |
| Server / Waiter | Server, Administrator | Collect prepared items and deliver to customer |
| System (Automatic) | — | Automatically triggers Billing when all items are Served |

### 10.4 Detailed Stage Explanations

**Checking** — The very first stage. All staff in the relevant department can see the new order. A chef must claim it by clicking "Take" to take ownership and move it to their personal queue.

**Queued** — A specific chef or bar chef has claimed the order via their user account. Others no longer see it in their unassigned view. Preparation is next in line.

**Preparing** — Active cooking or beverage mixing is in progress. Most time-sensitive stage. Kitchen Head and Bar Head monitor durations here to identify bottlenecks.

**Ready to Serve** — Food or drink is fully prepared at the pass. Responsibility shifts from kitchen/bar to the server. Should not remain here more than 2–3 minutes to maintain food quality.

**Served** — Delivered to the customer's table and confirmed by the server. When every item in the entire order reaches this stage, the system automatically triggers the Billing transition.

**Billing** — The complete order is in the Cashier module's queue. No further kitchen or bar action required. Cashier handles payment processing from here.

---

## 11. Best Practices

### 11.1 Order Creation — Server Best Practices

| Practice | Recommendation |
|----------|----------------|
| Double-check before submitting | Review all items, quantities, portions, and add-ons before clicking Submit |
| Use notes for special requests | Always add preparation notes — do not rely on verbal communication with the kitchen |
| Confirm guest count | Enter the correct number of guests for kitchen planning and table management analytics |
| Link customers when possible | Enables loyalty tracking and repeat customer analytics |
| Use "Add More" — not new orders | Never create a second order for the same table; always use Add More |

### 11.2 Kitchen & Bar Operations Best Practices

| Practice | Recommendation |
|----------|----------------|
| Take orders immediately | Claim new orders in Checking stage without delay to prevent confusion |
| Update statuses in real-time | Advance stages promptly — delays create inaccurate data for servers and managers |
| Use bulk selection | When multiple items are ready at once, use "Select All" and advance together |
| Pin priority orders | Pin VIP table orders to keep them visible at the top at all times |

### 11.3 Cashier Best Practices

| Practice | Recommendation |
|----------|----------------|
| Verify items before printing | Review all items and quantities before printing the customer's bill |
| Apply charges consistently | Apply the same standard charges to all applicable orders |
| Use "Fill Exact Amount" for cards | Avoids manual entry errors for card-only transactions |
| Verify split payment totals | Confirm the balance display is green before submitting split payments |

### 11.4 Cross-Department Coordination

| Scenario | Recommended Action |
|----------|--------------------|
| Kitchen delay during peak hours | Kitchen Head redistributes workload between chefs |
| Item ready but server unavailable | Alert server immediately — items should not stay in Ready to Serve for more than 3 minutes |
| Customer requests cancellation | Server submits formal request; kitchen continues until manager approves |
| Item unavailable after order | Chef uses Cancel Food Item with a clear remark; server notifies customer immediately |

---

## 12. Troubleshooting & FAQs

### 12.1 Delayed Orders

| Symptom | Likely Cause | Resolution |
|---------|-------------|------------|
| Item in Checking for more than 5 minutes | No chef has taken the order | Kitchen Head alerts the relevant chef immediately |
| Item in Preparing for more than 15 minutes | Chef has not updated status or genuine delay | Kitchen Head checks physically; chef updates status immediately |
| Item in Ready to Serve for more than 3 minutes | Server has not collected the item | Alert the assigned server to collect and mark as Served |
| Order not in cashier queue | Not all items are in Served stage | Check Order Movement — every item must be Served before billing triggers |

### 12.2 Missing Items

| Scenario | Cause | Resolution |
|----------|-------|------------|
| Item missing from chef's view | Item assigned to another chef | Kitchen Head checks full order using Kitchen Head or Administrator view |
| Bar item not visible to bar staff | User role not correctly configured | Administrator to verify the user's role assignment |
| Item not appearing anywhere | Order submission may have failed | Re-submit from Stue Order module |
| Add-more items not showing | Real-time connection dropped | Refresh the Order Movement page — system reloads automatically |

### 12.3 Payment Issues

| Scenario | Cause | Resolution |
|----------|-------|------------|
| Total higher than expected | Charge was applied | Review charges in the order details modal |
| Submit button disabled | Payment amount less than grand total | Use "Fill Exact Amount" or increase the amount entered |
| Split amounts don't balance | Combined amounts don't cover grand total | Use "Fill Remaining" to auto-calculate the second amount |

### 12.4 Cancellation Issues

| Symptom | Cause | Resolution |
|---------|-------|------------|
| Order still active after approval | Screen not refreshed | Refresh Order Movement — cancelled order will disappear |
| Cannot submit cancellation request | Pending request already exists | Wait for current request to be actioned by the manager |

### 12.5 Printer / Receipt Issues

| Issue | Cause | Resolution |
|-------|-------|------------|
| Print dialog does not open | Browser blocking pop-ups | Allow pop-ups for the system URL in browser settings |
| Receipt format incorrect | Browser print settings misaligned | Set paper size A4/A5, disable headers/footers in print settings |
| Nothing prints | Printer offline or disconnected | Check printer connection and print a Windows test page |

### 12.6 Frequently Asked Questions

**Q: Can a server see the kitchen or bar display?**
A: No. Servers do not have access to the Order Movement module — by design to maintain separation of responsibilities.

**Q: What happens if the browser is closed with an active order?**
A: Orders are stored on the server. Re-opening the browser and navigating back shows all current orders unchanged.

**Q: Can a cashier process payment before all items are served?**
A: Under normal workflow, no. Exception: Early Pay orders (takeaways using "Pay Now") can be settled immediately after creation.

**Q: Can multiple cashiers be logged in simultaneously?**
A: Yes. The cashier queue updates in real-time for all. Assign specific cashiers to specific orders to prevent dual processing.

**Q: Will the kitchen see add-more items immediately?**
A: Yes — within seconds via the real-time SignalR connection. No manual refresh required.

**Q: Can an approved cancellation be reversed?**
A: No. Once approved, the cancellation is final. A completely new order must be created if needed.

**Q: The screen is not showing new orders automatically — what should I do?**
A: The real-time connection may have dropped. Refresh the browser — the system reconnects and reloads all current data.

---

*End of User Manual — Version 1.0*

---

> **Prepared By:** TagTeam Engineering Team
> **Contact:** infotagteamengineering@gmail.com
> **Version:** 1.0 | **Date:** April 2026
> **Classification:** Client Operations Document — Confidential
