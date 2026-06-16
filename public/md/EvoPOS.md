# TagInv — Inventory Management System
## Product Requirements Document (PRD)
**Version:** 1.1  
**Date:** 2026-04-03  
**Project:** TagTeam Inventory Management System  
**Platform:** .NET Core 8 Web API + MS SQL Server  
**Project Prefix:** `TagInv`

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Overview & Goals](#2-system-overview--goals)
3. [Sri Lankan Industry Standards & Context](#3-sri-lankan-industry-standards--context)
4. [Solution Architecture](#4-solution-architecture)
5. [Module Structure & Project Layout](#5-module-structure--project-layout)
6. [Phase 1 — Core Inventory + POS](#6-phase-1--core-inventory--pos)
7. [Phase 2 — Advanced Features](#7-phase-2--advanced-features)
8. [Phase 3 — QR & Mobile Wallet Integration](#8-phase-3--qr--mobile-wallet-integration)
9. [Database Design](#9-database-design)
10. [Stored Procedure Specifications](#10-stored-procedure-specifications)
11. [Domain Models (C# Classes)](#11-domain-models-c-classes)
12. [Service Layer Design](#12-service-layer-design)
13. [Controller & API Design](#13-controller--api-design)
14. [Middleware & Cross-Cutting Concerns](#14-middleware--cross-cutting-concerns)
15. [appsettings.json Configuration](#15-appsettingsjson-configuration)
16. [Program.cs & DI Registration](#16-programcs--di-registration)
17. [Non-Functional Requirements](#17-non-functional-requirements)
18. [Reporting & Analytics](#18-reporting--analytics)
19. [Barcode & Label Printing](#19-barcode--label-printing)
20. [Offline Capability Strategy](#20-offline-capability-strategy)
21. [Appendix — SP Naming Quick Reference](#21-appendix--sp-naming-quick-reference)

---

## 1. Executive Summary

TagInv is a fully configurable, multi-shop-type Inventory Management System designed for the Sri Lankan market. It supports retail shops, pharmacies, supermarkets, hardware stores, and wholesale businesses. The system provides:

- **Dynamic product management** using EAN-13 and Code 128 barcodes
- **Hierarchical multi-level product categorization** (up to 5 levels deep)
- **Fast barcode-based POS/Cashier module** for billing and transactions
- **Real-time inventory tracking** across multiple branches and warehouses
- **Expiry and batch tracking** critical for pharmacies and food businesses
- **Multi-payment support** (Cash and Card in Phase 1)
- **Barcode label printing** from within the application
- **Customer/loyalty management**
- **Comprehensive reporting and analytics**
- **Offline capability** for uninterrupted POS operation

All configurations — categories, product attributes, pricing rules, expiry policies, tax settings, and system settings — are dynamically managed within the application with no hardcoded business rules.

---

## 2. System Overview & Goals

### 2.1 Business Goals

| Goal | Description |
|------|-------------|
| Universal Shop Support | Works for retail, pharmacy, supermarket, hardware, wholesale |
| Zero Hardcoded Config | All rules configured via the application UI |
| Sri Lanka Compliance | VAT (18%), NBT, income tax structures; LKR currency |
| Scalability | Supports single shop to multi-branch chains |
| Speed | Sub-500ms POS transactions even on slow connections |
| Barcode-First | Every product operation uses barcode as primary key |

### 2.2 System Boundaries (Phase 1)

**In Scope:**
- Product catalog management with barcode support
- Multi-level category management
- Supplier management
- Stock management (GRN, adjustments, transfers)
- Batch and expiry tracking
- POS billing with barcode scan
- Cash and card payments
- Receipt printing
- Basic customer management
- Loyalty points
- Barcode label printing
- Basic reporting
- Multi-branch and warehouse management
- System configuration management

**Out of Scope (Phase 1):**
- QR payments (Lanka QR, mCash)
- Mobile wallet integrations (FriMi, ezCash, iPay)
- eCommerce integration
- Advanced HR/payroll
- Accounting integration

### 2.3 Target Users

| User Type | Description |
|-----------|-------------|
| Shop Owner/Manager | Full access to configuration and reporting |
| Cashier | POS billing, payment collection |
| Stock Keeper | GRN, stock adjustments, transfers |
| Supervisor | Reports, void transactions, overrides |

> **Note:** User role management is excluded from this system. Authentication and authorization are handled externally via the Admin database (`Tag_Res_Admin`) and the existing `TokenValidity` middleware pattern from SKILL.md.

---

## 3. Sri Lankan Industry Standards & Context

### 3.1 Regulatory Requirements

| Requirement | Detail |
|-------------|--------|
| VAT | 18% (as of 2024) — configurable in system settings |
| NBT | Nation Building Tax — configurable, may be applied selectively |
| SVAT | Suspended VAT for exporters — Phase 2 |
| CESS | Applicable on selected goods |
| Currency | Sri Lankan Rupee (LKR) |
| Decimal Places | 2 decimal places for currency; configurable |
| Fiscal Year | April 1 to March 31 (configurable) |

### 3.2 Barcode Standards Used in Sri Lanka

| Format | Usage |
|--------|-------|
| EAN-13 | Standard retail products; 13-digit GTIN |
| EAN-8 | Small retail products; 8-digit GTIN |
| Code 128 | Internal barcodes, pharmacy, wholesale |
| QR Code | Future phase — receipts, loyalty |

Sri Lanka uses the GS1 prefix **479** for locally manufactured products. The system must support both imported (foreign GS1 prefix) and locally generated barcodes.

### 3.3 Pharmacy-Specific Requirements

- **Batch number tracking** per stock receipt (GRN)
- **Expiry date tracking** with configurable warning thresholds (e.g., 3 months, 6 months)
- **FIFO/FEFO dispatch** — First Expired, First Out is mandatory for medications
- **Drug license** compliance fields
- **Controlled drug** flag for special handling
- **Generic name** vs brand name tracking
- **Manufacture date** recording

### 3.4 Supermarket/Retail Requirements

- **Multiple pricing** (retail, wholesale, member price)
- **Promotional pricing** with date ranges
- **Weight-based products** (e.g., loose vegetables, deli items)
- **Perishable item tracking** with short expiry windows
- **Loyalty card** integration with points accumulation and redemption

### 3.5 Hardware/Wholesale Requirements

- **Unit conversion** (e.g., box → piece, kg → gram)
- **Minimum order quantity** settings
- **Reorder level** alerts
- **Credit customer** invoicing
- **Price list** per customer category

### 3.6 Multi-Branch Operations

- Centralized product catalog
- Branch-level stock maintained separately
- Inter-branch stock transfer workflow
- Consolidated reporting across branches
- Branch-specific pricing allowed

---

## 4. Solution Architecture

### 4.1 Technology Stack

| Layer | Technology |
|-------|-----------|
| API Framework | ASP.NET Core 8 Web API |
| Data Access | Dapper 2.1.66 |
| Database | Microsoft SQL Server 2019/2022 |
| Serialization | Newtonsoft.Json 13.0.4 |
| Real-time | SignalR (stock alerts, POS sync) |
| Authentication | Token-based via X-Token header (Admin DB) |
| Documentation | Swagger (Swashbuckle 6.6.2) |
| Frontend Port | 4700 (configurable) |

### 4.2 Solution Structure

```
TagInv.sln
│
├── TagInv.API/                    ← ASP.NET Core 8 Web API
│   ├── Controllers/
│   │   ├── Reference/
│   │   │   ├── CategoryController.cs
│   │   │   ├── ProductController.cs
│   │   │   ├── BrandController.cs
│   │   │   ├── SupplierController.cs
│   │   │   ├── UnitOfMeasureController.cs
│   │   │   ├── TaxConfigController.cs
│   │   │   ├── PricingRuleController.cs
│   │   │   └── ProductAttributeController.cs
│   │   ├── Inventory/
│   │   │   ├── GRNController.cs
│   │   │   ├── StockController.cs
│   │   │   ├── StockTransferController.cs
│   │   │   └── StockAdjustmentController.cs
│   │   ├── Cashier/
│   │   │   ├── InvoiceController.cs
│   │   │   ├── PaymentController.cs
│   │   │   ├── SessionController.cs
│   │   │   ├── CustomerController.cs
│   │   │   └── ReturnController.cs
│   │   ├── System/
│   │   │   ├── BranchController.cs
│   │   │   ├── WarehouseController.cs
│   │   │   └── SettingsController.cs
│   │   ├── Reports/
│   │   │   └── ReportController.cs
│   │   └── DocumentController.cs
│   ├── Middlewares/
│   │   └── TokenValidity.cs
│   ├── SignalRHub.cs
│   ├── Program.cs
│   ├── appsettings.json
│   ├── appsettings.Development.json
│   └── TagInv.API.csproj
│
├── TagInv.Domain/                 ← Entity models + DTOs
│   ├── CustomClasses/
│   │   ├── BaseModel.cs
│   │   ├── UpdateData.cs
│   │   └── PaginatedRequest.cs
│   ├── Reference/
│   │   ├── Category.cs
│   │   ├── Product.cs
│   │   ├── Brand.cs
│   │   ├── Supplier.cs
│   │   ├── UnitOfMeasure.cs
│   │   ├── TaxConfig.cs
│   │   ├── PricingRule.cs
│   │   └── ProductAttribute.cs
│   ├── Inventory/
│   │   ├── GRN.cs
│   │   ├── Stock.cs
│   │   ├── StockTransfer.cs
│   │   └── StockAdjustment.cs
│   ├── Cashier/
│   │   ├── Invoice.cs
│   │   ├── Payment.cs
│   │   ├── Session.cs
│   │   ├── Customer.cs
│   │   └── Return.cs
│   ├── System/
│   │   ├── Branch.cs
│   │   ├── Warehouse.cs
│   │   └── Settings.cs
│   └── TagInv.Domain.csproj
│
└── TagInv.Services/               ← Business logic + Dapper data access
    ├── Reference/
    │   ├── CategoryService.cs
    │   ├── ProductService.cs
    │   ├── BrandService.cs
    │   ├── SupplierService.cs
    │   ├── UnitOfMeasureService.cs
    │   ├── TaxConfigService.cs
    │   ├── PricingRuleService.cs
    │   └── ProductAttributeService.cs
    ├── Inventory/
    │   ├── GRNService.cs
    │   ├── StockService.cs
    │   ├── StockTransferService.cs
    │   └── StockAdjustmentService.cs
    ├── Cashier/
    │   ├── InvoiceService.cs
    │   ├── PaymentService.cs
    │   ├── SessionService.cs
    │   ├── CustomerService.cs
    │   └── ReturnService.cs
    ├── System/
    │   ├── BranchService.cs
    │   ├── WarehouseService.cs
    │   └── SettingsService.cs (admin DB utility)
    ├── TokenValidityService.cs
    └── TagInv.Services.csproj
```

### 4.3 Database Architecture

Two databases follow the SKILL.md dual-database pattern:

| Database | Purpose |
|----------|---------|
| `Tag_Res_Admin` | Token/session management, system settings, module registry, user/role management. **Existing shared database — no schema changes.** |
| `TagInv_Product` | All transactional and master data: products, stock, invoices, customers |

### 4.4 SP Naming Conventions

Following SKILL.md strictly:

| Operation | Pattern | Example |
|-----------|---------|---------|
| Insert/Update/Delete | `[dbo].[TAG_INV_POPULATE_<Entity>]` | `[dbo].[TAG_INV_POPULATE_Product]` |
| Select / Read | `[dbo].[TAG_INV_SELECT_<Entity>]` | `[dbo].[TAG_INV_SELECT_Product]` |
| Admin DB SPs | `[dbo].[TAG_AD_*]` | `[dbo].[TAG_AD_UPDATE_ModuleLog]` |

---

## 5. Module Structure & Project Layout

### 5.1 Logical Modules

```
┌─────────────────────────────────────────────────────────────────┐
│                    TagInv System Modules                         │
├─────────────────────┬───────────────────────────────────────────┤
│  SYSTEM MODULE      │  Branches, Warehouses, System Settings,   │
│                     │  Tax Config, Module Config                │
├─────────────────────┼───────────────────────────────────────────┤
│  REFERENCE MODULE   │  Products, Categories (Multi-level),      │
│  (Master Data)      │  Brands, Suppliers, Units of Measure,    │
│                     │  Price Lists, Product Attributes          │
├─────────────────────┼───────────────────────────────────────────┤
│  INVENTORY MODULE   │  GRN (Goods Received), Stock Ledger,     │
│                     │  Stock Transfers, Adjustments,            │
│                     │  Batch/Expiry Tracking, Reorder Alerts   │
├─────────────────────┼───────────────────────────────────────────┤
│  CASHIER/POS MODULE │  Sessions, Invoicing, Barcode Billing,   │
│                     │  Multi-Payment, Returns, Loyalty,        │
│                     │  Receipt Printing                        │
├─────────────────────┼───────────────────────────────────────────┤
│  REPORTS MODULE     │  Stock Reports, Sales Reports,           │
│                     │  Expiry Reports, Supplier Reports,       │
│                     │  Profit/Loss, Loyalty Reports            │
└─────────────────────┴───────────────────────────────────────────┘
```

### 5.2 Module Code Registry (for X-Token-module header)

| Module Code | Module Name | Covers |
|-------------|-------------|--------|
| `INV` | Inventory Management | System Config, Reference / Master Data, Inventory — all managed as one frontend module |
| `POS` | Cashier / POS | Sessions, invoicing, payments, returns, loyalty |
| `RPT` | Reports & Analytics | All reports and analytics screens |

> SYS and REF are **not separate modules**. The frontend manages System Config, Master Data, and Inventory under a single `INV` session token.

### 5.3 Feature Module Configuration

The system uses a **runtime feature flag** mechanism to enable or disable optional modules. This allows the same codebase to serve both a tiny kade with a minimal setup and a large pharmacy or supermarket running the full feature set. No code is removed — inactive features are simply gated by a flag checked at the service layer.

#### 5.3.1 How It Works

Feature flags are stored as rows in the `SYS_Setting` table with keys prefixed `MOD_`. The `ModuleConfigService` reads them **synchronously** — it is a pure utility class instantiated inline by other services, following the same pattern as `SettingsService`. It is **not registered in DI**.

When a feature is disabled, the service returns early with a standard `BaseModel`:

```json
{ "code": "999", "description": "Module 'BARCODE' is not enabled for this installation.", "data": null }
```

The controller always returns `Ok(response)` — HTTP status stays 200; the `code` field signals the outcome.

---

#### 5.3.2 Module Flag Registry

| Module Code | Setting Key | What It Controls | Default |
|-------------|-------------|-----------------|---------|
| `BARCODE` | `MOD_BARCODE` | Barcode scanning (POS fast path), multi-barcode per product, barcode label printing, barcode auto-generation | `false` |
| `BRAND` | `MOD_BRAND` | Brand master data (BrandService — all operations) | `false` |
| `SUPPLIER` | `MOD_SUPPLIER` | Supplier master data (SupplierService — all operations) | `false` |
| `PRICING_RULES` | `MOD_PRICING_RULES` | Promotional & tiered pricing rules — % discount, fixed price override, BUY-X-GET-Y | `false` |
| `CUSTOMER` | `MOD_CUSTOMER` | Customer management, phone lookup, loyalty card search | `false` |
| `LOYALTY` | `MOD_LOYALTY` | Loyalty points — earn on sale, redeem at checkout (requires `MOD_CUSTOMER=true`) | `false` |
| `SUPPLY_CHAIN` | `MOD_SUPPLY_CHAIN` | GRN (Goods Received Note), Purchase Orders, Stock Transfers between branches | `false` |
| `BATCH_EXPIRY` | `MOD_BATCH_EXPIRY` | Batch number tracking, expiry date capture, FEFO dispatch, expiry alert reports | `false` |
| `PRODUCT_ATTRIBUTES` | `MOD_PRODUCT_ATTRIBUTES` | Dynamic custom attributes per product (key/value pairs — e.g., strength, pack size) | `false` |
| `MULTI_BRANCH` | `MOD_MULTI_BRANCH` | Multiple branches, multiple warehouses per branch (BranchService, WarehouseService) | `false` |
| `RETURNS` | `MOD_RETURNS` | Invoice return / refund processing (ReturnService — all operations) | `false` |
| `REPORTS` | `MOD_REPORTS` | Sales summary, stock-on-hand, expiry report, loyalty summary, GRN report, session Z-report | `true` |

---

#### 5.3.3 Core Features (Always On — No Flag Required)

These work regardless of which modules are enabled:

| Always-On Feature | Notes |
|-------------------|-------|
| Category management (hierarchical) | Every shop needs categories |
| Product CRUD (name, price, current stock qty) | Core product record without barcode dependency |
| Manual stock adjustment (add / reduce qty directly) | Simple stock control without GRN workflow |
| POS session open/close | Required for any billing |
| Invoice creation — cash payment | Core billing with no optional dependencies |
| Product search by name / code | Text-based lookup when barcode module is off |
| Basic system settings | Shop name, VAT, receipt text |

---

#### 5.3.4 `ModuleConfigService` — Implementation

```csharp
// TagInv.Services/ModuleConfigService.cs
using TagInv.Domain.CustomClasses;

namespace TagInv.Services
{
    // NOT registered in DI.
    // Instantiate inline inside any service that needs a module check:
    //   var modules = new ModuleConfigService(_adminConnectionString, _productConnectionString);
    public class ModuleConfigService
    {
        private readonly string _adminConnectionString;
        private readonly string _productConnectionString;

        public ModuleConfigService(string adminConnectionString, string productConnectionString)
        {
            _adminConnectionString   = adminConnectionString;
            _productConnectionString = productConnectionString;
        }

        // Reads MOD_{moduleCode} from SYS_Setting.
        // Returns true when Value is "true" (case-insensitive) or "1".
        public bool IsEnabled(string moduleCode)
        {
            var settings = new SettingsService(_adminConnectionString, _productConnectionString);
            var result   = settings.SelectWithinProject($"MOD_{moduleCode}");
            return string.Equals(result.Value, "true", StringComparison.OrdinalIgnoreCase)
                || result.Value == "1";
        }

        // Standard early-return when a module is disabled.
        public BaseModel ModuleDisabledResponse(string moduleCode) =>
            new BaseModel
            {
                code        = "999",
                description = $"Module '{moduleCode}' is not enabled for this installation. Enable it via System Settings.",
                data        = null
            };
    }
}
```

---

#### 5.3.5 Service-Level Guard Pattern

Every optional service method does a module check **as the first line**, before any database call:

```csharp
// Full-service guard — BrandService (entire service is optional)
public async Task<BaseModel> Insert(Brand data)
{
    var modules = new ModuleConfigService(_adminConnectionString, _productConnectionString);
    if (!modules.IsEnabled("BRAND"))
        return modules.ModuleDisabledResponse("BRAND");

    try
    {
        using (var connection = new SqlConnection(_productConnectionString))
        {
            var para = new DynamicParameters();
            para.Add("@JsonData", JsonConvert.SerializeObject(data), DbType.String);
            para.Add("@Action",   "I", DbType.String);
            var result = await connection.QueryAsync<Brand>(
                "[dbo].[TAG_INV_POPULATE_Brand]", para,
                commandType: CommandType.StoredProcedure);
            return new BaseModel { code = "1000", description = "Success", data = result };
        }
    }
    catch (Exception ex)
    {
        return new BaseModel { code = "998", description = ex.Message, data = data };
    }
}

// Partial guard — single method within ProductService is gated
public async Task<BaseModel> SelectByBarcode(string barcode)
{
    var modules = new ModuleConfigService(_adminConnectionString, _productConnectionString);
    if (!modules.IsEnabled("BARCODE"))
        return modules.ModuleDisabledResponse("BARCODE");

    try
    {
        using (var connection = new SqlConnection(_productConnectionString))
        {
            var para = new DynamicParameters();
            para.Add("@Barcode", barcode, DbType.String);
            var result = (await connection.QueryAsync<Product>(
                "[dbo].[TAG_INV_SELECT_Product]", para,
                commandType: CommandType.StoredProcedure)).FirstOrDefault();
            if (result == null)
                return new BaseModel { code = "4004", description = "Product not found.", data = null };
            return new BaseModel { code = "1000", description = "Success", data = result };
        }
    }
    catch (Exception ex)
    {
        return new BaseModel { code = "998", description = ex.Message, data = barcode };
    }
}
```

---

#### 5.3.6 Module Guard Map — Which Methods Are Gated

| Service | Guarded Methods | Module Code |
|---------|----------------|-------------|
| `BrandService` | Insert, Update, Delete, Select (all) | `BRAND` |
| `SupplierService` | Insert, Update, Delete, Select (all) | `SUPPLIER` |
| `ProductAttributeService` | Insert, Update, Delete, Select (all) | `PRODUCT_ATTRIBUTES` |
| `PricingRuleService` | Insert, Update, Delete, Select, SelectForProduct (all) | `PRICING_RULES` |
| `CustomerService` | Insert, Update, Select, SelectByPhone (all) | `CUSTOMER` |
| `GRNService` | Insert, Update, Select (all) | `SUPPLY_CHAIN` |
| `StockTransferService` | Insert, Select (all) | `SUPPLY_CHAIN` |
| `ReturnService` | Insert, Select (all) | `RETURNS` |
| `ReportService` | SalesSummary, StockOnHand, ExpiryAlert, SessionSummary, LoyaltySummary | `REPORTS` |
| `BranchService` | Insert, Update, Delete, Select (all) | `MULTI_BRANCH` |
| `WarehouseService` | Insert, Update, Delete, Select (all) | `MULTI_BRANCH` |
| `ProductService.SelectByBarcode` | This method only | `BARCODE` |
| `ProductService.Insert/Update` | Barcode array skipped silently if off; product itself still saves | `BARCODE` |
| `InvoiceService.Insert` | Loyalty earn/redeem section skipped if off | `LOYALTY` |
| Batch/expiry fields in `GRNService` | Batch + expiry capture skipped if off | `BATCH_EXPIRY` |

> **Note:** The controllers are not modified — they call the service and return `Ok(response)` exactly as defined in SKILL.md. All module logic lives in the service layer.

---

### 5.4 Shop Profiles — Recommended Module Configurations

The following profiles are suggested starting points. Any combination is valid — the shop owner enables/disables via the System Settings screen.

| Module | Tiny Kade / Boutique | Pharmacy | Supermarket | Hardware | Wholesale |
|--------|:-------------------:|:--------:|:-----------:|:--------:|:---------:|
| `BARCODE` | ✗ | ✓ | ✓ | ✓ | ✓ |
| `BRAND` | ✗ | ✓ | ✓ | ✓ | ✓ |
| `SUPPLIER` | ✗ | ✓ | ✓ | ✓ | ✓ |
| `PRICING_RULES` | ✗ | ✗ | ✓ | ✗ | ✓ |
| `CUSTOMER` | ✗ | ✓ | ✓ | ✗ | ✓ |
| `LOYALTY` | ✗ | ✗ | ✓ | ✗ | ✗ |
| `SUPPLY_CHAIN` | ✗ | ✓ | ✓ | ✓ | ✓ |
| `BATCH_EXPIRY` | ✗ | ✓ | ✗ | ✗ | ✗ |
| `PRODUCT_ATTRIBUTES` | ✗ | ✓ | ✗ | ✓ | ✗ |
| `MULTI_BRANCH` | ✗ | ✗ | ✓ | ✗ | ✓ |
| `RETURNS` | ✗ | ✓ | ✓ | ✓ | ✓ |
| `REPORTS` | ✓ | ✓ | ✓ | ✓ | ✓ |

> A tiny shop runs the full codebase — nothing is removed — with all flags set to `false` except `REPORTS`. The system stays lightweight because disabled services never reach the database.

---

## 6. Phase 1 — Core Inventory + POS

### 6.1 Phase 1 Scope

**Delivery Target:** Production-ready core system

#### System Configuration
- [x] Branch management (create, edit, activate/deactivate)
- [x] Warehouse management linked to branches
- [x] System settings (shop name, address, currency, decimal places, VAT registration number)
- [x] Tax configuration (VAT rate, NBT rate, CESS — dynamic, not hardcoded)
- [x] Barcode type selection (EAN-13, EAN-8, Code 128)
- [x] Receipt template configuration
- [x] Loyalty program settings (points per LKR, redemption rate)

#### Reference / Master Data
- [x] Multi-level category tree (up to 5 levels, unlimited nodes per level)
- [x] Brand management
- [x] Unit of measure management with conversion rules
- [x] Supplier management with contact details
- [x] Product management with:
  - Multiple barcodes per product (EAN-13, Code 128, internal codes)
  - Barcode auto-generation for products without a barcode
  - Product image upload
  - Product linked to category, brand, supplier, UOM
  - Multiple pricing tiers (retail, wholesale, member)
  - Product type flags: is_weighable, is_expiry_tracked, is_batch_tracked, is_service
  - Tax applicability per product
  - Reorder level and minimum stock quantity
  - Product-level description and notes
- [x] Dynamic product attributes (custom fields per category or product type)
- [x] Pricing rule management (percentage discounts, fixed discounts, date ranges)

#### Inventory Management
- [x] Goods Received Note (GRN) with:
  - Supplier linkage
  - Multi-product receipt in one GRN
  - Batch number and expiry date capture per line
  - Purchase cost recording
  - Auto stock increase on GRN approval
- [x] Stock ledger (real-time balance per product/warehouse/branch/batch)
- [x] Stock adjustment (positive/negative) with reason codes
- [x] Inter-branch stock transfer with approval workflow
- [x] Reorder level alert (configured per product per branch)
- [x] Low stock dashboard

#### Cashier/POS
- [x] Cashier session open/close with opening float
- [x] Fast barcode scan billing
- [x] Manual product search (by name, code, barcode)
- [x] Multiple items per invoice
- [x] Quantity edit, price override (with supervisor flag)
- [x] Line-level and invoice-level discount
- [x] Tax calculation per line (VAT-inclusive and exclusive modes)
- [x] Cash payment with change calculation
- [x] Card payment recording (manual entry — no payment gateway in Phase 1)
- [x] Split payment (cash + card)
- [x] Receipt generation and printing
- [x] Invoice void/cancel (supervisor approval)
- [x] Customer selection for invoice (optional)
- [x] Loyalty points accumulation on invoice
- [x] Loyalty points redemption on invoice
- [x] Return/refund processing

#### Reports (Phase 1 — Basic)
- [x] Daily sales summary
- [x] Sales by product
- [x] Stock on hand report
- [x] Low stock / reorder report
- [x] Expiry alert report
- [x] GRN report
- [x] Cashier session summary

### 6.2 Phase 1 Functional Workflows

#### Workflow: Product Onboarding
```
1. Create category hierarchy (if not exists)
2. Create brand (if not exists)
3. Create supplier (if not exists)
4. Create unit of measure (if not exists)
5. Create product → assign category, brand, supplier, UOM
6. Add barcode(s) to product
7. Set pricing tiers
8. Set reorder level per warehouse
9. Print barcode labels
10. Receive stock via GRN
```

#### Workflow: POS Billing
```
1. Cashier opens session (records opening float)
2. Customer walks in (optional: scan loyalty card / enter phone)
3. Cashier scans product barcode → item added to cart
   - Price auto-fetched based on customer type (retail/wholesale/member)
   - Expiry validation: warn if product batch is expiring soon
4. Repeat for all items
5. Apply discounts (promotional, manual override)
6. Select payment method (Cash / Card / Split)
7. Enter amount tendered (for cash) → change calculated
8. Invoice generated → stock decremented atomically
9. Loyalty points calculated and recorded
10. Receipt printed (thermal printer)
11. Cashier closes session → Z-report generated
```

#### Workflow: Stock Transfer
```
1. Source branch creates transfer request
2. Select destination branch/warehouse
3. Add products with quantities
4. System validates: available stock ≥ requested quantity
5. Transfer request saved with status PENDING
6. Destination branch reviews and approves/rejects
7. On approval: source stock decremented, destination stock incremented
8. Transfer reference document generated
```

#### Workflow: GRN (Goods Receipt)
```
1. Create GRN → link to supplier + branch/warehouse
2. Add product lines:
   - Scan or search product
   - Enter quantity received
   - Enter purchase cost per unit
   - Enter batch number (if batch-tracked product)
   - Enter expiry date (if expiry-tracked product)
   - Enter manufacture date (optional)
3. Save GRN with status DRAFT
4. Review and approve GRN
5. On approval: stock ledger updated (atomic transaction)
6. Landed cost recorded for profit calculation
```

---

## 7. Phase 2 — Advanced Features

### 7.1 Phase 2 Scope

**Delivery Target:** Enhanced feature set for growing businesses

#### Promotions & Pricing Engine
- [ ] Buy-X-Get-Y promotions
- [ ] Bundle pricing (combo products)
- [ ] Customer-group-specific pricing
- [ ] Time-limited flash sales
- [ ] Minimum quantity for discount triggers
- [ ] Category-level promotional pricing

#### Advanced Inventory
- [ ] Purchase order (PO) management — raise PO to supplier before GRN
- [ ] PO to GRN matching
- [ ] Consignment stock tracking
- [ ] Stock valuation (FIFO, Weighted Average)
- [ ] Dead stock identification
- [ ] Shelf-life analytics

#### Advanced POS
- [ ] Layaway / advance payment orders
- [ ] Quotation / estimate module
- [ ] Credit sales with customer credit limit
- [ ] Invoice hold / park (multiple open invoices)
- [ ] Table/counter assignment (for shops with sections)
- [ ] Kitchen/dispatch printing (for pharmacies with preparation)
- [ ] Scale integration (for weight-based items)
- [ ] Customer display screen support

#### eCommerce Integration
- [ ] Product catalog sync with WooCommerce / Shopify
- [ ] Online order import into POS
- [ ] Unified inventory for online and offline

#### Advanced Reporting
- [ ] Profit and loss report (with landed cost)
- [ ] Supplier payment aging
- [ ] Customer purchase history
- [ ] Trend analysis (sales velocity)
- [ ] Reorder suggestion report
- [ ] Tax reports (VAT return summary)
- [ ] Batch-wise cost and margin analysis

#### Multi-Currency (for wholesale importing businesses)
- [ ] Purchase currency (USD, EUR) with exchange rate recording
- [ ] Cost converted to LKR at GRN time

---

## 8. Phase 3 — QR & Mobile Wallet Integration

### 8.1 Phase 3 Scope

**Delivery Target:** Full digital payment acceptance

#### Lanka QR Integration
- [ ] Generate Lanka QR payment codes at checkout
- [ ] Real-time payment confirmation via webhook
- [ ] Automatic invoice completion on payment confirmation
- [ ] QR code display on cashier screen and customer display

#### Mobile Wallet Support
- [ ] FriMi wallet integration
- [ ] ezCash (Dialog) integration
- [ ] iPay integration
- [ ] mCash integration

#### Digital Receipt
- [ ] QR code on receipt linking to digital receipt URL
- [ ] Email receipt delivery
- [ ] SMS receipt notification

#### Advanced Loyalty
- [ ] Digital loyalty card (QR-based)
- [ ] Customer mobile app integration
- [ ] Loyalty tiers with different earning rates

---

## 9. Database Design

### 9.1 Database: `Tag_Res_Admin`

> **IMPORTANT: This is an existing shared TagTeam platform database. No DDL changes are made to this database. TagInv uses it read-only for authentication and settings. All table and SP names must match exactly as documented here.**

All timestamps in this database use Sri Lanka timezone (UTC+5:30):
`DATEADD(MINUTE, 30, DATEADD(HH, 5, GETUTCDATE()))`

#### Actual Tables (existing — no changes)

| Table | Columns | Purpose |
|-------|---------|---------|
| `Tag_AD_Settings` | SettingID (int PK), Code (varchar MAX), Description (varchar MAX), IsEnable (bit), Value (varchar 50) | Key-value settings store. Read via `TAG_AD_SELECT_Settings`. |
| `Tag_AD_ModuleLoggingLog` | ID (bigint PK), ModuleCode (varchar 5), UserId (int), Token (uniqueidentifier), UrlToken (uniqueidentifier), LastUpdate (datetime) | Active module sessions. One row per user+module. Deleted and re-created on each login. |
| `Tag_AD_Modules` | ID (int PK), Code (varchar 5), Name (varchar 100), BindingUrl, IdleTimeInMin (int), Icon, DevBindingUrl | Registered UI modules. `IdleTimeInMin` drives session expiry. |
| `Tag_AD_ModuleWiseRoles` | ModuleWiseRoleId (int PK), ModuleCode (varchar 5), RoleId (int) | Which roles may access each module. |
| `Tag_AD_User` | UserID (int PK), FirstName, LastName, MobileNo, AddressLine1–4, email, audit cols | Staff user profile. |
| `Tag_AD_UserAccountDetails` | UserID (int PK), Username, EncriptedUsername, Password, ResetCode | Login credentials (encrypted). |
| `Tag_AD_UserAccountDetailsChangeLog` | LogID, UserID, OldPassword, ResetCode, RequestedOn, IsChanged, ChangedOn | Password change audit. |
| `Tag_AD_Ref_Roles` | RoleID (int PK), Description, Code (varchar 10) | Role definitions. |
| `Tag_AD_UserWiseRole` | UserID (int), RoleID (int) | User → role mapping. |
| `Tag_AD_PageHeaders` | HeaderId (int PK), HeaderName, Icon, ModuleCode (varchar 5) | Navigation group headers per module. |
| `Tag_AD_Pages` | PageID (int PK), HeaderId, PageName, Path | Individual UI pages/routes. |
| `Tag_AD_PageWiseRoles` | PageWiseRoleId (int PK), PageID, RoleId | Role-based page access control. |
| `Tag_AD_NextNumberWithFormats` | Id (int PK), Description, Prefix (varchar 50), Length (int), NextNumber (int), LastUpdatedDate (date), IsCombinedDate (bit) | Auto-increment document number sequences. `IsCombinedDate=1` resets counter daily. |
| `Tag_AD_DataLog` | LogID (int PK), Table, SP, TableID, Action, Json, OldJson, Date, IsSuccess (bit), Error | Cross-database error/audit log. Written to from TagInv_Product SPs on catch. |
| `TAG_AD_MailLog` | ID (bigint PK), ToAddress, FromAddress, Subject, Body, IsSent, QuedDate, SendDate, Response, Error | Outbound email queue. |

#### Tag_Res_Admin — Functions

| Function | Parameters | Returns | Purpose |
|----------|-----------|---------|---------|
| `GetNextNumber` | `@Prefix VARCHAR(10)` | `VARCHAR(500)` | Formats next document number: prefix + zero-padded counter. Appends `yyMMdd` when `IsCombinedDate = 1`. |
| `GetUserFullName` | `@id INT` | `VARCHAR(500)` | Returns `FirstName + ' ' + LastName` from `Tag_AD_User`. |

### 9.2 Database: `TagInv_Product`

#### 9.2.1 System / Configuration Tables

```sql
-- ============================================================
-- SYSTEM TABLES
-- ============================================================

-- Branch (physical locations / shops)
CREATE TABLE [dbo].[SYS_Branch] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [Code]            NVARCHAR(20)  NOT NULL UNIQUE,
    [BranchName]      NVARCHAR(100) NOT NULL,
    [Address]         NVARCHAR(500) NULL,
    [City]            NVARCHAR(100) NULL,
    [Province]        NVARCHAR(100) NULL,
    [Phone]           NVARCHAR(20)  NULL,
    [Email]           NVARCHAR(100) NULL,
    [VatRegNo]        NVARCHAR(50)  NULL,  -- Branch-specific VAT number if different
    [IsHeadOffice]    BIT           NOT NULL DEFAULT 0,
    [IsActive]        BIT           NOT NULL DEFAULT 1,
    [SortOrder]       INT           NOT NULL DEFAULT 0,
    [AddedBy]         NVARCHAR(100) NULL,
    [AddedOn]         DATETIME      NULL DEFAULT GETDATE(),
    [ModifiedBy]      NVARCHAR(100) NULL,
    [ModifiedOn]      DATETIME      NULL
);

-- Warehouse (storage locations within a branch)
CREATE TABLE [dbo].[SYS_Warehouse] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [Code]            NVARCHAR(20)  NOT NULL UNIQUE,
    [WarehouseName]   NVARCHAR(100) NOT NULL,
    [BranchId]        INT           NOT NULL REFERENCES [SYS_Branch]([Id]),
    [IsDefault]       BIT           NOT NULL DEFAULT 0,
    [IsActive]        BIT           NOT NULL DEFAULT 1,
    [AddedBy]         NVARCHAR(100) NULL,
    [AddedOn]         DATETIME      NULL DEFAULT GETDATE(),
    [ModifiedBy]      NVARCHAR(100) NULL,
    [ModifiedOn]      DATETIME      NULL
);

-- System settings (product DB side — runtime configs)
CREATE TABLE [dbo].[SYS_Setting] (
    [Id]            INT           IDENTITY(1,1) PRIMARY KEY,
    [SettingKey]    NVARCHAR(100) NOT NULL UNIQUE,
    [SettingValue]  NVARCHAR(MAX) NOT NULL,
    [DataType]      NVARCHAR(20)  NOT NULL DEFAULT 'string',
    -- DataType: string | int | decimal | bool | json
    [GroupName]     NVARCHAR(50)  NULL,
    [DisplayName]   NVARCHAR(100) NULL,
    [Description]   NVARCHAR(500) NULL,
    [IsEditable]    BIT           NOT NULL DEFAULT 1,
    [SortOrder]     INT           NOT NULL DEFAULT 0,
    [ModifiedBy]    NVARCHAR(100) NULL,
    [ModifiedOn]    DATETIME      NULL
);

-- Default settings seed:
-- Key: SHOP_NAME, SHOP_ADDRESS, VAT_RATE, VAT_ENABLED, NBT_RATE, NBT_ENABLED,
--      CURRENCY_CODE (LKR), DECIMAL_PLACES (2), FISCAL_YEAR_START (04-01),
--      BARCODE_DEFAULT_TYPE (EAN-13), RECEIPT_FOOTER_TEXT,
--      LOYALTY_ENABLED, LOYALTY_POINTS_PER_LKR, LOYALTY_REDEMPTION_RATE,
--      EXPIRY_WARNING_DAYS_1 (30), EXPIRY_WARNING_DAYS_2 (90),
--      REORDER_ALERT_ENABLED, FILE_PATH (FP)

-- Tax configuration
CREATE TABLE [dbo].[SYS_TaxConfig] (
    [Id]           INT           IDENTITY(1,1) PRIMARY KEY,
    [Code]         NVARCHAR(20)  NOT NULL UNIQUE,
    [TaxName]      NVARCHAR(100) NOT NULL,
    [TaxType]      NVARCHAR(20)  NOT NULL,
    -- TaxType: VAT | NBT | CESS | CUSTOM
    [Rate]         DECIMAL(8,4)  NOT NULL DEFAULT 0,
    [IsInclusive]  BIT           NOT NULL DEFAULT 0,
    -- IsInclusive: 1 = tax included in price, 0 = tax added on top
    [IsActive]     BIT           NOT NULL DEFAULT 1,
    [EffectiveFrom] DATE         NULL,
    [EffectiveTo]  DATE          NULL,
    [AddedBy]      NVARCHAR(100) NULL,
    [AddedOn]      DATETIME      NULL DEFAULT GETDATE(),
    [ModifiedBy]   NVARCHAR(100) NULL,
    [ModifiedOn]   DATETIME      NULL
);
```

#### 9.2.2 Reference / Master Data Tables

```sql
-- ============================================================
-- REFERENCE TABLES
-- ============================================================

-- Multi-level category (self-referencing for hierarchy)
CREATE TABLE [dbo].[REF_Category] (
    [Id]           INT           IDENTITY(1,1) PRIMARY KEY,
    [Code]         NVARCHAR(30)  NOT NULL UNIQUE,
    [CategoryName] NVARCHAR(200) NOT NULL,
    [ParentId]     INT           NULL REFERENCES [REF_Category]([Id]),
    -- ParentId = NULL means top-level category
    [Level]        TINYINT       NOT NULL DEFAULT 1,
    -- Level: 1 = root, 2 = sub, 3 = sub-sub, etc. (max 5)
    [FullPath]     NVARCHAR(500) NULL,
    -- Computed materialized path, e.g., "1/5/12/45" for fast tree queries
    [Description]  NVARCHAR(500) NULL,
    [ImageUrl]     NVARCHAR(1000) NULL,
    [ImageMimeType] NVARCHAR(100) NULL,
    [SortOrder]    INT           NOT NULL DEFAULT 0,
    [IsActive]     BIT           NOT NULL DEFAULT 1,
    [AddedBy]      NVARCHAR(100) NULL,
    [AddedOn]      DATETIME      NULL DEFAULT GETDATE(),
    [ModifiedBy]   NVARCHAR(100) NULL,
    [ModifiedOn]   DATETIME      NULL
);
CREATE INDEX IX_Category_ParentId ON [dbo].[REF_Category]([ParentId]);
CREATE INDEX IX_Category_Level ON [dbo].[REF_Category]([Level]);

-- Brand
CREATE TABLE [dbo].[REF_Brand] (
    [Id]           INT           IDENTITY(1,1) PRIMARY KEY,
    [Code]         NVARCHAR(30)  NOT NULL UNIQUE,
    [BrandName]    NVARCHAR(200) NOT NULL,
    [Country]      NVARCHAR(100) NULL,
    [LogoUrl]      NVARCHAR(1000) NULL,
    [LogoMimeType] NVARCHAR(100) NULL,
    [IsActive]     BIT           NOT NULL DEFAULT 1,
    [AddedBy]      NVARCHAR(100) NULL,
    [AddedOn]      DATETIME      NULL DEFAULT GETDATE(),
    [ModifiedBy]   NVARCHAR(100) NULL,
    [ModifiedOn]   DATETIME      NULL
);

-- Unit of Measure
CREATE TABLE [dbo].[REF_UnitOfMeasure] (
    [Id]           INT           IDENTITY(1,1) PRIMARY KEY,
    [Code]         NVARCHAR(20)  NOT NULL UNIQUE,
    [UnitName]     NVARCHAR(100) NOT NULL,
    [UnitSymbol]   NVARCHAR(20)  NOT NULL,
    [BaseUnitId]   INT           NULL REFERENCES [REF_UnitOfMeasure]([Id]),
    -- BaseUnitId links to base unit for conversion (e.g., gram → kilogram)
    [ConversionFactor] DECIMAL(18,6) NULL,
    -- e.g., 1 kg = 1000 grams: BaseUnitId = gram's Id, ConversionFactor = 1000
    [IsBase]       BIT           NOT NULL DEFAULT 0,
    [IsActive]     BIT           NOT NULL DEFAULT 1,
    [AddedBy]      NVARCHAR(100) NULL,
    [AddedOn]      DATETIME      NULL DEFAULT GETDATE(),
    [ModifiedBy]   NVARCHAR(100) NULL,
    [ModifiedOn]   DATETIME      NULL
);

-- Supplier
CREATE TABLE [dbo].[REF_Supplier] (
    [Id]             INT           IDENTITY(1,1) PRIMARY KEY,
    [Code]           NVARCHAR(30)  NOT NULL UNIQUE,
    [SupplierName]   NVARCHAR(200) NOT NULL,
    [ContactPerson]  NVARCHAR(100) NULL,
    [Phone1]         NVARCHAR(20)  NULL,
    [Phone2]         NVARCHAR(20)  NULL,
    [Email]          NVARCHAR(100) NULL,
    [Address]        NVARCHAR(500) NULL,
    [City]           NVARCHAR(100) NULL,
    [VatRegNo]       NVARCHAR(50)  NULL,
    [BusinessRegNo]  NVARCHAR(50)  NULL,
    [BankName]       NVARCHAR(100) NULL,
    [BankAccountNo]  NVARCHAR(50)  NULL,
    [LeadTimeDays]   INT           NULL DEFAULT 0,
    [PaymentTermDays] INT          NULL DEFAULT 30,
    [IsActive]       BIT           NOT NULL DEFAULT 1,
    [Notes]          NVARCHAR(MAX) NULL,
    [AddedBy]        NVARCHAR(100) NULL,
    [AddedOn]        DATETIME      NULL DEFAULT GETDATE(),
    [ModifiedBy]     NVARCHAR(100) NULL,
    [ModifiedOn]     DATETIME      NULL
);

-- Product Attribute Definition (dynamic fields)
CREATE TABLE [dbo].[REF_AttributeDefinition] (
    [Id]             INT           IDENTITY(1,1) PRIMARY KEY,
    [Code]           NVARCHAR(30)  NOT NULL UNIQUE,
    [AttributeName]  NVARCHAR(100) NOT NULL,
    [DataType]       NVARCHAR(20)  NOT NULL DEFAULT 'string',
    -- DataType: string | int | decimal | bool | date | list
    [Unit]           NVARCHAR(50)  NULL,  -- e.g., "mg", "ml", "cm"
    [CategoryId]     INT           NULL REFERENCES [REF_Category]([Id]),
    -- NULL = applicable to all; specific = only for that category subtree
    [IsRequired]     BIT           NOT NULL DEFAULT 0,
    [AllowedValues]  NVARCHAR(MAX) NULL,  -- JSON array for 'list' type
    [SortOrder]      INT           NOT NULL DEFAULT 0,
    [IsActive]       BIT           NOT NULL DEFAULT 1,
    [AddedBy]        NVARCHAR(100) NULL,
    [AddedOn]        DATETIME      NULL DEFAULT GETDATE(),
    [ModifiedBy]     NVARCHAR(100) NULL,
    [ModifiedOn]     DATETIME      NULL
);

-- Core Product Table
CREATE TABLE [dbo].[REF_Product] (
    [Id]               INT            IDENTITY(1,1) PRIMARY KEY,
    [Code]             NVARCHAR(30)   NOT NULL UNIQUE,
    [ProductName]      NVARCHAR(300)  NOT NULL,
    [GenericName]      NVARCHAR(300)  NULL,  -- For pharmacy: generic/INN name
    [CategoryId]       INT            NOT NULL REFERENCES [REF_Category]([Id]),
    [BrandId]          INT            NULL REFERENCES [REF_Brand]([Id]),
    [SupplierId]       INT            NULL REFERENCES [REF_Supplier]([Id]),
    [PurchaseUomId]    INT            NOT NULL REFERENCES [REF_UnitOfMeasure]([Id]),
    [SaleUomId]        INT            NOT NULL REFERENCES [REF_UnitOfMeasure]([Id]),
    [TaxConfigId]      INT            NULL REFERENCES [SYS_TaxConfig]([Id]),
    -- Product Type Flags
    [IsWeighable]      BIT            NOT NULL DEFAULT 0,
    [IsExpiryTracked]  BIT            NOT NULL DEFAULT 0,
    [IsBatchTracked]   BIT            NOT NULL DEFAULT 0,
    [IsService]        BIT            NOT NULL DEFAULT 0,
    [IsControlledDrug] BIT            NOT NULL DEFAULT 0,  -- Pharmacy
    [IsActive]         BIT            NOT NULL DEFAULT 1,
    -- Physical Details
    [Description]      NVARCHAR(MAX)  NULL,
    [ImageUrl]         NVARCHAR(1000) NULL,
    [ImageMimeType]    NVARCHAR(100)  NULL,
    -- Pricing Defaults
    [CostPrice]        DECIMAL(18,4)  NOT NULL DEFAULT 0,
    [RetailPrice]      DECIMAL(18,4)  NOT NULL DEFAULT 0,
    [WholesalePrice]   DECIMAL(18,4)  NOT NULL DEFAULT 0,
    [MemberPrice]      DECIMAL(18,4)  NULL,
    [MinMarginPct]     DECIMAL(8,4)   NULL,  -- Min allowed margin %
    -- Stock Control
    [ReorderLevel]     DECIMAL(18,4)  NOT NULL DEFAULT 0,
    [MinStockQty]      DECIMAL(18,4)  NOT NULL DEFAULT 0,
    [MaxStockQty]      DECIMAL(18,4)  NULL,
    -- Barcode Config
    [DefaultBarcodeType] NVARCHAR(20) NOT NULL DEFAULT 'EAN-13',
    -- Metadata
    [Notes]            NVARCHAR(MAX)  NULL,
    [AddedBy]          NVARCHAR(100)  NULL,
    [AddedOn]          DATETIME       NULL DEFAULT GETDATE(),
    [ModifiedBy]       NVARCHAR(100)  NULL,
    [ModifiedOn]       DATETIME       NULL
);
CREATE INDEX IX_Product_CategoryId ON [dbo].[REF_Product]([CategoryId]);
CREATE INDEX IX_Product_SupplierId ON [dbo].[REF_Product]([SupplierId]);
CREATE INDEX IX_Product_BrandId ON [dbo].[REF_Product]([BrandId]);
CREATE INDEX IX_Product_IsActive ON [dbo].[REF_Product]([IsActive]);

-- Product Barcodes (multiple per product)
CREATE TABLE [dbo].[REF_ProductBarcode] (
    [Id]           INT           IDENTITY(1,1) PRIMARY KEY,
    [ProductId]    INT           NOT NULL REFERENCES [REF_Product]([Id]),
    [Barcode]      NVARCHAR(100) NOT NULL,
    [BarcodeType]  NVARCHAR(20)  NOT NULL DEFAULT 'EAN-13',
    -- BarcodeType: EAN-13 | EAN-8 | CODE-128 | CODE-39 | QR | INTERNAL
    [IsPrimary]    BIT           NOT NULL DEFAULT 0,
    [IsActive]     BIT           NOT NULL DEFAULT 1,
    [AddedBy]      NVARCHAR(100) NULL,
    [AddedOn]      DATETIME      NULL DEFAULT GETDATE()
);
CREATE UNIQUE INDEX IX_ProductBarcode_Barcode ON [dbo].[REF_ProductBarcode]([Barcode]);
CREATE INDEX IX_ProductBarcode_ProductId ON [dbo].[REF_ProductBarcode]([ProductId]);

-- Product Attribute Values
CREATE TABLE [dbo].[REF_ProductAttributeValue] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [ProductId]       INT           NOT NULL REFERENCES [REF_Product]([Id]),
    [AttributeDefId]  INT           NOT NULL REFERENCES [REF_AttributeDefinition]([Id]),
    [ValueString]     NVARCHAR(500) NULL,
    [ValueDecimal]    DECIMAL(18,4) NULL,
    [ValueInt]        INT           NULL,
    [ValueBool]       BIT           NULL,
    [ValueDate]       DATE          NULL,
    UNIQUE ([ProductId], [AttributeDefId])
);

-- Pricing Rules (promotional, tiered)
CREATE TABLE [dbo].[REF_PricingRule] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [Code]            NVARCHAR(30)  NOT NULL UNIQUE,
    [RuleName]        NVARCHAR(200) NOT NULL,
    [RuleType]        NVARCHAR(30)  NOT NULL,
    -- RuleType: PERCENTAGE_DISCOUNT | FIXED_DISCOUNT | FIXED_PRICE | BUY_X_GET_Y
    [AppliesTo]       NVARCHAR(20)  NOT NULL DEFAULT 'PRODUCT',
    -- AppliesTo: PRODUCT | CATEGORY | ALL
    [ProductId]       INT           NULL REFERENCES [REF_Product]([Id]),
    [CategoryId]      INT           NULL REFERENCES [REF_Category]([Id]),
    [DiscountPct]     DECIMAL(8,4)  NULL,
    [DiscountAmount]  DECIMAL(18,4) NULL,
    [FixedPrice]      DECIMAL(18,4) NULL,
    [MinQty]          DECIMAL(18,4) NULL DEFAULT 1,
    [BuyQty]          DECIMAL(18,4) NULL,  -- For BUY_X_GET_Y
    [FreeQty]         DECIMAL(18,4) NULL,  -- For BUY_X_GET_Y
    [ValidFrom]       DATE          NULL,
    [ValidTo]         DATE          NULL,
    [IsActive]        BIT           NOT NULL DEFAULT 1,
    [Priority]        INT           NOT NULL DEFAULT 0,
    [AddedBy]         NVARCHAR(100) NULL,
    [AddedOn]         DATETIME      NULL DEFAULT GETDATE(),
    [ModifiedBy]      NVARCHAR(100) NULL,
    [ModifiedOn]      DATETIME      NULL
);
```

#### 9.2.3 Inventory Tables

```sql
-- ============================================================
-- INVENTORY TABLES
-- ============================================================

-- Reason Codes (for adjustments, returns, transfers)
CREATE TABLE [dbo].[INV_ReasonCode] (
    [Id]           INT           IDENTITY(1,1) PRIMARY KEY,
    [Code]         NVARCHAR(20)  NOT NULL UNIQUE,
    [Description]  NVARCHAR(200) NOT NULL,
    [ReasonType]   NVARCHAR(30)  NOT NULL,
    -- ReasonType: ADJUSTMENT | RETURN | TRANSFER | DAMAGE | EXPIRED
    [IsActive]     BIT           NOT NULL DEFAULT 1
);

-- GRN Header (Goods Received Note)
CREATE TABLE [dbo].[INV_GRN] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [GRNNo]           NVARCHAR(30)  NOT NULL UNIQUE,
    [BranchId]        INT           NOT NULL REFERENCES [SYS_Branch]([Id]),
    [WarehouseId]     INT           NOT NULL REFERENCES [SYS_Warehouse]([Id]),
    [SupplierId]      INT           NOT NULL REFERENCES [REF_Supplier]([Id]),
    [SupplierInvoiceNo] NVARCHAR(50) NULL,
    [SupplierInvoiceDate] DATE       NULL,
    [GRNDate]         DATE          NOT NULL DEFAULT CAST(GETDATE() AS DATE),
    [Status]          NVARCHAR(20)  NOT NULL DEFAULT 'DRAFT',
    -- Status: DRAFT | APPROVED | CANCELLED
    [TotalCost]       DECIMAL(18,4) NOT NULL DEFAULT 0,
    [Notes]           NVARCHAR(MAX) NULL,
    [ApprovedBy]      NVARCHAR(100) NULL,
    [ApprovedOn]      DATETIME      NULL,
    [AddedBy]         NVARCHAR(100) NULL,
    [AddedOn]         DATETIME      NULL DEFAULT GETDATE(),
    [ModifiedBy]      NVARCHAR(100) NULL,
    [ModifiedOn]      DATETIME      NULL
);
CREATE INDEX IX_GRN_BranchId ON [dbo].[INV_GRN]([BranchId]);
CREATE INDEX IX_GRN_SupplierId ON [dbo].[INV_GRN]([SupplierId]);
CREATE INDEX IX_GRN_GRNDate ON [dbo].[INV_GRN]([GRNDate]);

-- GRN Detail Lines
CREATE TABLE [dbo].[INV_GRNDetail] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [GRNId]           INT           NOT NULL REFERENCES [INV_GRN]([Id]),
    [ProductId]       INT           NOT NULL REFERENCES [REF_Product]([Id]),
    [UomId]           INT           NOT NULL REFERENCES [REF_UnitOfMeasure]([Id]),
    [Quantity]        DECIMAL(18,4) NOT NULL,
    [FreeQty]         DECIMAL(18,4) NOT NULL DEFAULT 0,
    [CostPrice]       DECIMAL(18,4) NOT NULL,
    [RetailPrice]     DECIMAL(18,4) NOT NULL DEFAULT 0,  -- Can update retail at GRN
    [BatchNo]         NVARCHAR(50)  NULL,
    [ManufactureDate] DATE          NULL,
    [ExpiryDate]      DATE          NULL,
    [LineTotal]       DECIMAL(18,4) NOT NULL DEFAULT 0
);
CREATE INDEX IX_GRNDetail_GRNId ON [dbo].[INV_GRNDetail]([GRNId]);
CREATE INDEX IX_GRNDetail_ProductId ON [dbo].[INV_GRNDetail]([ProductId]);

-- Batch Master (created when batch-tracked products are received)
CREATE TABLE [dbo].[INV_Batch] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [BatchNo]         NVARCHAR(50)  NOT NULL,
    [ProductId]       INT           NOT NULL REFERENCES [REF_Product]([Id]),
    [WarehouseId]     INT           NOT NULL REFERENCES [SYS_Warehouse]([Id]),
    [GRNId]           INT           NOT NULL REFERENCES [INV_GRN]([Id]),
    [ManufactureDate] DATE          NULL,
    [ExpiryDate]      DATE          NULL,
    [InitialQty]      DECIMAL(18,4) NOT NULL,
    [CurrentQty]      DECIMAL(18,4) NOT NULL,
    [CostPrice]       DECIMAL(18,4) NOT NULL,
    [IsActive]        BIT           NOT NULL DEFAULT 1,
    UNIQUE ([BatchNo], [ProductId], [WarehouseId])
);
CREATE INDEX IX_Batch_ProductId ON [dbo].[INV_Batch]([ProductId]);
CREATE INDEX IX_Batch_ExpiryDate ON [dbo].[INV_Batch]([ExpiryDate]);
CREATE INDEX IX_Batch_WarehouseId ON [dbo].[INV_Batch]([WarehouseId]);

-- Stock Ledger (real-time balances per product/warehouse)
CREATE TABLE [dbo].[INV_StockLedger] (
    [Id]              BIGINT        IDENTITY(1,1) PRIMARY KEY,
    [ProductId]       INT           NOT NULL REFERENCES [REF_Product]([Id]),
    [WarehouseId]     INT           NOT NULL REFERENCES [SYS_Warehouse]([Id]),
    [BatchId]         INT           NULL REFERENCES [INV_Batch]([Id]),
    -- BatchId is NULL for non-batch products
    [TransactionType] NVARCHAR(30)  NOT NULL,
    -- TransactionType: GRN | SALE | RETURN | TRANSFER_IN | TRANSFER_OUT | ADJUSTMENT
    [ReferenceNo]     NVARCHAR(50)  NOT NULL,
    [ReferenceId]     INT           NULL,
    [InQty]           DECIMAL(18,4) NOT NULL DEFAULT 0,
    [OutQty]          DECIMAL(18,4) NOT NULL DEFAULT 0,
    [BalanceQty]      DECIMAL(18,4) NOT NULL,
    [CostPrice]       DECIMAL(18,4) NOT NULL DEFAULT 0,
    [TransactionDate] DATETIME      NOT NULL DEFAULT GETDATE(),
    [Notes]           NVARCHAR(500) NULL,
    [AddedBy]         NVARCHAR(100) NULL
);
CREATE INDEX IX_StockLedger_ProductWarehouse 
    ON [dbo].[INV_StockLedger]([ProductId], [WarehouseId]);
CREATE INDEX IX_StockLedger_TransactionDate 
    ON [dbo].[INV_StockLedger]([TransactionDate]);
CREATE INDEX IX_StockLedger_BatchId 
    ON [dbo].[INV_StockLedger]([BatchId]);

-- Stock Balance View (current balance per product/warehouse)
-- This is a derived view maintained via SP for performance
CREATE TABLE [dbo].[INV_StockBalance] (
    [Id]          INT           IDENTITY(1,1) PRIMARY KEY,
    [ProductId]   INT           NOT NULL REFERENCES [REF_Product]([Id]),
    [WarehouseId] INT           NOT NULL REFERENCES [SYS_Warehouse]([Id]),
    [CurrentQty]  DECIMAL(18,4) NOT NULL DEFAULT 0,
    [ReservedQty] DECIMAL(18,4) NOT NULL DEFAULT 0,  -- Reserved for pending orders
    [AvailableQty] AS ([CurrentQty] - [ReservedQty]),  -- Computed column
    [LastUpdated] DATETIME      NOT NULL DEFAULT GETDATE(),
    UNIQUE ([ProductId], [WarehouseId])
);
CREATE INDEX IX_StockBalance_ProductId ON [dbo].[INV_StockBalance]([ProductId]);
CREATE INDEX IX_StockBalance_WarehouseId ON [dbo].[INV_StockBalance]([WarehouseId]);

-- Stock Adjustment Header
CREATE TABLE [dbo].[INV_StockAdjustment] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [AdjustmentNo]    NVARCHAR(30)  NOT NULL UNIQUE,
    [WarehouseId]     INT           NOT NULL REFERENCES [SYS_Warehouse]([Id]),
    [AdjustmentDate]  DATE          NOT NULL DEFAULT CAST(GETDATE() AS DATE),
    [ReasonCodeId]    INT           NOT NULL REFERENCES [INV_ReasonCode]([Id]),
    [Status]          NVARCHAR(20)  NOT NULL DEFAULT 'DRAFT',
    [Notes]           NVARCHAR(MAX) NULL,
    [ApprovedBy]      NVARCHAR(100) NULL,
    [ApprovedOn]      DATETIME      NULL,
    [AddedBy]         NVARCHAR(100) NULL,
    [AddedOn]         DATETIME      NULL DEFAULT GETDATE(),
    [ModifiedBy]      NVARCHAR(100) NULL,
    [ModifiedOn]      DATETIME      NULL
);

-- Stock Adjustment Detail
CREATE TABLE [dbo].[INV_StockAdjustmentDetail] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [AdjustmentId]    INT           NOT NULL REFERENCES [INV_StockAdjustment]([Id]),
    [ProductId]       INT           NOT NULL REFERENCES [REF_Product]([Id]),
    [BatchId]         INT           NULL REFERENCES [INV_Batch]([Id]),
    [SystemQty]       DECIMAL(18,4) NOT NULL,
    [PhysicalQty]     DECIMAL(18,4) NOT NULL,
    [DifferenceQty]   AS ([PhysicalQty] - [SystemQty]),
    [CostPrice]       DECIMAL(18,4) NOT NULL DEFAULT 0
);

-- Stock Transfer Header
CREATE TABLE [dbo].[INV_StockTransfer] (
    [Id]               INT           IDENTITY(1,1) PRIMARY KEY,
    [TransferNo]       NVARCHAR(30)  NOT NULL UNIQUE,
    [FromWarehouseId]  INT           NOT NULL REFERENCES [SYS_Warehouse]([Id]),
    [ToWarehouseId]    INT           NOT NULL REFERENCES [SYS_Warehouse]([Id]),
    [TransferDate]     DATE          NOT NULL DEFAULT CAST(GETDATE() AS DATE),
    [Status]           NVARCHAR(20)  NOT NULL DEFAULT 'PENDING',
    -- Status: PENDING | APPROVED | RECEIVED | REJECTED | CANCELLED
    [Notes]            NVARCHAR(MAX) NULL,
    [RequestedBy]      NVARCHAR(100) NULL,
    [ApprovedBy]       NVARCHAR(100) NULL,
    [ApprovedOn]       DATETIME      NULL,
    [ReceivedBy]       NVARCHAR(100) NULL,
    [ReceivedOn]       DATETIME      NULL,
    [AddedBy]          NVARCHAR(100) NULL,
    [AddedOn]          DATETIME      NULL DEFAULT GETDATE(),
    [ModifiedBy]       NVARCHAR(100) NULL,
    [ModifiedOn]       DATETIME      NULL
);

-- Stock Transfer Detail
CREATE TABLE [dbo].[INV_StockTransferDetail] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [TransferId]      INT           NOT NULL REFERENCES [INV_StockTransfer]([Id]),
    [ProductId]       INT           NOT NULL REFERENCES [REF_Product]([Id]),
    [BatchId]         INT           NULL REFERENCES [INV_Batch]([Id]),
    [RequestedQty]    DECIMAL(18,4) NOT NULL,
    [SentQty]         DECIMAL(18,4) NOT NULL DEFAULT 0,
    [ReceivedQty]     DECIMAL(18,4) NOT NULL DEFAULT 0
);
```

#### 9.2.4 Cashier / POS Tables

```sql
-- ============================================================
-- CASHIER / POS TABLES
-- ============================================================

-- Customer
CREATE TABLE [dbo].[POS_Customer] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [Code]            NVARCHAR(30)  NOT NULL UNIQUE,
    [CustomerName]    NVARCHAR(200) NOT NULL,
    [Phone]           NVARCHAR(20)  NULL,
    [Email]           NVARCHAR(100) NULL,
    [NIC]             NVARCHAR(20)  NULL,  -- National Identity Card
    [Address]         NVARCHAR(500) NULL,
    [CustomerType]    NVARCHAR(20)  NOT NULL DEFAULT 'RETAIL',
    -- CustomerType: RETAIL | WHOLESALE | MEMBER | CREDIT
    [LoyaltyCardNo]   NVARCHAR(50)  NULL UNIQUE,
    [LoyaltyPoints]   DECIMAL(18,2) NOT NULL DEFAULT 0,
    [CreditLimit]     DECIMAL(18,4) NOT NULL DEFAULT 0,
    [OutstandingBalance] DECIMAL(18,4) NOT NULL DEFAULT 0,
    [IsActive]        BIT           NOT NULL DEFAULT 1,
    [DateOfBirth]     DATE          NULL,
    [JoinedOn]        DATE          NULL DEFAULT CAST(GETDATE() AS DATE),
    [AddedBy]         NVARCHAR(100) NULL,
    [AddedOn]         DATETIME      NULL DEFAULT GETDATE(),
    [ModifiedBy]      NVARCHAR(100) NULL,
    [ModifiedOn]      DATETIME      NULL
);
CREATE INDEX IX_Customer_Phone ON [dbo].[POS_Customer]([Phone]);
CREATE INDEX IX_Customer_LoyaltyCardNo ON [dbo].[POS_Customer]([LoyaltyCardNo]);

-- Cashier Session
CREATE TABLE [dbo].[POS_Session] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [SessionNo]       NVARCHAR(30)  NOT NULL UNIQUE,
    [BranchId]        INT           NOT NULL REFERENCES [SYS_Branch]([Id]),
    [CashierCode]     NVARCHAR(50)  NOT NULL,
    [CashierName]     NVARCHAR(100) NOT NULL,
    [OpenedOn]        DATETIME      NOT NULL DEFAULT GETDATE(),
    [ClosedOn]        DATETIME      NULL,
    [OpeningFloat]    DECIMAL(18,4) NOT NULL DEFAULT 0,
    [ClosingCash]     DECIMAL(18,4) NULL,
    [ExpectedCash]    DECIMAL(18,4) NULL,
    [CashVariance]    DECIMAL(18,4) NULL,
    [Status]          NVARCHAR(20)  NOT NULL DEFAULT 'OPEN',
    -- Status: OPEN | CLOSED
    [TotalSales]      DECIMAL(18,4) NOT NULL DEFAULT 0,
    [TotalCash]       DECIMAL(18,4) NOT NULL DEFAULT 0,
    [TotalCard]       DECIMAL(18,4) NOT NULL DEFAULT 0,
    [TotalReturns]    DECIMAL(18,4) NOT NULL DEFAULT 0,
    [InvoiceCount]    INT           NOT NULL DEFAULT 0
);
CREATE INDEX IX_Session_BranchId ON [dbo].[POS_Session]([BranchId]);
CREATE INDEX IX_Session_OpenedOn ON [dbo].[POS_Session]([OpenedOn]);

-- Invoice Header (Sales Invoice)
CREATE TABLE [dbo].[POS_Invoice] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [InvoiceNo]       NVARCHAR(30)  NOT NULL UNIQUE,
    [SessionId]       INT           NOT NULL REFERENCES [POS_Session]([Id]),
    [BranchId]        INT           NOT NULL REFERENCES [SYS_Branch]([Id]),
    [WarehouseId]     INT           NOT NULL REFERENCES [SYS_Warehouse]([Id]),
    [CustomerId]      INT           NULL REFERENCES [POS_Customer]([Id]),
    [InvoiceDate]     DATETIME      NOT NULL DEFAULT GETDATE(),
    [Status]          NVARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
    -- Status: ACTIVE | VOIDED | RETURNED
    [SubTotal]        DECIMAL(18,4) NOT NULL DEFAULT 0,
    [TotalDiscount]   DECIMAL(18,4) NOT NULL DEFAULT 0,
    [TotalTax]        DECIMAL(18,4) NOT NULL DEFAULT 0,
    [GrandTotal]      DECIMAL(18,4) NOT NULL DEFAULT 0,
    [AmountPaid]      DECIMAL(18,4) NOT NULL DEFAULT 0,
    [ChangeGiven]     DECIMAL(18,4) NOT NULL DEFAULT 0,
    [LoyaltyPointsEarned]  DECIMAL(18,2) NOT NULL DEFAULT 0,
    [LoyaltyPointsRedeemed] DECIMAL(18,2) NOT NULL DEFAULT 0,
    [LoyaltyDiscount]  DECIMAL(18,4) NOT NULL DEFAULT 0,
    [VoidedBy]        NVARCHAR(100) NULL,
    [VoidedOn]        DATETIME      NULL,
    [VoidReason]      NVARCHAR(500) NULL,
    [Notes]           NVARCHAR(MAX) NULL,
    [AddedBy]         NVARCHAR(100) NULL,
    [AddedOn]         DATETIME      NULL DEFAULT GETDATE()
);
CREATE INDEX IX_Invoice_SessionId ON [dbo].[POS_Invoice]([SessionId]);
CREATE INDEX IX_Invoice_CustomerId ON [dbo].[POS_Invoice]([CustomerId]);
CREATE INDEX IX_Invoice_InvoiceDate ON [dbo].[POS_Invoice]([InvoiceDate]);
CREATE INDEX IX_Invoice_BranchId ON [dbo].[POS_Invoice]([BranchId]);

-- Invoice Detail Lines
CREATE TABLE [dbo].[POS_InvoiceDetail] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [InvoiceId]       INT           NOT NULL REFERENCES [POS_Invoice]([Id]),
    [ProductId]       INT           NOT NULL REFERENCES [REF_Product]([Id]),
    [BatchId]         INT           NULL REFERENCES [INV_Batch]([Id]),
    [BarcodeUsed]     NVARCHAR(100) NULL,  -- Barcode that was scanned
    [Quantity]        DECIMAL(18,4) NOT NULL,
    [UomId]           INT           NOT NULL REFERENCES [REF_UnitOfMeasure]([Id]),
    [UnitPrice]       DECIMAL(18,4) NOT NULL,
    [CostPrice]       DECIMAL(18,4) NOT NULL DEFAULT 0,  -- For margin tracking
    [DiscountPct]     DECIMAL(8,4)  NOT NULL DEFAULT 0,
    [DiscountAmount]  DECIMAL(18,4) NOT NULL DEFAULT 0,
    [TaxRate]         DECIMAL(8,4)  NOT NULL DEFAULT 0,
    [TaxAmount]       DECIMAL(18,4) NOT NULL DEFAULT 0,
    [LineTotal]       DECIMAL(18,4) NOT NULL,
    [IsPriceOverridden] BIT         NOT NULL DEFAULT 0,
    [PricingRuleId]   INT           NULL REFERENCES [REF_PricingRule]([Id])
);
CREATE INDEX IX_InvoiceDetail_InvoiceId ON [dbo].[POS_InvoiceDetail]([InvoiceId]);
CREATE INDEX IX_InvoiceDetail_ProductId ON [dbo].[POS_InvoiceDetail]([ProductId]);

-- Payment Records
CREATE TABLE [dbo].[POS_Payment] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [InvoiceId]       INT           NOT NULL REFERENCES [POS_Invoice]([Id]),
    [PaymentMethod]   NVARCHAR(30)  NOT NULL,
    -- PaymentMethod: CASH | CARD_VISA | CARD_MASTER | CARD_AMEX | LOYALTY | CREDIT
    [Amount]          DECIMAL(18,4) NOT NULL,
    [CardLast4]       NVARCHAR(10)  NULL,  -- Last 4 digits of card (Phase 1: manual)
    [CardType]        NVARCHAR(30)  NULL,
    [ApprovalCode]    NVARCHAR(50)  NULL,
    [PaidOn]          DATETIME      NOT NULL DEFAULT GETDATE()
);
CREATE INDEX IX_Payment_InvoiceId ON [dbo].[POS_Payment]([InvoiceId]);

-- Return Header
CREATE TABLE [dbo].[POS_Return] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [ReturnNo]        NVARCHAR(30)  NOT NULL UNIQUE,
    [OriginalInvoiceId] INT         NOT NULL REFERENCES [POS_Invoice]([Id]),
    [SessionId]       INT           NOT NULL REFERENCES [POS_Session]([Id]),
    [ReturnDate]      DATETIME      NOT NULL DEFAULT GETDATE(),
    [ReasonCodeId]    INT           NULL REFERENCES [INV_ReasonCode]([Id]),
    [RefundMethod]    NVARCHAR(30)  NOT NULL DEFAULT 'CASH',
    [TotalRefund]     DECIMAL(18,4) NOT NULL,
    [Notes]           NVARCHAR(MAX) NULL,
    [AddedBy]         NVARCHAR(100) NULL,
    [AddedOn]         DATETIME      NULL DEFAULT GETDATE()
);

-- Return Detail Lines
CREATE TABLE [dbo].[POS_ReturnDetail] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [ReturnId]        INT           NOT NULL REFERENCES [POS_Return]([Id]),
    [InvoiceDetailId] INT           NOT NULL REFERENCES [POS_InvoiceDetail]([Id]),
    [ProductId]       INT           NOT NULL REFERENCES [REF_Product]([Id]),
    [BatchId]         INT           NULL REFERENCES [INV_Batch]([Id]),
    [ReturnQty]       DECIMAL(18,4) NOT NULL,
    [UnitPrice]       DECIMAL(18,4) NOT NULL,
    [RefundAmount]    DECIMAL(18,4) NOT NULL,
    [ReturnToStock]   BIT           NOT NULL DEFAULT 1
    -- ReturnToStock: 1 = stock is restocked, 0 = damaged/disposed
);

-- Loyalty Transactions Log
CREATE TABLE [dbo].[POS_LoyaltyTransaction] (
    [Id]              INT           IDENTITY(1,1) PRIMARY KEY,
    [CustomerId]      INT           NOT NULL REFERENCES [POS_Customer]([Id]),
    [InvoiceId]       INT           NULL REFERENCES [POS_Invoice]([Id]),
    [TransactionType] NVARCHAR(20)  NOT NULL,
    -- TransactionType: EARN | REDEEM | EXPIRE | ADJUST
    [Points]          DECIMAL(18,2) NOT NULL,
    [BalanceAfter]    DECIMAL(18,2) NOT NULL,
    [TransactionDate] DATETIME      NOT NULL DEFAULT GETDATE(),
    [Notes]           NVARCHAR(500) NULL
);
CREATE INDEX IX_LoyaltyTxn_CustomerId ON [dbo].[POS_LoyaltyTransaction]([CustomerId]);
```

### 9.3 Indexing Strategy Summary

| Index Type | Tables | Columns | Rationale |
|-----------|--------|---------|-----------|
| Unique | REF_ProductBarcode | Barcode | Barcode lookup must be unique and instantaneous |
| Composite | INV_StockBalance | (ProductId, WarehouseId) | Most common stock query joins both |
| Composite | INV_StockLedger | (ProductId, WarehouseId) | Stock history queries |
| Covering | POS_Invoice | InvoiceDate, BranchId | Daily and branch-wise sales reports |
| Search | POS_Customer | Phone, LoyaltyCardNo | Quick customer lookup at POS |
| Clustered PK | All tables | Id IDENTITY | Default clustered on PK |
| Date Range | INV_GRN | GRNDate | GRN reports by date range |
| Expiry | INV_Batch | ExpiryDate | Expiry alert queries |

---

## 10. Stored Procedure Specifications

All SPs reside in `TagInv_Product` database unless noted as `[Tag_Res_Admin]`.

### 10.1 Admin Database SPs (`Tag_Res_Admin`)

> **These SPs already exist in `Tag_Res_Admin`. Do not re-create or alter them. TagInv calls them as-is.**

#### Authentication

```
Tag_AD_Login_SelectAccountDetails
  @EncryptedUserName  VARCHAR(MAX)
  @EncryptedPassword  VARCHAR(MAX)
  @Type               VARCHAR(2)   -- 'U' = staff user, 'C' = customer

  Validates encrypted credentials against Tag_AD_UserAccountDetails (type U)
  or Tag_AD_CustomerAccountDetails (type C).
  Returns: UserID, isvalid (1/0), Username
```

#### Session Management

```
TAG_AD_POPULATE_ModuleLog
  @UserID      INT
  @ModuleCode  VARCHAR(5)

  Deletes any existing session for this user+module, then creates a new one.
  Returns: Token (UNIQUEIDENTIFIER), UrlToken (UNIQUEIDENTIFIER)
  — Token: passed in X-Token header for API calls; refreshed on each call.
  — UrlToken: used for URL-embedded auth (read-only, does not refresh).

TAG_AD_UPDATE_ModuleLog
  @Token       UNIQUEIDENTIFIER
  @ModuleCode  VARCHAR(5)

  Called by TokenValidity middleware on every API request.
  Validates: session exists AND DATEDIFF(MINUTE, LastUpdate, now) <= IdleTimeInMin.
  On success: updates LastUpdate to now, returns UserId.
  On failure: RAISERROR ('User Session is not found' or 'User Session is expired').

TAG_AD_SELECT_ModuleLogDetails
  @UrlToken    UNIQUEIDENTIFIER
  @ModuleCode  VARCHAR(5)

  Same expiry check as TAG_AD_UPDATE_ModuleLog but does NOT update LastUpdate.
  Returns: UserId, Token
  — Used for URL-based access (file downloads, print previews).
```

#### Settings

```
TAG_AD_SELECT_Settings
  @Code  VARCHAR(10)

  Returns single row from Tag_AD_Settings WHERE Code = @Code.
  Columns: SettingID, Code, Description, IsEnable (bit), Value (varchar 50).
  Note: @Code parameter is VARCHAR(10) — keys must be ≤ 10 characters when
  querying via this SP. TagInv module flags use SYS_Setting in TagInv_Product
  (via TAG_INV_SELECT_Setting) to avoid this length constraint.
```

#### User & Role Queries

```
TAG_AD_SELECT_Users
  @UserID    INT = -999      -- -999 returns all
  @RoleCode  VARCHAR(2) = '' -- filter by role code

  Returns user profile + role joined from Tag_AD_User, Tag_AD_UserAccountDetails,
  Tag_AD_UserWiseRole, Tag_AD_Ref_Roles.
  Columns: UserID, FirstName, LastName, MobileNo, AddressLine1-4, email,
           Username, fullname, roleCode.

TAG_AD_SELECT_UserWiseModules
  @UserID  INT
  @Env     VARCHAR(5)  -- 'dev' or 'prod'

  Returns modules accessible to the user via role → Tag_AD_ModuleWiseRoles.
  Returns: ID, Code, Name, BindingUrl (or DevBindingUrl when Env='dev'),
           IdleTimeInMin, Icon.

TAG_AD_SELECT_UserWisePages
  @UserID      INT
  @Type        VARCHAR(2)  -- 'PH' = page headers, 'PG' = pages under a header
  @HeaderID    INT = NULL  -- required when Type='PG'
  @ModuleCode  VARCHAR(5) = NULL

  Returns navigation structure filtered by user's role.
```

#### Document Number Sequences

```
TAG_AD_SELECT_NextNumber
  @Prefix  VARCHAR(10)

  Returns the next formatted number WITHOUT incrementing the counter.
  Use for display/preview only.

TAG_AD_UPADTE_NextNumber          ← NOTE: "UPADTE" typo is intentional (existing SP name)
  @Prefix    VARCHAR(10)
  @UpdateBy  INT

  Increments NextNumber by @UpdateBy.
  When IsCombinedDate = 1: resets counter to @UpdateBy if date has changed (daily rollover).
  Call AFTER the record is successfully inserted.

GetNextNumber(@Prefix VARCHAR(10)) RETURNS VARCHAR(500)   ← scalar function
  Formats: Prefix + zero-padded NextNumber, with yyMMdd injected when IsCombinedDate = 1.
  Example: prefix='INV', length=10 → 'INV0000001' or 'INV2604030001' with date.
  TagInv uses this function inside its own SPs: SELECT dbo.GetNextNumber('INV').
```

#### Audit / Error Logging

```
TAG_AD_INSERT_DataLog
  @Table      VARCHAR(MAX)
  @SP         VARCHAR(MAX)
  @TableID    VARCHAR(MAX)
  @Action     VARCHAR(MAX)   -- I/U/D
  @Json       VARCHAR(MAX)
  @OldJson    VARCHAR(MAX) = NULL
  @IsSuccess  BIT
  @Error      VARCHAR(MAX) = NULL

  Inserts one row into Tag_AD_DataLog with Sri Lanka timestamp.
  Called from CATCH blocks in TagInv_Product SPs using 3-part name:
  EXEC [Tag_Res_Admin].[dbo].[TAG_AD_INSERT_DataLog] ...
```

### 10.2 Product Database SPs — System

> **SP conventions for `TagInv_Product`:**
> - All timestamps: `DATEADD(MINUTE, 30, DATEADD(HH, 5, GETUTCDATE()))` — Sri Lanka UTC+5:30.
> - All CATCH blocks call: `EXEC [Tag_Res_Admin].[dbo].[TAG_AD_INSERT_DataLog] @Table, @SP, @TableID, @Action, @Json, @OldJson, @IsSuccess=0, @Error=@ErrorMessage`
> - Document numbers: call `SELECT dbo.GetNextNumber('PREFIX')` then `EXEC [Tag_Res_Admin].[dbo].[TAG_AD_UPADTE_NextNumber] 'PREFIX', 1` after successful insert.

```sql
-- ============================================================
-- SYSTEM SPs
-- ============================================================

-- TAG_INV_POPULATE_Branch
-- Handles: I (Insert), U (Update), D (Delete)
CREATE OR ALTER PROCEDURE [dbo].[TAG_INV_POPULATE_Branch]
    @JsonData    NVARCHAR(MAX),
    @OldJsonData NVARCHAR(MAX) = NULL,
    @Action      NVARCHAR(1)
AS
BEGIN
    SET NOCOUNT ON;
    
    IF @Action = 'I'
    BEGIN
        INSERT INTO [dbo].[SYS_Branch]
            (Code, BranchName, Address, City, Province, Phone, Email,
             VatRegNo, IsHeadOffice, IsActive, SortOrder, AddedBy, AddedOn)
        SELECT
            JSON_VALUE(@JsonData, '$.code'),
            JSON_VALUE(@JsonData, '$.branchName'),
            JSON_VALUE(@JsonData, '$.address'),
            JSON_VALUE(@JsonData, '$.city'),
            JSON_VALUE(@JsonData, '$.province'),
            JSON_VALUE(@JsonData, '$.phone'),
            JSON_VALUE(@JsonData, '$.email'),
            JSON_VALUE(@JsonData, '$.vatRegNo'),
            CAST(ISNULL(JSON_VALUE(@JsonData, '$.isHeadOffice'), '0') AS BIT),
            CAST(ISNULL(JSON_VALUE(@JsonData, '$.isActive'), '1') AS BIT),
            CAST(ISNULL(JSON_VALUE(@JsonData, '$.sortOrder'), '0') AS INT),
            JSON_VALUE(@JsonData, '$.addedBy'),
            GETDATE();
        
        SELECT SCOPE_IDENTITY() AS id;
    END
    
    ELSE IF @Action = 'U'
    BEGIN
        UPDATE [dbo].[SYS_Branch] SET
            BranchName   = JSON_VALUE(@JsonData, '$.branchName'),
            Address      = JSON_VALUE(@JsonData, '$.address'),
            City         = JSON_VALUE(@JsonData, '$.city'),
            Province     = JSON_VALUE(@JsonData, '$.province'),
            Phone        = JSON_VALUE(@JsonData, '$.phone'),
            Email        = JSON_VALUE(@JsonData, '$.email'),
            VatRegNo     = JSON_VALUE(@JsonData, '$.vatRegNo'),
            IsHeadOffice = CAST(ISNULL(JSON_VALUE(@JsonData, '$.isHeadOffice'), '0') AS BIT),
            IsActive     = CAST(ISNULL(JSON_VALUE(@JsonData, '$.isActive'), '1') AS BIT),
            SortOrder    = CAST(ISNULL(JSON_VALUE(@JsonData, '$.sortOrder'), '0') AS INT),
            ModifiedBy   = JSON_VALUE(@JsonData, '$.modifiedBy'),
            ModifiedOn   = GETDATE()
        WHERE Code = JSON_VALUE(@OldJsonData, '$.code');
    END
    
    ELSE IF @Action = 'D'
    BEGIN
        UPDATE [dbo].[SYS_Branch] SET IsActive = 0
        WHERE Id = CAST(JSON_VALUE(@JsonData, '$.id') AS INT);
    END
END

-- TAG_INV_SELECT_Branch
CREATE OR ALTER PROCEDURE [dbo].[TAG_INV_SELECT_Branch]
    @Code NVARCHAR(20) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SELECT b.Id AS id, b.Code AS code, b.BranchName AS branchName,
           b.Address AS address, b.City AS city, b.Province AS province,
           b.Phone AS phone, b.Email AS email, b.VatRegNo AS vatRegNo,
           b.IsHeadOffice AS isHeadOffice, b.IsActive AS isActive,
           b.SortOrder AS sortOrder,
           b.AddedBy AS addedBy, CONVERT(VARCHAR, b.AddedOn, 120) AS addedOn,
           b.ModifiedBy AS modifiedBy, CONVERT(VARCHAR, b.ModifiedOn, 120) AS modifiedOn
    FROM [dbo].[SYS_Branch] b
    WHERE (@Code IS NULL OR b.Code = @Code)
      AND b.IsActive = 1
    ORDER BY b.SortOrder, b.BranchName;
END

-- TAG_INV_POPULATE_Setting
CREATE OR ALTER PROCEDURE [dbo].[TAG_INV_POPULATE_Setting]
    @JsonData NVARCHAR(MAX),
    @Action   NVARCHAR(1)
AS
BEGIN
    SET NOCOUNT ON;
    IF @Action = 'U'
    BEGIN
        UPDATE [dbo].[SYS_Setting] SET
            SettingValue = JSON_VALUE(@JsonData, '$.settingValue'),
            ModifiedBy   = JSON_VALUE(@JsonData, '$.modifiedBy'),
            ModifiedOn   = GETDATE()
        WHERE SettingKey = JSON_VALUE(@JsonData, '$.settingKey');
    END
END

-- TAG_INV_SELECT_Setting
CREATE OR ALTER PROCEDURE [dbo].[TAG_INV_SELECT_Setting]
    @GroupName NVARCHAR(50) = NULL,
    @Key       NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Id AS id, SettingKey AS settingKey, SettingValue AS settingValue,
           DataType AS dataType, GroupName AS groupName, DisplayName AS displayName,
           Description AS description, IsEditable AS isEditable, SortOrder AS sortOrder
    FROM [dbo].[SYS_Setting]
    WHERE (@GroupName IS NULL OR GroupName = @GroupName)
      AND (@Key IS NULL OR SettingKey = @Key)
    ORDER BY GroupName, SortOrder;
END
```

### 10.3 Reference SPs

```sql
-- ============================================================
-- REFERENCE SPs
-- ============================================================

-- TAG_INV_POPULATE_Category
CREATE OR ALTER PROCEDURE [dbo].[TAG_INV_POPULATE_Category]
    @JsonData    NVARCHAR(MAX),
    @OldJsonData NVARCHAR(MAX) = NULL,
    @Action      NVARCHAR(1)
AS
BEGIN
    SET NOCOUNT ON;
    
    IF @Action = 'I'
    BEGIN
        DECLARE @ParentId INT = NULLIF(CAST(JSON_VALUE(@JsonData, '$.parentId') AS INT), 0);
        DECLARE @Level TINYINT = 1;
        DECLARE @FullPath NVARCHAR(500) = '';
        
        IF @ParentId IS NOT NULL
        BEGIN
            SELECT @Level = Level + 1, @FullPath = FullPath
            FROM [dbo].[REF_Category] WHERE Id = @ParentId;
        END
        
        IF @Level > 5
        BEGIN
            RAISERROR('Category hierarchy cannot exceed 5 levels.', 16, 1);
            RETURN;
        END
        
        INSERT INTO [dbo].[REF_Category]
            (Code, CategoryName, ParentId, Level, FullPath, Description, SortOrder,
             IsActive, AddedBy, AddedOn)
        VALUES (
            JSON_VALUE(@JsonData, '$.code'),
            JSON_VALUE(@JsonData, '$.categoryName'),
            @ParentId,
            @Level,
            '',  -- Will be updated after insert
            JSON_VALUE(@JsonData, '$.description'),
            CAST(ISNULL(JSON_VALUE(@JsonData, '$.sortOrder'), '0') AS INT),
            CAST(ISNULL(JSON_VALUE(@JsonData, '$.isActive'), '1') AS BIT),
            JSON_VALUE(@JsonData, '$.addedBy'),
            GETDATE()
        );
        
        DECLARE @NewId INT = SCOPE_IDENTITY();
        
        -- Update FullPath with the new Id appended
        UPDATE [dbo].[REF_Category]
        SET FullPath = CASE WHEN @FullPath = '' THEN CAST(@NewId AS NVARCHAR)
                            ELSE @FullPath + '/' + CAST(@NewId AS NVARCHAR) END
        WHERE Id = @NewId;
        
        SELECT @NewId AS id;
    END
    
    ELSE IF @Action = 'U'
    BEGIN
        UPDATE [dbo].[REF_Category] SET
            CategoryName = JSON_VALUE(@JsonData, '$.categoryName'),
            Description  = JSON_VALUE(@JsonData, '$.description'),
            SortOrder    = CAST(ISNULL(JSON_VALUE(@JsonData, '$.sortOrder'), '0') AS INT),
            IsActive     = CAST(ISNULL(JSON_VALUE(@JsonData, '$.isActive'), '1') AS BIT),
            ModifiedBy   = JSON_VALUE(@JsonData, '$.modifiedBy'),
            ModifiedOn   = GETDATE()
        WHERE Id = CAST(JSON_VALUE(@JsonData, '$.id') AS INT);
    END
    
    ELSE IF @Action = 'D'
    BEGIN
        -- Soft delete: check for child categories or products
        IF EXISTS (SELECT 1 FROM [dbo].[REF_Category] 
                   WHERE ParentId = CAST(JSON_VALUE(@JsonData, '$.id') AS INT) AND IsActive = 1)
        BEGIN
            RAISERROR('Cannot delete category with active sub-categories.', 16, 1);
            RETURN;
        END
        
        UPDATE [dbo].[REF_Category] SET IsActive = 0
        WHERE Id = CAST(JSON_VALUE(@JsonData, '$.id') AS INT);
    END
END

-- TAG_INV_SELECT_Category (returns full tree or filtered subtree)
CREATE OR ALTER PROCEDURE [dbo].[TAG_INV_SELECT_Category]
    @Code     NVARCHAR(30) = NULL,
    @ParentId INT          = NULL,
    @TreeMode BIT          = 0
    -- TreeMode = 1: returns full hierarchy flattened; 0: returns flat filtered list
AS
BEGIN
    SET NOCOUNT ON;
    
    IF @TreeMode = 1
    BEGIN
        -- Recursive CTE for full tree
        WITH CategoryTree AS (
            SELECT Id, Code, CategoryName, ParentId, Level, FullPath,
                   Description, SortOrder, IsActive,
                   CAST(CategoryName AS NVARCHAR(500)) AS BreadcrumbPath
            FROM [dbo].[REF_Category]
            WHERE ParentId IS NULL AND IsActive = 1
            
            UNION ALL
            
            SELECT c.Id, c.Code, c.CategoryName, c.ParentId, c.Level, c.FullPath,
                   c.Description, c.SortOrder, c.IsActive,
                   CAST(ct.BreadcrumbPath + ' > ' + c.CategoryName AS NVARCHAR(500))
            FROM [dbo].[REF_Category] c
            INNER JOIN CategoryTree ct ON c.ParentId = ct.Id
            WHERE c.IsActive = 1
        )
        SELECT Id AS id, Code AS code, CategoryName AS categoryName,
               ParentId AS parentId, Level AS level, FullPath AS fullPath,
               Description AS description, SortOrder AS sortOrder,
               IsActive AS isActive, BreadcrumbPath AS breadcrumbPath
        FROM CategoryTree
        ORDER BY FullPath, SortOrder;
    END
    ELSE
    BEGIN
        SELECT Id AS id, Code AS code, CategoryName AS categoryName,
               ParentId AS parentId, Level AS level, FullPath AS fullPath,
               Description AS description, SortOrder AS sortOrder, IsActive AS isActive
        FROM [dbo].[REF_Category]
        WHERE (@Code IS NULL OR Code = @Code)
          AND (@ParentId IS NULL OR ParentId = @ParentId)
          AND IsActive = 1
        ORDER BY SortOrder, CategoryName;
    END
END

-- TAG_INV_POPULATE_Product (core product CRUD)
CREATE OR ALTER PROCEDURE [dbo].[TAG_INV_POPULATE_Product]
    @JsonData    NVARCHAR(MAX),
    @OldJsonData NVARCHAR(MAX) = NULL,
    @Action      NVARCHAR(1)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    
    BEGIN TRY
        IF @Action = 'I'
        BEGIN
            INSERT INTO [dbo].[REF_Product] (
                Code, ProductName, GenericName, CategoryId, BrandId, SupplierId,
                PurchaseUomId, SaleUomId, TaxConfigId, IsWeighable, IsExpiryTracked,
                IsBatchTracked, IsService, IsControlledDrug, IsActive, Description,
                CostPrice, RetailPrice, WholesalePrice, MemberPrice, MinMarginPct,
                ReorderLevel, MinStockQty, MaxStockQty, DefaultBarcodeType, Notes,
                AddedBy, AddedOn
            )
            SELECT
                JSON_VALUE(@JsonData, '$.code'),
                JSON_VALUE(@JsonData, '$.productName'),
                JSON_VALUE(@JsonData, '$.genericName'),
                CAST(JSON_VALUE(@JsonData, '$.categoryId') AS INT),
                NULLIF(CAST(JSON_VALUE(@JsonData, '$.brandId') AS INT), 0),
                NULLIF(CAST(JSON_VALUE(@JsonData, '$.supplierId') AS INT), 0),
                CAST(JSON_VALUE(@JsonData, '$.purchaseUomId') AS INT),
                CAST(JSON_VALUE(@JsonData, '$.saleUomId') AS INT),
                NULLIF(CAST(JSON_VALUE(@JsonData, '$.taxConfigId') AS INT), 0),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.isWeighable'), '0') AS BIT),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.isExpiryTracked'), '0') AS BIT),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.isBatchTracked'), '0') AS BIT),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.isService'), '0') AS BIT),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.isControlledDrug'), '0') AS BIT),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.isActive'), '1') AS BIT),
                JSON_VALUE(@JsonData, '$.description'),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.costPrice'), '0') AS DECIMAL(18,4)),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.retailPrice'), '0') AS DECIMAL(18,4)),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.wholesalePrice'), '0') AS DECIMAL(18,4)),
                NULLIF(CAST(JSON_VALUE(@JsonData, '$.memberPrice') AS DECIMAL(18,4)), 0),
                NULLIF(CAST(JSON_VALUE(@JsonData, '$.minMarginPct') AS DECIMAL(8,4)), 0),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.reorderLevel'), '0') AS DECIMAL(18,4)),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.minStockQty'), '0') AS DECIMAL(18,4)),
                NULLIF(CAST(JSON_VALUE(@JsonData, '$.maxStockQty') AS DECIMAL(18,4)), 0),
                ISNULL(JSON_VALUE(@JsonData, '$.defaultBarcodeType'), 'EAN-13'),
                JSON_VALUE(@JsonData, '$.notes'),
                JSON_VALUE(@JsonData, '$.addedBy'),
                GETDATE();
            
            DECLARE @ProductId INT = SCOPE_IDENTITY();
            
            -- Insert barcodes from nested array if present
            IF JSON_VALUE(@JsonData, '$.barcodes') IS NOT NULL
            BEGIN
                INSERT INTO [dbo].[REF_ProductBarcode] (ProductId, Barcode, BarcodeType, IsPrimary, IsActive, AddedBy, AddedOn)
                SELECT
                    @ProductId,
                    JSON_VALUE(b.value, '$.barcode'),
                    ISNULL(JSON_VALUE(b.value, '$.barcodeType'), 'EAN-13'),
                    CAST(ISNULL(JSON_VALUE(b.value, '$.isPrimary'), '0') AS BIT),
                    1,
                    JSON_VALUE(@JsonData, '$.addedBy'),
                    GETDATE()
                FROM OPENJSON(@JsonData, '$.barcodes') b;
            END
            
            SELECT @ProductId AS id;
        END
        
        ELSE IF @Action = 'U'
        BEGIN
            UPDATE [dbo].[REF_Product] SET
                ProductName      = JSON_VALUE(@JsonData, '$.productName'),
                GenericName      = JSON_VALUE(@JsonData, '$.genericName'),
                CategoryId       = CAST(JSON_VALUE(@JsonData, '$.categoryId') AS INT),
                BrandId          = NULLIF(CAST(JSON_VALUE(@JsonData, '$.brandId') AS INT), 0),
                SupplierId       = NULLIF(CAST(JSON_VALUE(@JsonData, '$.supplierId') AS INT), 0),
                PurchaseUomId    = CAST(JSON_VALUE(@JsonData, '$.purchaseUomId') AS INT),
                SaleUomId        = CAST(JSON_VALUE(@JsonData, '$.saleUomId') AS INT),
                TaxConfigId      = NULLIF(CAST(JSON_VALUE(@JsonData, '$.taxConfigId') AS INT), 0),
                IsWeighable      = CAST(ISNULL(JSON_VALUE(@JsonData, '$.isWeighable'), '0') AS BIT),
                IsExpiryTracked  = CAST(ISNULL(JSON_VALUE(@JsonData, '$.isExpiryTracked'), '0') AS BIT),
                IsBatchTracked   = CAST(ISNULL(JSON_VALUE(@JsonData, '$.isBatchTracked'), '0') AS BIT),
                IsActive         = CAST(ISNULL(JSON_VALUE(@JsonData, '$.isActive'), '1') AS BIT),
                Description      = JSON_VALUE(@JsonData, '$.description'),
                CostPrice        = CAST(ISNULL(JSON_VALUE(@JsonData, '$.costPrice'), '0') AS DECIMAL(18,4)),
                RetailPrice      = CAST(ISNULL(JSON_VALUE(@JsonData, '$.retailPrice'), '0') AS DECIMAL(18,4)),
                WholesalePrice   = CAST(ISNULL(JSON_VALUE(@JsonData, '$.wholesalePrice'), '0') AS DECIMAL(18,4)),
                MemberPrice      = NULLIF(CAST(JSON_VALUE(@JsonData, '$.memberPrice') AS DECIMAL(18,4)), 0),
                ReorderLevel     = CAST(ISNULL(JSON_VALUE(@JsonData, '$.reorderLevel'), '0') AS DECIMAL(18,4)),
                MinStockQty      = CAST(ISNULL(JSON_VALUE(@JsonData, '$.minStockQty'), '0') AS DECIMAL(18,4)),
                Notes            = JSON_VALUE(@JsonData, '$.notes'),
                ModifiedBy       = JSON_VALUE(@JsonData, '$.modifiedBy'),
                ModifiedOn       = GETDATE()
            WHERE Id = CAST(JSON_VALUE(@JsonData, '$.id') AS INT);
        END
        
        ELSE IF @Action = 'D'
        BEGIN
            UPDATE [dbo].[REF_Product] SET IsActive = 0
            WHERE Id = CAST(JSON_VALUE(@JsonData, '$.id') AS INT);
        END
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END

-- TAG_INV_SELECT_Product (with barcode lookup support)
CREATE OR ALTER PROCEDURE [dbo].[TAG_INV_SELECT_Product]
    @Code       NVARCHAR(30)  = NULL,
    @Barcode    NVARCHAR(100) = NULL,
    @CategoryId INT           = NULL,
    @SearchTerm NVARCHAR(200) = NULL,
    @IsActive   BIT           = 1,
    @PageNo     INT           = 1,
    @PageSize   INT           = 50
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Fast barcode lookup (POS optimized path)
    IF @Barcode IS NOT NULL
    BEGIN
        SELECT p.Id AS id, p.Code AS code, p.ProductName AS productName,
               p.GenericName AS genericName, p.RetailPrice AS retailPrice,
               p.WholesalePrice AS wholesalePrice, p.MemberPrice AS memberPrice,
               p.CostPrice AS costPrice, p.IsWeighable AS isWeighable,
               p.IsExpiryTracked AS isExpiryTracked, p.IsBatchTracked AS isBatchTracked,
               p.TaxConfigId AS taxConfigId,
               tc.Rate AS taxRate, tc.IsInclusive AS taxIsInclusive,
               pb.Barcode AS barcode, pb.BarcodeType AS barcodeType,
               uom.UnitSymbol AS saleUomSymbol
        FROM [dbo].[REF_ProductBarcode] pb
        INNER JOIN [dbo].[REF_Product] p ON pb.ProductId = p.Id AND p.IsActive = 1
        LEFT JOIN [dbo].[SYS_TaxConfig] tc ON p.TaxConfigId = tc.Id AND tc.IsActive = 1
        LEFT JOIN [dbo].[REF_UnitOfMeasure] uom ON p.SaleUomId = uom.Id
        WHERE pb.Barcode = @Barcode AND pb.IsActive = 1;
        RETURN;
    END
    
    -- General lookup
    SELECT p.Id AS id, p.Code AS code, p.ProductName AS productName,
           p.GenericName AS genericName,
           c.CategoryName AS categoryName, c.Id AS categoryId,
           b.BrandName AS brandName, p.BrandId AS brandId,
           s.SupplierName AS supplierName, p.SupplierId AS supplierId,
           p.RetailPrice AS retailPrice, p.WholesalePrice AS wholesalePrice,
           p.MemberPrice AS memberPrice, p.CostPrice AS costPrice,
           p.IsWeighable AS isWeighable, p.IsExpiryTracked AS isExpiryTracked,
           p.IsBatchTracked AS isBatchTracked, p.IsService AS isService,
           p.IsActive AS isActive, p.ReorderLevel AS reorderLevel,
           p.MinStockQty AS minStockQty,
           p.ImageUrl AS imageUrl, p.ImageMimeType AS imageMimeType,
           p.AddedBy AS addedBy, CONVERT(VARCHAR, p.AddedOn, 120) AS addedOn,
           p.ModifiedBy AS modifiedBy, CONVERT(VARCHAR, p.ModifiedOn, 120) AS modifiedOn
    FROM [dbo].[REF_Product] p
    LEFT JOIN [dbo].[REF_Category] c ON p.CategoryId = c.Id
    LEFT JOIN [dbo].[REF_Brand] b ON p.BrandId = b.Id
    LEFT JOIN [dbo].[REF_Supplier] s ON p.SupplierId = s.Id
    WHERE (@Code IS NULL OR p.Code = @Code)
      AND (@CategoryId IS NULL OR p.CategoryId = @CategoryId
           OR p.CategoryId IN (
               SELECT Id FROM [dbo].[REF_Category]
               WHERE FullPath LIKE 
                   (SELECT FullPath FROM [dbo].[REF_Category] WHERE Id = @CategoryId) + '/%'
           )
          )
      AND (@IsActive IS NULL OR p.IsActive = @IsActive)
      AND (@SearchTerm IS NULL OR p.ProductName LIKE '%' + @SearchTerm + '%'
                               OR p.GenericName LIKE '%' + @SearchTerm + '%'
                               OR p.Code LIKE '%' + @SearchTerm + '%')
    ORDER BY p.ProductName
    OFFSET (@PageNo - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END
```

### 10.4 Inventory SPs

```sql
-- TAG_INV_POPULATE_GRN (with atomic stock update on approval)
CREATE OR ALTER PROCEDURE [dbo].[TAG_INV_POPULATE_GRN]
    @JsonData    NVARCHAR(MAX),
    @OldJsonData NVARCHAR(MAX) = NULL,
    @Action      NVARCHAR(1)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        
        IF @Action = 'I'
        BEGIN
            -- Insert GRN Header
            INSERT INTO [dbo].[INV_GRN] (
                GRNNo, BranchId, WarehouseId, SupplierId, SupplierInvoiceNo,
                SupplierInvoiceDate, GRNDate, Status, Notes, AddedBy, AddedOn)
            VALUES (
                JSON_VALUE(@JsonData, '$.grnNo'),
                CAST(JSON_VALUE(@JsonData, '$.branchId') AS INT),
                CAST(JSON_VALUE(@JsonData, '$.warehouseId') AS INT),
                CAST(JSON_VALUE(@JsonData, '$.supplierId') AS INT),
                JSON_VALUE(@JsonData, '$.supplierInvoiceNo'),
                NULLIF(JSON_VALUE(@JsonData, '$.supplierInvoiceDate'), ''),
                ISNULL(JSON_VALUE(@JsonData, '$.grnDate'), CAST(GETDATE() AS DATE)),
                'DRAFT',
                JSON_VALUE(@JsonData, '$.notes'),
                JSON_VALUE(@JsonData, '$.addedBy'),
                GETDATE()
            );
            
            DECLARE @GRNId INT = SCOPE_IDENTITY();
            
            -- Insert GRN Detail lines from JSON array
            INSERT INTO [dbo].[INV_GRNDetail] (
                GRNId, ProductId, UomId, Quantity, FreeQty, CostPrice,
                RetailPrice, BatchNo, ManufactureDate, ExpiryDate, LineTotal)
            SELECT
                @GRNId,
                CAST(JSON_VALUE(d.value, '$.productId') AS INT),
                CAST(JSON_VALUE(d.value, '$.uomId') AS INT),
                CAST(JSON_VALUE(d.value, '$.quantity') AS DECIMAL(18,4)),
                CAST(ISNULL(JSON_VALUE(d.value, '$.freeQty'), '0') AS DECIMAL(18,4)),
                CAST(JSON_VALUE(d.value, '$.costPrice') AS DECIMAL(18,4)),
                CAST(ISNULL(JSON_VALUE(d.value, '$.retailPrice'), '0') AS DECIMAL(18,4)),
                JSON_VALUE(d.value, '$.batchNo'),
                NULLIF(JSON_VALUE(d.value, '$.manufactureDate'), ''),
                NULLIF(JSON_VALUE(d.value, '$.expiryDate'), ''),
                CAST(JSON_VALUE(d.value, '$.quantity') AS DECIMAL(18,4)) *
                    CAST(JSON_VALUE(d.value, '$.costPrice') AS DECIMAL(18,4))
            FROM OPENJSON(@JsonData, '$.details') d;
            
            -- Update GRN TotalCost
            UPDATE [dbo].[INV_GRN]
            SET TotalCost = (SELECT SUM(LineTotal) FROM [dbo].[INV_GRNDetail] WHERE GRNId = @GRNId)
            WHERE Id = @GRNId;
            
            SELECT @GRNId AS id;
        END
        
        ELSE IF @Action = 'U' AND JSON_VALUE(@JsonData, '$.status') = 'APPROVED'
        BEGIN
            DECLARE @GRNIdApprove INT = CAST(JSON_VALUE(@JsonData, '$.id') AS INT);
            DECLARE @WarehouseId INT;
            
            SELECT @WarehouseId = WarehouseId FROM [dbo].[INV_GRN] WHERE Id = @GRNIdApprove AND Status = 'DRAFT';
            
            IF @WarehouseId IS NULL
            BEGIN
                RAISERROR('GRN not found or already approved.', 16, 1);
                RETURN;
            END
            
            -- Update GRN status
            UPDATE [dbo].[INV_GRN] SET
                Status     = 'APPROVED',
                ApprovedBy = JSON_VALUE(@JsonData, '$.approvedBy'),
                ApprovedOn = GETDATE()
            WHERE Id = @GRNIdApprove;
            
            -- Process each GRN line: create batches (if applicable), update stock balance, write ledger
            DECLARE @LineId INT, @ProductId INT, @Qty DECIMAL(18,4), @FreeQty DECIMAL(18,4),
                    @CostPrice DECIMAL(18,4), @BatchNo NVARCHAR(50), @ExpiryDate DATE,
                    @ManufactureDate DATE, @BatchId INT, @IsBatchTracked BIT,
                    @TotalQty DECIMAL(18,4), @NewBalance DECIMAL(18,4);
            
            DECLARE grn_cursor CURSOR FOR
                SELECT gd.Id, gd.ProductId, gd.Quantity, gd.FreeQty, gd.CostPrice,
                       gd.BatchNo, gd.ExpiryDate, gd.ManufactureDate, p.IsBatchTracked
                FROM [dbo].[INV_GRNDetail] gd
                INNER JOIN [dbo].[REF_Product] p ON gd.ProductId = p.Id
                WHERE gd.GRNId = @GRNIdApprove;
            
            OPEN grn_cursor;
            FETCH NEXT FROM grn_cursor INTO @LineId, @ProductId, @Qty, @FreeQty,
                    @CostPrice, @BatchNo, @ExpiryDate, @ManufactureDate, @IsBatchTracked;
            
            WHILE @@FETCH_STATUS = 0
            BEGIN
                SET @TotalQty = @Qty + @FreeQty;
                SET @BatchId = NULL;
                
                -- Create/update batch if batch-tracked
                IF @IsBatchTracked = 1 AND @BatchNo IS NOT NULL
                BEGIN
                    IF EXISTS (SELECT 1 FROM [dbo].[INV_Batch] 
                               WHERE BatchNo = @BatchNo AND ProductId = @ProductId 
                                 AND WarehouseId = @WarehouseId)
                    BEGIN
                        UPDATE [dbo].[INV_Batch]
                        SET CurrentQty = CurrentQty + @TotalQty,
                            InitialQty = InitialQty + @TotalQty
                        WHERE BatchNo = @BatchNo AND ProductId = @ProductId 
                          AND WarehouseId = @WarehouseId;
                        
                        SELECT @BatchId = Id FROM [dbo].[INV_Batch]
                        WHERE BatchNo = @BatchNo AND ProductId = @ProductId 
                          AND WarehouseId = @WarehouseId;
                    END
                    ELSE
                    BEGIN
                        INSERT INTO [dbo].[INV_Batch] (BatchNo, ProductId, WarehouseId, GRNId,
                            ManufactureDate, ExpiryDate, InitialQty, CurrentQty, CostPrice)
                        VALUES (@BatchNo, @ProductId, @WarehouseId, @GRNIdApprove,
                            @ManufactureDate, @ExpiryDate, @TotalQty, @TotalQty, @CostPrice);
                        SET @BatchId = SCOPE_IDENTITY();
                    END
                END
                
                -- Update or insert stock balance
                IF EXISTS (SELECT 1 FROM [dbo].[INV_StockBalance] 
                           WHERE ProductId = @ProductId AND WarehouseId = @WarehouseId)
                BEGIN
                    UPDATE [dbo].[INV_StockBalance]
                    SET CurrentQty = CurrentQty + @TotalQty, LastUpdated = GETDATE()
                    WHERE ProductId = @ProductId AND WarehouseId = @WarehouseId;
                    
                    SELECT @NewBalance = CurrentQty FROM [dbo].[INV_StockBalance]
                    WHERE ProductId = @ProductId AND WarehouseId = @WarehouseId;
                END
                ELSE
                BEGIN
                    INSERT INTO [dbo].[INV_StockBalance] (ProductId, WarehouseId, CurrentQty, LastUpdated)
                    VALUES (@ProductId, @WarehouseId, @TotalQty, GETDATE());
                    SET @NewBalance = @TotalQty;
                END
                
                -- Write stock ledger entry
                INSERT INTO [dbo].[INV_StockLedger] (ProductId, WarehouseId, BatchId,
                    TransactionType, ReferenceNo, ReferenceId, InQty, OutQty,
                    BalanceQty, CostPrice, TransactionDate, AddedBy)
                SELECT @ProductId, @WarehouseId, @BatchId, 'GRN',
                    JSON_VALUE(@JsonData, '$.grnNo'), @GRNIdApprove,
                    @TotalQty, 0, @NewBalance, @CostPrice, GETDATE(),
                    JSON_VALUE(@JsonData, '$.approvedBy');
                
                FETCH NEXT FROM grn_cursor INTO @LineId, @ProductId, @Qty, @FreeQty,
                    @CostPrice, @BatchNo, @ExpiryDate, @ManufactureDate, @IsBatchTracked;
            END
            
            CLOSE grn_cursor;
            DEALLOCATE grn_cursor;
        END
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
```

### 10.5 POS / Cashier SPs

```sql
-- TAG_INV_POPULATE_Invoice (core POS billing SP — atomic)
CREATE OR ALTER PROCEDURE [dbo].[TAG_INV_POPULATE_Invoice]
    @JsonData NVARCHAR(MAX),
    @Action   NVARCHAR(1)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        
        IF @Action = 'I'
        BEGIN
            DECLARE @WarehouseId INT = CAST(JSON_VALUE(@JsonData, '$.warehouseId') AS INT);
            
            -- Validate stock availability for all items before any inserts
            IF EXISTS (
                SELECT 1
                FROM OPENJSON(@JsonData, '$.details') d
                LEFT JOIN [dbo].[INV_StockBalance] sb
                    ON sb.ProductId = CAST(JSON_VALUE(d.value, '$.productId') AS INT)
                    AND sb.WarehouseId = @WarehouseId
                INNER JOIN [dbo].[REF_Product] p 
                    ON p.Id = CAST(JSON_VALUE(d.value, '$.productId') AS INT)
                WHERE p.IsService = 0
                  AND ISNULL(sb.AvailableQty, 0) < CAST(JSON_VALUE(d.value, '$.quantity') AS DECIMAL(18,4))
            )
            BEGIN
                RAISERROR('Insufficient stock for one or more items.', 16, 1);
                RETURN;
            END
            
            -- Insert Invoice Header
            INSERT INTO [dbo].[POS_Invoice] (
                InvoiceNo, SessionId, BranchId, WarehouseId, CustomerId,
                InvoiceDate, Status, SubTotal, TotalDiscount, TotalTax, GrandTotal,
                AmountPaid, ChangeGiven, LoyaltyPointsEarned, LoyaltyPointsRedeemed,
                LoyaltyDiscount, Notes, AddedBy, AddedOn)
            VALUES (
                JSON_VALUE(@JsonData, '$.invoiceNo'),
                CAST(JSON_VALUE(@JsonData, '$.sessionId') AS INT),
                CAST(JSON_VALUE(@JsonData, '$.branchId') AS INT),
                @WarehouseId,
                NULLIF(CAST(JSON_VALUE(@JsonData, '$.customerId') AS INT), 0),
                GETDATE(),
                'ACTIVE',
                CAST(JSON_VALUE(@JsonData, '$.subTotal') AS DECIMAL(18,4)),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.totalDiscount'), '0') AS DECIMAL(18,4)),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.totalTax'), '0') AS DECIMAL(18,4)),
                CAST(JSON_VALUE(@JsonData, '$.grandTotal') AS DECIMAL(18,4)),
                CAST(JSON_VALUE(@JsonData, '$.amountPaid') AS DECIMAL(18,4)),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.changeGiven'), '0') AS DECIMAL(18,4)),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.loyaltyPointsEarned'), '0') AS DECIMAL(18,2)),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.loyaltyPointsRedeemed'), '0') AS DECIMAL(18,2)),
                CAST(ISNULL(JSON_VALUE(@JsonData, '$.loyaltyDiscount'), '0') AS DECIMAL(18,4)),
                JSON_VALUE(@JsonData, '$.notes'),
                JSON_VALUE(@JsonData, '$.addedBy'),
                GETDATE()
            );
            
            DECLARE @InvoiceId INT = SCOPE_IDENTITY();
            
            -- Insert Invoice Detail lines
            INSERT INTO [dbo].[POS_InvoiceDetail] (
                InvoiceId, ProductId, BatchId, BarcodeUsed, Quantity, UomId,
                UnitPrice, CostPrice, DiscountPct, DiscountAmount, TaxRate, TaxAmount, LineTotal,
                IsPriceOverridden, PricingRuleId)
            SELECT
                @InvoiceId,
                CAST(JSON_VALUE(d.value, '$.productId') AS INT),
                NULLIF(CAST(JSON_VALUE(d.value, '$.batchId') AS INT), 0),
                JSON_VALUE(d.value, '$.barcodeUsed'),
                CAST(JSON_VALUE(d.value, '$.quantity') AS DECIMAL(18,4)),
                CAST(JSON_VALUE(d.value, '$.uomId') AS INT),
                CAST(JSON_VALUE(d.value, '$.unitPrice') AS DECIMAL(18,4)),
                CAST(ISNULL(JSON_VALUE(d.value, '$.costPrice'), '0') AS DECIMAL(18,4)),
                CAST(ISNULL(JSON_VALUE(d.value, '$.discountPct'), '0') AS DECIMAL(8,4)),
                CAST(ISNULL(JSON_VALUE(d.value, '$.discountAmount'), '0') AS DECIMAL(18,4)),
                CAST(ISNULL(JSON_VALUE(d.value, '$.taxRate'), '0') AS DECIMAL(8,4)),
                CAST(ISNULL(JSON_VALUE(d.value, '$.taxAmount'), '0') AS DECIMAL(18,4)),
                CAST(JSON_VALUE(d.value, '$.lineTotal') AS DECIMAL(18,4)),
                CAST(ISNULL(JSON_VALUE(d.value, '$.isPriceOverridden'), '0') AS BIT),
                NULLIF(CAST(JSON_VALUE(d.value, '$.pricingRuleId') AS INT), 0)
            FROM OPENJSON(@JsonData, '$.details') d;
            
            -- Process payments
            INSERT INTO [dbo].[POS_Payment] (InvoiceId, PaymentMethod, Amount, CardLast4, CardType, ApprovalCode, PaidOn)
            SELECT
                @InvoiceId,
                JSON_VALUE(p.value, '$.paymentMethod'),
                CAST(JSON_VALUE(p.value, '$.amount') AS DECIMAL(18,4)),
                JSON_VALUE(p.value, '$.cardLast4'),
                JSON_VALUE(p.value, '$.cardType'),
                JSON_VALUE(p.value, '$.approvalCode'),
                GETDATE()
            FROM OPENJSON(@JsonData, '$.payments') p;
            
            -- Decrement stock for each non-service item (FEFO for batch-tracked)
            DECLARE @ItemProductId INT, @ItemQty DECIMAL(18,4), @ItemBatchId INT,
                    @IsBatch BIT, @IsService BIT, @RunningQty DECIMAL(18,4),
                    @BatchBalance DECIMAL(18,4), @DeductQty DECIMAL(18,4),
                    @LedgerBalance DECIMAL(18,4);
            
            DECLARE sale_cursor CURSOR FOR
                SELECT pid.ProductId, pid.Quantity, pid.BatchId,
                       p.IsBatchTracked, p.IsService
                FROM [dbo].[POS_InvoiceDetail] pid
                INNER JOIN [dbo].[REF_Product] p ON pid.ProductId = p.Id
                WHERE pid.InvoiceId = @InvoiceId;
            
            OPEN sale_cursor;
            FETCH NEXT FROM sale_cursor INTO @ItemProductId, @ItemQty, @ItemBatchId,
                    @IsBatch, @IsService;
            
            WHILE @@FETCH_STATUS = 0
            BEGIN
                IF @IsService = 0
                BEGIN
                    SET @RunningQty = @ItemQty;
                    
                    IF @IsBatch = 1
                    BEGIN
                        -- FEFO: consume earliest expiring batch first
                        DECLARE batch_cursor CURSOR FOR
                            SELECT Id, CurrentQty FROM [dbo].[INV_Batch]
                            WHERE ProductId = @ItemProductId
                              AND WarehouseId = @WarehouseId
                              AND CurrentQty > 0
                              AND IsActive = 1
                            ORDER BY ISNULL(ExpiryDate, '9999-12-31') ASC, Id ASC;
                        
                        OPEN batch_cursor;
                        FETCH NEXT FROM batch_cursor INTO @ItemBatchId, @BatchBalance;
                        
                        WHILE @@FETCH_STATUS = 0 AND @RunningQty > 0
                        BEGIN
                            SET @DeductQty = CASE WHEN @BatchBalance >= @RunningQty 
                                                  THEN @RunningQty ELSE @BatchBalance END;
                            
                            UPDATE [dbo].[INV_Batch]
                            SET CurrentQty = CurrentQty - @DeductQty
                            WHERE Id = @ItemBatchId;
                            
                            SET @RunningQty = @RunningQty - @DeductQty;
                            FETCH NEXT FROM batch_cursor INTO @ItemBatchId, @BatchBalance;
                        END
                        CLOSE batch_cursor; DEALLOCATE batch_cursor;
                    END
                    
                    -- Update stock balance
                    UPDATE [dbo].[INV_StockBalance]
                    SET CurrentQty = CurrentQty - @ItemQty, LastUpdated = GETDATE()
                    WHERE ProductId = @ItemProductId AND WarehouseId = @WarehouseId;
                    
                    SELECT @LedgerBalance = CurrentQty FROM [dbo].[INV_StockBalance]
                    WHERE ProductId = @ItemProductId AND WarehouseId = @WarehouseId;
                    
                    -- Write ledger
                    INSERT INTO [dbo].[INV_StockLedger] (ProductId, WarehouseId, BatchId,
                        TransactionType, ReferenceNo, ReferenceId, InQty, OutQty,
                        BalanceQty, CostPrice, TransactionDate, AddedBy)
                    SELECT @ItemProductId, @WarehouseId, @ItemBatchId, 'SALE',
                        JSON_VALUE(@JsonData, '$.invoiceNo'), @InvoiceId,
                        0, @ItemQty, ISNULL(@LedgerBalance, 0), CostPrice, GETDATE(),
                        JSON_VALUE(@JsonData, '$.addedBy')
                    FROM [dbo].[POS_InvoiceDetail]
                    WHERE InvoiceId = @InvoiceId AND ProductId = @ItemProductId;
                END
                
                FETCH NEXT FROM sale_cursor INTO @ItemProductId, @ItemQty, @ItemBatchId,
                    @IsBatch, @IsService;
            END
            CLOSE sale_cursor; DEALLOCATE sale_cursor;
            
            -- Update session totals
            UPDATE [dbo].[POS_Session] SET
                TotalSales   = TotalSales + CAST(JSON_VALUE(@JsonData, '$.grandTotal') AS DECIMAL(18,4)),
                TotalCash    = TotalCash + ISNULL((
                    SELECT SUM(Amount) FROM [dbo].[POS_Payment]
                    WHERE InvoiceId = @InvoiceId AND PaymentMethod = 'CASH'), 0),
                TotalCard    = TotalCard + ISNULL((
                    SELECT SUM(Amount) FROM [dbo].[POS_Payment]
                    WHERE InvoiceId = @InvoiceId AND PaymentMethod LIKE 'CARD%'), 0),
                InvoiceCount = InvoiceCount + 1
            WHERE Id = CAST(JSON_VALUE(@JsonData, '$.sessionId') AS INT);
            
            -- Handle loyalty points
            DECLARE @CustId INT = NULLIF(CAST(JSON_VALUE(@JsonData, '$.customerId') AS INT), 0);
            IF @CustId IS NOT NULL
            BEGIN
                DECLARE @EarnedPts DECIMAL(18,2) = CAST(ISNULL(JSON_VALUE(@JsonData, '$.loyaltyPointsEarned'), '0') AS DECIMAL(18,2));
                DECLARE @RedeemedPts DECIMAL(18,2) = CAST(ISNULL(JSON_VALUE(@JsonData, '$.loyaltyPointsRedeemed'), '0') AS DECIMAL(18,2));
                DECLARE @NewLoyaltyBalance DECIMAL(18,2);
                
                UPDATE [dbo].[POS_Customer]
                SET LoyaltyPoints = LoyaltyPoints + @EarnedPts - @RedeemedPts
                WHERE Id = @CustId;
                
                SELECT @NewLoyaltyBalance = LoyaltyPoints FROM [dbo].[POS_Customer] WHERE Id = @CustId;
                
                IF @EarnedPts > 0
                    INSERT INTO [dbo].[POS_LoyaltyTransaction] (CustomerId, InvoiceId, TransactionType, Points, BalanceAfter)
                    VALUES (@CustId, @InvoiceId, 'EARN', @EarnedPts, @NewLoyaltyBalance);
                
                IF @RedeemedPts > 0
                    INSERT INTO [dbo].[POS_LoyaltyTransaction] (CustomerId, InvoiceId, TransactionType, Points, BalanceAfter)
                    VALUES (@CustId, @InvoiceId, 'REDEEM', -@RedeemedPts, @NewLoyaltyBalance - @EarnedPts);
            END
            
            SELECT @InvoiceId AS id;
        END
        
        ELSE IF @Action = 'D' -- Void invoice
        BEGIN
            DECLARE @VoidInvoiceId INT = CAST(JSON_VALUE(@JsonData, '$.id') AS INT);
            DECLARE @VoidWarehouseId INT;
            
            SELECT @VoidWarehouseId = WarehouseId FROM [dbo].[POS_Invoice]
            WHERE Id = @VoidInvoiceId AND Status = 'ACTIVE';
            
            IF @VoidWarehouseId IS NULL
            BEGIN
                RAISERROR('Invoice not found or already voided.', 16, 1);
                RETURN;
            END
            
            UPDATE [dbo].[POS_Invoice] SET
                Status    = 'VOIDED',
                VoidedBy  = JSON_VALUE(@JsonData, '$.voidedBy'),
                VoidedOn  = GETDATE(),
                VoidReason = JSON_VALUE(@JsonData, '$.voidReason')
            WHERE Id = @VoidInvoiceId;
            
            -- Reverse stock decrements
            DECLARE @RProductId INT, @RQty DECIMAL(18,4), @RBatchId INT,
                    @RIsService BIT, @RNewBal DECIMAL(18,4);
            
            DECLARE rev_cursor CURSOR FOR
                SELECT pid.ProductId, pid.Quantity, pid.BatchId, p.IsService
                FROM [dbo].[POS_InvoiceDetail] pid
                INNER JOIN [dbo].[REF_Product] p ON pid.ProductId = p.Id
                WHERE pid.InvoiceId = @VoidInvoiceId;
            
            OPEN rev_cursor;
            FETCH NEXT FROM rev_cursor INTO @RProductId, @RQty, @RBatchId, @RIsService;
            
            WHILE @@FETCH_STATUS = 0
            BEGIN
                IF @RIsService = 0
                BEGIN
                    UPDATE [dbo].[INV_StockBalance]
                    SET CurrentQty = CurrentQty + @RQty, LastUpdated = GETDATE()
                    WHERE ProductId = @RProductId AND WarehouseId = @VoidWarehouseId;
                    
                    SELECT @RNewBal = CurrentQty FROM [dbo].[INV_StockBalance]
                    WHERE ProductId = @RProductId AND WarehouseId = @VoidWarehouseId;
                    
                    INSERT INTO [dbo].[INV_StockLedger] (ProductId, WarehouseId, BatchId,
                        TransactionType, ReferenceNo, ReferenceId, InQty, OutQty,
                        BalanceQty, CostPrice, TransactionDate, AddedBy)
                    SELECT @RProductId, @VoidWarehouseId, @RBatchId, 'RETURN',
                        JSON_VALUE(@JsonData, '$.invoiceNo'), @VoidInvoiceId,
                        @RQty, 0, ISNULL(@RNewBal, 0), CostPrice, GETDATE(),
                        JSON_VALUE(@JsonData, '$.voidedBy')
                    FROM [dbo].[POS_InvoiceDetail]
                    WHERE InvoiceId = @VoidInvoiceId AND ProductId = @RProductId;
                END
                
                FETCH NEXT FROM rev_cursor INTO @RProductId, @RQty, @RBatchId, @RIsService;
            END
            CLOSE rev_cursor; DEALLOCATE rev_cursor;
        END
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END

-- TAG_INV_SELECT_Invoice (with detail — multi-result set)
CREATE OR ALTER PROCEDURE [dbo].[TAG_INV_SELECT_Invoice]
    @InvoiceNo  NVARCHAR(30)  = NULL,
    @SessionId  INT           = NULL,
    @FromDate   DATE          = NULL,
    @ToDate     DATE          = NULL,
    @BranchId   INT           = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    IF @InvoiceNo IS NOT NULL
    BEGIN
        -- Result set 1: Invoice header
        SELECT i.Id AS id, i.InvoiceNo AS invoiceNo, i.SessionId AS sessionId,
               i.BranchId AS branchId, b.BranchName AS branchName,
               i.CustomerId AS customerId, c.CustomerName AS customerName,
               CONVERT(VARCHAR, i.InvoiceDate, 120) AS invoiceDate,
               i.Status AS status, i.SubTotal AS subTotal,
               i.TotalDiscount AS totalDiscount, i.TotalTax AS totalTax,
               i.GrandTotal AS grandTotal, i.AmountPaid AS amountPaid,
               i.ChangeGiven AS changeGiven,
               i.LoyaltyPointsEarned AS loyaltyPointsEarned,
               i.LoyaltyPointsRedeemed AS loyaltyPointsRedeemed,
               i.LoyaltyDiscount AS loyaltyDiscount,
               i.AddedBy AS addedBy
        FROM [dbo].[POS_Invoice] i
        INNER JOIN [dbo].[SYS_Branch] b ON i.BranchId = b.Id
        LEFT JOIN [dbo].[POS_Customer] c ON i.CustomerId = c.Id
        WHERE i.InvoiceNo = @InvoiceNo;
        
        -- Result set 2: Invoice detail lines
        SELECT pid.Id AS id, pid.InvoiceId AS invoiceId,
               pid.ProductId AS productId, p.ProductName AS productName,
               p.Code AS productCode, pb.Barcode AS barcode,
               pid.Quantity AS quantity, pid.UomId AS uomId,
               uom.UnitSymbol AS uomSymbol, pid.UnitPrice AS unitPrice,
               pid.DiscountPct AS discountPct, pid.DiscountAmount AS discountAmount,
               pid.TaxRate AS taxRate, pid.TaxAmount AS taxAmount,
               pid.LineTotal AS lineTotal
        FROM [dbo].[POS_InvoiceDetail] pid
        INNER JOIN [dbo].[POS_Invoice] i ON pid.InvoiceId = i.Id
        INNER JOIN [dbo].[REF_Product] p ON pid.ProductId = p.Id
        LEFT JOIN [dbo].[REF_ProductBarcode] pb ON p.Id = pb.ProductId AND pb.IsPrimary = 1
        LEFT JOIN [dbo].[REF_UnitOfMeasure] uom ON pid.UomId = uom.Id
        WHERE i.InvoiceNo = @InvoiceNo;
        
        -- Result set 3: Payments
        SELECT PaymentMethod AS paymentMethod, Amount AS amount,
               CardLast4 AS cardLast4, CardType AS cardType, ApprovalCode AS approvalCode
        FROM [dbo].[POS_Payment]
        WHERE InvoiceId = (SELECT Id FROM [dbo].[POS_Invoice] WHERE InvoiceNo = @InvoiceNo);
    END
    ELSE
    BEGIN
        -- List view (no detail)
        SELECT i.Id AS id, i.InvoiceNo AS invoiceNo,
               CONVERT(VARCHAR, i.InvoiceDate, 120) AS invoiceDate,
               i.Status AS status, i.GrandTotal AS grandTotal,
               i.CustomerId AS customerId, c.CustomerName AS customerName,
               i.BranchId AS branchId, b.BranchName AS branchName,
               i.AddedBy AS addedBy
        FROM [dbo].[POS_Invoice] i
        LEFT JOIN [dbo].[POS_Customer] c ON i.CustomerId = c.Id
        INNER JOIN [dbo].[SYS_Branch] b ON i.BranchId = b.Id
        WHERE (@SessionId IS NULL OR i.SessionId = @SessionId)
          AND (@BranchId IS NULL OR i.BranchId = @BranchId)
          AND (@FromDate IS NULL OR CAST(i.InvoiceDate AS DATE) >= @FromDate)
          AND (@ToDate IS NULL OR CAST(i.InvoiceDate AS DATE) <= @ToDate)
        ORDER BY i.InvoiceDate DESC;
    END
END
```

### 10.6 Report SPs

```sql
-- TAG_INV_SELECT_StockOnHand
CREATE OR ALTER PROCEDURE [dbo].[TAG_INV_SELECT_StockOnHand]
    @WarehouseId INT  = NULL,
    @BranchId    INT  = NULL,
    @CategoryId  INT  = NULL,
    @LowStockOnly BIT = 0
AS
BEGIN
    SET NOCOUNT ON;
    SELECT p.Id AS productId, p.Code AS productCode, p.ProductName AS productName,
           c.CategoryName AS categoryName, b.BrandName AS brandName,
           uom.UnitSymbol AS uomSymbol,
           ISNULL(sb.CurrentQty, 0) AS currentQty,
           ISNULL(sb.ReservedQty, 0) AS reservedQty,
           ISNULL(sb.AvailableQty, 0) AS availableQty,
           p.ReorderLevel AS reorderLevel, p.MinStockQty AS minStockQty,
           w.WarehouseName AS warehouseName, br.BranchName AS branchName,
           CASE WHEN ISNULL(sb.AvailableQty, 0) <= p.ReorderLevel 
                THEN 1 ELSE 0 END AS isBelowReorder
    FROM [dbo].[REF_Product] p
    LEFT JOIN [dbo].[INV_StockBalance] sb ON p.Id = sb.ProductId
        AND (@WarehouseId IS NULL OR sb.WarehouseId = @WarehouseId)
    LEFT JOIN [dbo].[SYS_Warehouse] w ON sb.WarehouseId = w.Id
    LEFT JOIN [dbo].[SYS_Branch] br ON w.BranchId = br.Id
    LEFT JOIN [dbo].[REF_Category] c ON p.CategoryId = c.Id
    LEFT JOIN [dbo].[REF_Brand] b ON p.BrandId = b.Id
    LEFT JOIN [dbo].[REF_UnitOfMeasure] uom ON p.SaleUomId = uom.Id
    WHERE p.IsActive = 1 AND p.IsService = 0
      AND (@CategoryId IS NULL OR p.CategoryId = @CategoryId 
           OR p.CategoryId IN (
               SELECT Id FROM [dbo].[REF_Category]
               WHERE FullPath LIKE (SELECT FullPath FROM [dbo].[REF_Category] WHERE Id = @CategoryId) + '/%'))
      AND (@BranchId IS NULL OR br.Id = @BranchId)
      AND (@LowStockOnly = 0 OR ISNULL(sb.AvailableQty, 0) <= p.ReorderLevel)
    ORDER BY CASE WHEN ISNULL(sb.AvailableQty, 0) <= p.ReorderLevel THEN 0 ELSE 1 END, p.ProductName;
END

-- TAG_INV_SELECT_ExpiryAlert
CREATE OR ALTER PROCEDURE [dbo].[TAG_INV_SELECT_ExpiryAlert]
    @DaysThreshold INT = 90,
    @WarehouseId   INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SELECT bt.Id AS batchId, bt.BatchNo AS batchNo,
           p.ProductName AS productName, p.Code AS productCode,
           bt.ExpiryDate AS expiryDate,
           DATEDIFF(DAY, GETDATE(), bt.ExpiryDate) AS daysToExpiry,
           bt.CurrentQty AS currentQty,
           w.WarehouseName AS warehouseName, br.BranchName AS branchName,
           CASE 
               WHEN DATEDIFF(DAY, GETDATE(), bt.ExpiryDate) <= 30 THEN 'CRITICAL'
               WHEN DATEDIFF(DAY, GETDATE(), bt.ExpiryDate) <= 90 THEN 'WARNING'
               ELSE 'NOTICE'
           END AS alertLevel
    FROM [dbo].[INV_Batch] bt
    INNER JOIN [dbo].[REF_Product] p ON bt.ProductId = p.Id
    INNER JOIN [dbo].[SYS_Warehouse] w ON bt.WarehouseId = w.Id
    INNER JOIN [dbo].[SYS_Branch] br ON w.BranchId = br.Id
    WHERE bt.CurrentQty > 0
      AND bt.ExpiryDate IS NOT NULL
      AND bt.IsActive = 1
      AND DATEDIFF(DAY, GETDATE(), bt.ExpiryDate) <= @DaysThreshold
      AND (@WarehouseId IS NULL OR bt.WarehouseId = @WarehouseId)
    ORDER BY bt.ExpiryDate ASC;
END

-- TAG_INV_SELECT_SalesSummary (daily/date range)
CREATE OR ALTER PROCEDURE [dbo].[TAG_INV_SELECT_SalesSummary]
    @FromDate  DATE,
    @ToDate    DATE,
    @BranchId  INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Result set 1: Summary totals
    SELECT 
        COUNT(*) AS invoiceCount,
        SUM(GrandTotal) AS totalSales,
        SUM(TotalDiscount) AS totalDiscounts,
        SUM(TotalTax) AS totalTax,
        SUM(GrandTotal - TotalDiscount - LoyaltyDiscount) AS netSales,
        (SELECT SUM(Amount) FROM [dbo].[POS_Payment] pay
         INNER JOIN [dbo].[POS_Invoice] ii ON pay.InvoiceId = ii.Id
         WHERE pay.PaymentMethod = 'CASH'
           AND CAST(ii.InvoiceDate AS DATE) BETWEEN @FromDate AND @ToDate
           AND (@BranchId IS NULL OR ii.BranchId = @BranchId)
           AND ii.Status = 'ACTIVE') AS totalCash,
        (SELECT SUM(Amount) FROM [dbo].[POS_Payment] pay
         INNER JOIN [dbo].[POS_Invoice] ii ON pay.InvoiceId = ii.Id
         WHERE pay.PaymentMethod LIKE 'CARD%'
           AND CAST(ii.InvoiceDate AS DATE) BETWEEN @FromDate AND @ToDate
           AND (@BranchId IS NULL OR ii.BranchId = @BranchId)
           AND ii.Status = 'ACTIVE') AS totalCard
    FROM [dbo].[POS_Invoice]
    WHERE CAST(InvoiceDate AS DATE) BETWEEN @FromDate AND @ToDate
      AND (@BranchId IS NULL OR BranchId = @BranchId)
      AND Status = 'ACTIVE';
    
    -- Result set 2: Sales by product
    SELECT p.ProductName AS productName, p.Code AS productCode,
           SUM(pid.Quantity) AS totalQty,
           SUM(pid.LineTotal) AS totalAmount,
           SUM(pid.Quantity * pid.CostPrice) AS totalCost,
           SUM(pid.LineTotal) - SUM(pid.Quantity * pid.CostPrice) AS grossProfit
    FROM [dbo].[POS_InvoiceDetail] pid
    INNER JOIN [dbo].[POS_Invoice] inv ON pid.InvoiceId = inv.Id
    INNER JOIN [dbo].[REF_Product] p ON pid.ProductId = p.Id
    WHERE CAST(inv.InvoiceDate AS DATE) BETWEEN @FromDate AND @ToDate
      AND (@BranchId IS NULL OR inv.BranchId = @BranchId)
      AND inv.Status = 'ACTIVE'
    GROUP BY p.Id, p.ProductName, p.Code
    ORDER BY totalAmount DESC;
END
```

---

## 11. Domain Models (C# Classes)

All domain model files follow SKILL.md camelCase property convention and live in `TagInv.Domain`.

### 11.1 CustomClasses

```csharp
// TagInv.Domain/CustomClasses/BaseModel.cs
namespace TagInv.Domain.CustomClasses
{
    public class BaseModel
    {
        public string code        { get; set; }
        public string description { get; set; }
        public object data        { get; set; }
    }

    public class FileWithData
    {
        public IFormFile? file          { get; set; }
        public string?    referenceData { get; set; }
    }

    public class FileData
    {
        public string filePath     { get; set; }
        public string fileMimeType { get; set; }
    }
}

// TagInv.Domain/CustomClasses/UpdateData.cs
using Newtonsoft.Json.Linq;
namespace TagInv.Domain.CustomClasses
{
    public class UpdateData
    {
        public int     UserID  { get; set; }
        public JObject NewData { get; set; }
        public JObject OldData { get; set; }
    }
}

// TagInv.Domain/CustomClasses/PaginatedRequest.cs
namespace TagInv.Domain.CustomClasses
{
    public class PaginatedRequest
    {
        public int    pageNo   { get; set; } = 1;
        public int    pageSize { get; set; } = 50;
        public string? search  { get; set; }
    }
}
```

### 11.2 Reference Domain Models

```csharp
// TagInv.Domain/Reference/Category.cs
namespace TagInv.Domain.Reference
{
    public class Category
    {
        public int?    id             { get; set; }
        public string? code           { get; set; }
        public string? categoryName   { get; set; }
        public int?    parentId       { get; set; }
        public int?    level          { get; set; }
        public string? fullPath       { get; set; }
        public string? description    { get; set; }
        public string? imageUrl       { get; set; }
        public string? imageMimeType  { get; set; }
        public int?    sortOrder      { get; set; }
        public bool?   isActive       { get; set; }
        public string? breadcrumbPath { get; set; }  // computed by SP
        public string? addedBy        { get; set; }
        public string? addedOn        { get; set; }
        public string? modifiedBy     { get; set; }
        public string? modifiedOn     { get; set; }
        public int?    user           { get; set; }
        
        // Navigation (for tree building client-side)
        public List<Category>? children { get; set; }
    }
    
    public class CategorySelectRequest
    {
        public bool treeMode { get; set; } = false;
        public int? parentId { get; set; }
    }
}

// TagInv.Domain/Reference/Product.cs
namespace TagInv.Domain.Reference
{
    public class Product
    {
        public int?    id                  { get; set; }
        public string? code                { get; set; }
        public string? productName         { get; set; }
        public string? genericName         { get; set; }
        public int?    categoryId          { get; set; }
        public string? categoryName        { get; set; }
        public int?    brandId             { get; set; }
        public string? brandName           { get; set; }
        public int?    supplierId          { get; set; }
        public string? supplierName        { get; set; }
        public int?    purchaseUomId       { get; set; }
        public int?    saleUomId           { get; set; }
        public string? saleUomSymbol       { get; set; }
        public int?    taxConfigId         { get; set; }
        public decimal? taxRate            { get; set; }
        public bool?   taxIsInclusive      { get; set; }
        // Type flags
        public bool?   isWeighable         { get; set; }
        public bool?   isExpiryTracked     { get; set; }
        public bool?   isBatchTracked      { get; set; }
        public bool?   isService           { get; set; }
        public bool?   isControlledDrug    { get; set; }
        public bool?   isActive            { get; set; }
        // Pricing
        public decimal? costPrice          { get; set; }
        public decimal? retailPrice        { get; set; }
        public decimal? wholesalePrice     { get; set; }
        public decimal? memberPrice        { get; set; }
        public decimal? minMarginPct       { get; set; }
        // Stock control
        public decimal? reorderLevel       { get; set; }
        public decimal? minStockQty        { get; set; }
        public decimal? maxStockQty        { get; set; }
        // Media
        public string? imageUrl            { get; set; }
        public string? imageMimeType       { get; set; }
        public string? description         { get; set; }
        public string? notes               { get; set; }
        public string? defaultBarcodeType  { get; set; }
        // Audit
        public string? addedBy             { get; set; }
        public string? addedOn             { get; set; }
        public string? modifiedBy          { get; set; }
        public string? modifiedOn          { get; set; }
        public int?    user                { get; set; }
        // Nested
        public List<ProductBarcode>? barcodes          { get; set; }
        public List<ProductAttributeValue>? attributes { get; set; }
    }
    
    public class ProductBarcode
    {
        public int?    id           { get; set; }
        public int?    productId    { get; set; }
        public string? barcode      { get; set; }
        public string? barcodeType  { get; set; }
        public bool?   isPrimary    { get; set; }
        public bool?   isActive     { get; set; }
        public string? addedBy      { get; set; }
        public string? addedOn      { get; set; }
    }
    
    public class ProductAttributeValue
    {
        public int?    id               { get; set; }
        public int?    productId        { get; set; }
        public int?    attributeDefId   { get; set; }
        public string? attributeName    { get; set; }
        public string? valueString      { get; set; }
        public decimal? valueDecimal    { get; set; }
        public int?    valueInt         { get; set; }
        public bool?   valueBool        { get; set; }
        public string? valueDate        { get; set; }
    }
    
    public class ProductBarcodeSearchRequest
    {
        public string? barcode { get; set; }
    }
}
```

### 11.3 Inventory Domain Models

```csharp
// TagInv.Domain/Inventory/GRN.cs
namespace TagInv.Domain.Inventory
{
    public class GRN
    {
        public int?    id                  { get; set; }
        public string? grnNo               { get; set; }
        public int?    branchId            { get; set; }
        public string? branchName          { get; set; }
        public int?    warehouseId         { get; set; }
        public string? warehouseName       { get; set; }
        public int?    supplierId          { get; set; }
        public string? supplierName        { get; set; }
        public string? supplierInvoiceNo   { get; set; }
        public string? supplierInvoiceDate { get; set; }
        public string? grnDate             { get; set; }
        public string? status              { get; set; }
        public decimal? totalCost          { get; set; }
        public string? notes               { get; set; }
        public string? approvedBy          { get; set; }
        public string? approvedOn          { get; set; }
        public string? addedBy             { get; set; }
        public string? addedOn             { get; set; }
        public string? modifiedBy          { get; set; }
        public string? modifiedOn          { get; set; }
        public int?    user                { get; set; }
        public List<GRNDetail>? details    { get; set; }
    }
    
    public class GRNDetail
    {
        public int?    id               { get; set; }
        public int?    grnId            { get; set; }
        public int?    productId        { get; set; }
        public string? productName      { get; set; }
        public int?    uomId            { get; set; }
        public string? uomSymbol        { get; set; }
        public decimal? quantity        { get; set; }
        public decimal? freeQty         { get; set; }
        public decimal? costPrice       { get; set; }
        public decimal? retailPrice     { get; set; }
        public string? batchNo          { get; set; }
        public string? manufactureDate  { get; set; }
        public string? expiryDate       { get; set; }
        public decimal? lineTotal       { get; set; }
    }
    
    public class GRNApproveRequest
    {
        public int?    id          { get; set; }
        public string? grnNo       { get; set; }
        public string? status      { get; set; }
        public string? approvedBy  { get; set; }
    }
}

// TagInv.Domain/Inventory/Stock.cs
namespace TagInv.Domain.Inventory
{
    public class StockBalance
    {
        public int?    productId     { get; set; }
        public string? productCode   { get; set; }
        public string? productName   { get; set; }
        public string? categoryName  { get; set; }
        public string? brandName     { get; set; }
        public string? uomSymbol     { get; set; }
        public int?    warehouseId   { get; set; }
        public string? warehouseName { get; set; }
        public string? branchName    { get; set; }
        public decimal? currentQty   { get; set; }
        public decimal? reservedQty  { get; set; }
        public decimal? availableQty { get; set; }
        public decimal? reorderLevel { get; set; }
        public bool?   isBelowReorder { get; set; }
    }
    
    public class ExpiryAlert
    {
        public int?    batchId       { get; set; }
        public string? batchNo       { get; set; }
        public string? productName   { get; set; }
        public string? productCode   { get; set; }
        public string? expiryDate    { get; set; }
        public int?    daysToExpiry  { get; set; }
        public decimal? currentQty   { get; set; }
        public string? warehouseName { get; set; }
        public string? branchName    { get; set; }
        public string? alertLevel    { get; set; }
    }
}
```

### 11.4 Cashier Domain Models

```csharp
// TagInv.Domain/Cashier/Invoice.cs
namespace TagInv.Domain.Cashier
{
    public class Invoice
    {
        public int?    id                       { get; set; }
        public string? invoiceNo                { get; set; }
        public int?    sessionId                { get; set; }
        public int?    branchId                 { get; set; }
        public string? branchName               { get; set; }
        public int?    warehouseId              { get; set; }
        public int?    customerId               { get; set; }
        public string? customerName             { get; set; }
        public string? invoiceDate              { get; set; }
        public string? status                   { get; set; }
        public decimal? subTotal                { get; set; }
        public decimal? totalDiscount           { get; set; }
        public decimal? totalTax                { get; set; }
        public decimal? grandTotal              { get; set; }
        public decimal? amountPaid              { get; set; }
        public decimal? changeGiven             { get; set; }
        public decimal? loyaltyPointsEarned     { get; set; }
        public decimal? loyaltyPointsRedeemed   { get; set; }
        public decimal? loyaltyDiscount         { get; set; }
        public string? voidedBy                 { get; set; }
        public string? voidedOn                 { get; set; }
        public string? voidReason               { get; set; }
        public string? notes                    { get; set; }
        public string? addedBy                  { get; set; }
        public string? addedOn                  { get; set; }
        public int?    user                     { get; set; }
        public List<InvoiceDetail>? details     { get; set; }
        public List<InvoicePayment>? payments   { get; set; }
    }
    
    public class InvoiceDetail
    {
        public int?    id                { get; set; }
        public int?    invoiceId         { get; set; }
        public int?    productId         { get; set; }
        public string? productName       { get; set; }
        public string? productCode       { get; set; }
        public string? barcode           { get; set; }
        public string? barcodeUsed       { get; set; }
        public int?    batchId           { get; set; }
        public decimal? quantity         { get; set; }
        public int?    uomId             { get; set; }
        public string? uomSymbol         { get; set; }
        public decimal? unitPrice        { get; set; }
        public decimal? costPrice        { get; set; }
        public decimal? discountPct      { get; set; }
        public decimal? discountAmount   { get; set; }
        public decimal? taxRate          { get; set; }
        public decimal? taxAmount        { get; set; }
        public decimal? lineTotal        { get; set; }
        public bool?   isPriceOverridden { get; set; }
        public int?    pricingRuleId     { get; set; }
    }
    
    public class InvoicePayment
    {
        public int?    id             { get; set; }
        public int?    invoiceId      { get; set; }
        public string? paymentMethod  { get; set; }
        public decimal? amount        { get; set; }
        public string? cardLast4      { get; set; }
        public string? cardType       { get; set; }
        public string? approvalCode   { get; set; }
        public string? paidOn         { get; set; }
    }
    
    public class VoidInvoiceRequest
    {
        public int?    id         { get; set; }
        public string? invoiceNo  { get; set; }
        public string? voidedBy   { get; set; }
        public string? voidReason { get; set; }
    }
}

// TagInv.Domain/Cashier/Session.cs
namespace TagInv.Domain.Cashier
{
    public class Session
    {
        public int?    id            { get; set; }
        public string? sessionNo     { get; set; }
        public int?    branchId      { get; set; }
        public string? cashierCode   { get; set; }
        public string? cashierName   { get; set; }
        public string? openedOn      { get; set; }
        public string? closedOn      { get; set; }
        public decimal? openingFloat { get; set; }
        public decimal? closingCash  { get; set; }
        public decimal? expectedCash { get; set; }
        public decimal? cashVariance { get; set; }
        public string? status        { get; set; }
        public decimal? totalSales   { get; set; }
        public decimal? totalCash    { get; set; }
        public decimal? totalCard    { get; set; }
        public decimal? totalReturns { get; set; }
        public int?    invoiceCount  { get; set; }
        public int?    user          { get; set; }
    }
    
    public class CloseSessionRequest
    {
        public int?    id           { get; set; }
        public string? sessionNo    { get; set; }
        public decimal? closingCash { get; set; }
        public string? closedBy     { get; set; }
    }
}
```

---

## 12. Service Layer Design

All services follow the SKILL.md exact pattern: no base class, no interface, `AddTransient`, both connection strings in constructor.

### 12.1 Product Service (Reference)

```csharp
// TagInv.Services/Reference/ProductService.cs
using Dapper;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using TagInv.Domain.Reference;
using TagInv.Domain.CustomClasses;

namespace TagInv.Services.Reference
{
    public class ProductService
    {
        private readonly string _adminConnectionString;
        private readonly string _productConnectionString;

        public ProductService(string adminConnectionString, string productConnectionString)
        {
            _adminConnectionString  = adminConnectionString;
            _productConnectionString = productConnectionString;
        }

        public async Task<BaseModel> Insert(Product data)
        {
            try
            {
                using (var connection = new SqlConnection(_productConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    string JsonData = JsonConvert.SerializeObject(data);
                    para.Add("@JsonData", JsonData, DbType.String);
                    para.Add("@Action", "I", DbType.String);

                    var result = await connection.QueryAsync<Product>(
                        "[dbo].[TAG_INV_POPULATE_Product]", para,
                        commandType: CommandType.StoredProcedure);

                    return new BaseModel() { code = "1000", description = "Success", data = result };
                }
            }
            catch (Exception ex)
            {
                return new BaseModel() { code = "998", description = ex.Message, data = data };
            }
        }

        public async Task<BaseModel> InsertWithImage(List<FileWithData> data)
        {
            try
            {
                SettingsService settings = new SettingsService(_adminConnectionString, _productConnectionString);
                string fileroot = settings.SelectWithinProject("FP").Value;

                Product entity = new Product();
                var filePath = fileroot + "\\Products";

                foreach (var filesWithData in data)
                {
                    entity = JsonConvert.DeserializeObject<Product>(filesWithData.referenceData!)!;
                    if (filesWithData.file != null)
                    {
                        var fileName = (entity.code ?? "product") + "_" + Guid.NewGuid() +
                                       Path.GetExtension(filesWithData.file.FileName);

                        if (!Directory.Exists(filePath))
                            Directory.CreateDirectory(filePath);

                        var fullFilePath = Path.Combine(filePath, fileName);
                        using (var stream = new FileStream(fullFilePath, FileMode.Create))
                            await filesWithData.file.CopyToAsync(stream);

                        entity.imageUrl      = fullFilePath;
                        entity.imageMimeType = filesWithData.file.ContentType;
                    }
                }

                using (var connection = new SqlConnection(_productConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("@JsonData", JsonConvert.SerializeObject(entity), DbType.String);
                    para.Add("@Action", "I", DbType.String);
                    var result = await connection.QueryAsync<Product>(
                        "[dbo].[TAG_INV_POPULATE_Product]", para,
                        commandType: CommandType.StoredProcedure);
                    return new BaseModel() { code = "1000", description = "Success", data = result };
                }
            }
            catch (Exception ex)
            {
                return new BaseModel() { code = "998", description = ex.Message, data = data };
            }
        }

        public async Task<BaseModel> Update(UpdateData data)
        {
            try
            {
                using (var connection = new SqlConnection(_productConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("@JsonData",    JsonConvert.SerializeObject(data.NewData), DbType.String);
                    para.Add("@OldJsonData", JsonConvert.SerializeObject(data.OldData), DbType.String);
                    para.Add("@Action", "U", DbType.String);

                    await connection.ExecuteAsync(
                        "[dbo].[TAG_INV_POPULATE_Product]", para,
                        commandType: CommandType.StoredProcedure);

                    return new BaseModel() { code = "1000", description = "Success", data = data };
                }
            }
            catch (Exception ex)
            {
                return new BaseModel() { code = "998", description = ex.Message, data = data };
            }
        }

        public async Task<BaseModel> Delete(Product data)
        {
            try
            {
                using (var connection = new SqlConnection(_productConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("@JsonData", JsonConvert.SerializeObject(data), DbType.String);
                    para.Add("@Action", "D", DbType.String);

                    await connection.ExecuteAsync(
                        "[dbo].[TAG_INV_POPULATE_Product]", para,
                        commandType: CommandType.StoredProcedure);

                    return new BaseModel() { code = "1000", description = "Success", data = data };
                }
            }
            catch (Exception ex)
            {
                return new BaseModel() { code = "998", description = ex.Message, data = data };
            }
        }

        public async Task<BaseModel> Select(string? code, int? categoryId, string? searchTerm, int pageNo = 1, int pageSize = 50)
        {
            try
            {
                using (var connection = new SqlConnection(_productConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("@Code",       code,       DbType.String);
                    para.Add("@CategoryId", categoryId, DbType.Int32);
                    para.Add("@SearchTerm", searchTerm, DbType.String);
                    para.Add("@PageNo",     pageNo,     DbType.Int32);
                    para.Add("@PageSize",   pageSize,   DbType.Int32);

                    var result = await connection.QueryAsync<Product>(
                        "[dbo].[TAG_INV_SELECT_Product]", para,
                        commandType: CommandType.StoredProcedure);

                    return new BaseModel() { code = "1000", description = "Success", data = result };
                }
            }
            catch (Exception ex)
            {
                return new BaseModel() { code = "998", description = ex.Message, data = code };
            }
        }

        // POS-optimized barcode lookup — returns product with pricing in <10ms
        public async Task<BaseModel> SelectByBarcode(string barcode)
        {
            try
            {
                using (var connection = new SqlConnection(_productConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("@Barcode", barcode, DbType.String);

                    var result = await connection.QueryAsync<Product>(
                        "[dbo].[TAG_INV_SELECT_Product]", para,
                        commandType: CommandType.StoredProcedure);

                    if (!result.Any())
                        return new BaseModel() { code = "4004", description = "Product not found.", data = null };

                    return new BaseModel() { code = "1000", description = "Success", data = result.FirstOrDefault() };
                }
            }
            catch (Exception ex)
            {
                return new BaseModel() { code = "998", description = ex.Message, data = barcode };
            }
        }
    }
}
```

### 12.2 Invoice Service (POS)

```csharp
// TagInv.Services/Cashier/InvoiceService.cs
using Dapper;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using TagInv.Domain.Cashier;
using TagInv.Domain.CustomClasses;
using Microsoft.AspNetCore.SignalR;
using TagInv.API;  // for SignalRHub type (referenced via API project — see note)

namespace TagInv.Services.Cashier
{
    public class InvoiceService
    {
        private readonly string _adminConnectionString;
        private readonly string _productConnectionString;

        public InvoiceService(string adminConnectionString, string productConnectionString)
        {
            _adminConnectionString  = adminConnectionString;
            _productConnectionString = productConnectionString;
        }

        public async Task<BaseModel> Insert(Invoice data)
        {
            try
            {
                using (var connection = new SqlConnection(_productConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    string JsonData = JsonConvert.SerializeObject(data);
                    para.Add("@JsonData", JsonData, DbType.String);
                    para.Add("@Action", "I", DbType.String);

                    var result = await connection.QueryAsync<Invoice>(
                        "[dbo].[TAG_INV_POPULATE_Invoice]", para,
                        commandType: CommandType.StoredProcedure);

                    return new BaseModel() { code = "1000", description = "Success", data = result };
                }
            }
            catch (Exception ex)
            {
                return new BaseModel() { code = "998", description = ex.Message, data = data };
            }
        }

        public async Task<BaseModel> VoidInvoice(VoidInvoiceRequest data)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(data.voidReason))
                    return new BaseModel() { code = "999", description = "Void reason is required.", data = data };

                using (var connection = new SqlConnection(_productConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("@JsonData", JsonConvert.SerializeObject(data), DbType.String);
                    para.Add("@Action", "D", DbType.String);

                    await connection.ExecuteAsync(
                        "[dbo].[TAG_INV_POPULATE_Invoice]", para,
                        commandType: CommandType.StoredProcedure);

                    return new BaseModel() { code = "1000", description = "Invoice voided.", data = data };
                }
            }
            catch (Exception ex)
            {
                return new BaseModel() { code = "998", description = ex.Message, data = data };
            }
        }

        public async Task<BaseModel> SelectDetail(string invoiceNo)
        {
            try
            {
                using var connection = new SqlConnection(_productConnectionString);
                DynamicParameters para = new DynamicParameters();
                para.Add("@InvoiceNo", invoiceNo, DbType.String);

                using var multi = await connection.QueryMultipleAsync(
                    "[dbo].[TAG_INV_SELECT_Invoice]", para,
                    commandType: CommandType.StoredProcedure);

                var header   = await multi.ReadSingleOrDefaultAsync<Invoice>();
                var details  = (await multi.ReadAsync<InvoiceDetail>()).ToList();
                var payments = (await multi.ReadAsync<InvoicePayment>()).ToList();

                if (header == null)
                    return new BaseModel() { code = "4004", description = "Invoice not found.", data = null };

                header.details  = details;
                header.payments = payments;

                return new BaseModel() { code = "1000", description = "Success", data = header };
            }
            catch (Exception ex)
            {
                return new BaseModel() { code = "998", description = ex.Message, data = null };
            }
        }

        public async Task<BaseModel> Select(int? sessionId, string? fromDate, string? toDate, int? branchId)
        {
            try
            {
                using (var connection = new SqlConnection(_productConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("@SessionId", sessionId, DbType.Int32);
                    para.Add("@FromDate",  fromDate,  DbType.String);
                    para.Add("@ToDate",    toDate,    DbType.String);
                    para.Add("@BranchId",  branchId,  DbType.Int32);

                    var result = await connection.QueryAsync<Invoice>(
                        "[dbo].[TAG_INV_SELECT_Invoice]", para,
                        commandType: CommandType.StoredProcedure);

                    return new BaseModel() { code = "1000", description = "Success", data = result };
                }
            }
            catch (Exception ex)
            {
                return new BaseModel() { code = "998", description = ex.Message, data = null };
            }
        }
    }
}
```

### 12.3 Settings Service (Admin DB utility)

```csharp
// TagInv.Services/System/SettingsService.cs
using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace TagInv.Services.System
{
    public class SettingsService
    {
        private readonly string _adminConnectionString;
        private readonly string _productConnectionString;

        public SettingsService(string adminConnectionString, string productConnectionString)
        {
            _adminConnectionString  = adminConnectionString;
            _productConnectionString = productConnectionString;
        }

        // Synchronous — used inline in other services
        public (string Key, string Value) SelectWithinProject(string key)
        {
            using (var connection = new SqlConnection(_productConnectionString))
            {
                DynamicParameters para = new DynamicParameters();
                para.Add("@Key", key, DbType.String);
                var result = connection.QueryFirstOrDefault<(string SettingKey, string SettingValue)>(
                    "[dbo].[TAG_INV_SELECT_Setting]", para,
                    commandType: CommandType.StoredProcedure);
                return (result.SettingKey, result.SettingValue);
            }
        }
    }
}
```

---

## 13. Controller & API Design

### 13.1 Route Convention

All controllers use route prefix: `api/TagInv/[controller]`

### 13.2 Reference Controllers

```csharp
// TagInv.API/Controllers/Reference/ProductController.cs
using Microsoft.AspNetCore.Mvc;
using TagInv.Domain.Reference;
using TagInv.Domain.CustomClasses;
using TagInv.Services.Reference;

namespace TagInv.API.Controllers.Reference
{
    [Route("api/TagInv/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _service;

        public ProductController(ProductService service)
        {
            _service = service;
        }

        [HttpPost("Insert")]
        public async Task<ActionResult> Insert(Product data)
        {
            var response = await _service.Insert(data);
            return Ok(response);
        }

        [HttpPost("InsertWithImage")]
        public async Task<ActionResult> InsertWithImage([FromForm] List<FileWithData> data)
        {
            var response = await _service.InsertWithImage(data);
            return Ok(response);
        }

        [HttpPost("Update")]
        public async Task<ActionResult> Update(UpdateData data)
        {
            var response = await _service.Update(data);
            return Ok(response);
        }

        [HttpPost("Delete")]
        public async Task<ActionResult> Delete(Product data)
        {
            var response = await _service.Delete(data);
            return Ok(response);
        }

        [HttpGet("Select")]
        public async Task<ActionResult> Select(string? code, int? categoryId, string? searchTerm, int pageNo = 1, int pageSize = 50)
        {
            var response = await _service.Select(code, categoryId, searchTerm, pageNo, pageSize);
            return Ok(response);
        }

        [HttpGet("SelectByBarcode")]
        public async Task<ActionResult> SelectByBarcode(string barcode)
        {
            var response = await _service.SelectByBarcode(barcode);
            return Ok(response);
        }
    }
}

// TagInv.API/Controllers/Reference/CategoryController.cs
namespace TagInv.API.Controllers.Reference
{
    [Route("api/TagInv/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _service;
        public CategoryController(CategoryService service) => _service = service;

        [HttpPost("Insert")]
        public async Task<ActionResult> Insert(Category data)
            => Ok(await _service.Insert(data));

        [HttpPost("Update")]
        public async Task<ActionResult> Update(UpdateData data)
            => Ok(await _service.Update(data));

        [HttpPost("Delete")]
        public async Task<ActionResult> Delete(Category data)
            => Ok(await _service.Delete(data));

        [HttpGet("Select")]
        public async Task<ActionResult> Select(string? code, int? parentId, bool treeMode = false)
            => Ok(await _service.Select(code, parentId, treeMode));
    }
}
```

### 13.3 Cashier / POS Controllers

```csharp
// TagInv.API/Controllers/Cashier/InvoiceController.cs
using Microsoft.AspNetCore.SignalR;

namespace TagInv.API.Controllers.Cashier
{
    [Route("api/TagInv/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly InvoiceService _service;
        private readonly IHubContext<SignalRHub> _hub;

        public InvoiceController(InvoiceService service, IHubContext<SignalRHub> hub)
        {
            _service = service;
            _hub     = hub;
        }

        [HttpPost("Insert")]
        public async Task<ActionResult> Insert(Invoice data)
        {
            var response = await _service.Insert(data);
            // Broadcast new sale to manager dashboard
            if (response.code == "1000")
                await _hub.Clients.All.SendAsync("ReceiveNotification_NewSale", response.data);
            return Ok(response);
        }

        [HttpPost("VoidInvoice")]
        public async Task<ActionResult> VoidInvoice(VoidInvoiceRequest data)
            => Ok(await _service.VoidInvoice(data));

        [HttpGet("SelectDetail")]
        public async Task<ActionResult> SelectDetail(string invoiceNo)
            => Ok(await _service.SelectDetail(invoiceNo));

        [HttpGet("Select")]
        public async Task<ActionResult> Select(int? sessionId, string? fromDate, string? toDate, int? branchId)
            => Ok(await _service.Select(sessionId, fromDate, toDate, branchId));
    }
}
```

### 13.4 Complete API Endpoint Catalogue

| Module | Controller | Endpoint | Method | Description |
|--------|-----------|----------|--------|-------------|
| System | Branch | `POST /Insert` | POST | Create branch |
| System | Branch | `POST /Update` | POST | Update branch |
| System | Branch | `POST /Delete` | POST | Deactivate branch |
| System | Branch | `GET /Select` | GET | Get branches |
| System | Warehouse | `POST /Insert` | POST | Create warehouse |
| System | Warehouse | `GET /Select` | GET | Get warehouses |
| System | Settings | `POST /Update` | POST | Update setting value |
| System | Settings | `GET /Select` | GET | Get settings by group |
| System | TaxConfig | `POST /Insert` | POST | Add tax config |
| System | TaxConfig | `GET /Select` | GET | Get tax configs |
| Reference | Category | `POST /Insert` | POST | Create category |
| Reference | Category | `GET /Select` | GET | Get categories (flat or tree) |
| Reference | Brand | `POST /Insert` | POST | Create brand |
| Reference | Brand | `GET /Select` | GET | Get brands |
| Reference | Supplier | `POST /Insert` | POST | Create supplier |
| Reference | Supplier | `GET /Select` | GET | Get suppliers |
| Reference | UnitOfMeasure | `POST /Insert` | POST | Create UOM |
| Reference | UnitOfMeasure | `GET /Select` | GET | Get UOMs |
| Reference | Product | `POST /Insert` | POST | Create product |
| Reference | Product | `POST /InsertWithImage` | POST | Create product with image |
| Reference | Product | `POST /Update` | POST | Update product |
| Reference | Product | `POST /Delete` | POST | Deactivate product |
| Reference | Product | `GET /Select` | GET | Search products (paginated) |
| Reference | Product | `GET /SelectByBarcode` | GET | Barcode lookup (POS fast path) |
| Reference | PricingRule | `POST /Insert` | POST | Create pricing rule |
| Reference | PricingRule | `GET /Select` | GET | Get active pricing rules |
| Inventory | GRN | `POST /Insert` | POST | Create GRN (DRAFT) |
| Inventory | GRN | `POST /Approve` | POST | Approve GRN → stock update |
| Inventory | GRN | `GET /Select` | GET | Get GRNs |
| Inventory | GRN | `GET /SelectDetail` | GET | Get GRN with lines |
| Inventory | Stock | `GET /SelectBalance` | GET | Stock on hand report |
| Inventory | Stock | `GET /SelectExpiryAlert` | GET | Expiry alert report |
| Inventory | StockAdjustment | `POST /Insert` | POST | Create adjustment |
| Inventory | StockAdjustment | `POST /Approve` | POST | Approve adjustment |
| Inventory | StockTransfer | `POST /Insert` | POST | Create transfer request |
| Inventory | StockTransfer | `POST /Approve` | POST | Approve transfer |
| Inventory | StockTransfer | `POST /Receive` | POST | Mark transfer received |
| Cashier | Session | `POST /Insert` | POST | Open cashier session |
| Cashier | Session | `POST /Close` | POST | Close cashier session |
| Cashier | Session | `GET /Select` | GET | Get sessions |
| Cashier | Invoice | `POST /Insert` | POST | Create invoice + deduct stock |
| Cashier | Invoice | `POST /VoidInvoice` | POST | Void invoice + reverse stock |
| Cashier | Invoice | `GET /SelectDetail` | GET | Get invoice with lines + payments |
| Cashier | Invoice | `GET /Select` | GET | List invoices |
| Cashier | Customer | `POST /Insert` | POST | Create customer |
| Cashier | Customer | `POST /Update` | POST | Update customer |
| Cashier | Customer | `GET /Select` | GET | Get customers |
| Cashier | Customer | `GET /SelectByPhone` | GET | Lookup customer by phone |
| Cashier | Return | `POST /Insert` | POST | Process return |
| Cashier | Return | `GET /Select` | GET | Get returns |
| Reports | Report | `GET /SalesSummary` | GET | Sales summary report |
| Reports | Report | `GET /StockOnHand` | GET | Stock on hand report |
| Reports | Report | `GET /ExpiryAlert` | GET | Expiry alert report |
| Reports | Report | `GET /SessionSummary` | GET | Cashier session Z-report |
| Reports | Report | `GET /GRNReport` | GET | GRN report |

---

## 14. Middleware & Cross-Cutting Concerns

### 14.1 TokenValidity Middleware

Follows SKILL.md exactly. Every request (except `/signalRHub`) must carry:
- `X-Token`: GUID session token
- `X-Token-module`: Module code — must be ≤ 5 chars (varchar(5) constraint in `Tag_Res_Admin`)

**Validation flow** (calls existing Admin DB SP):
1. Read `X-Token` (UNIQUEIDENTIFIER) and `X-Token-module` (VARCHAR(5)) from headers.
2. Call `[Tag_Res_Admin].[dbo].[TAG_AD_UPDATE_ModuleLog](@Token, @ModuleCode)`.
3. SP checks: row exists in `Tag_AD_ModuleLoggingLog` AND `DATEDIFF(MINUTE, LastUpdate, now) ≤ IdleTimeInMin`.
4. On success: SP updates `LastUpdate` and returns `UserId`. Middleware passes `UserId` into the request context.
5. On failure (RAISERROR): return HTTP 404.

**Module codes registered in `Tag_AD_Modules`** (Code is varchar(5)):

| Module | Code | Covers |
|--------|------|--------|
| Inventory Management | `INV` | System Config + Reference / Master Data + Inventory |
| Cashier / POS | `POS` | Sessions, billing, payments, returns, loyalty |
| Reports | `RPT` | All report screens |

> SYS and REF are merged into `INV`. Only three module records need seeding in `Tag_AD_Modules` for TagInv.

Unauthorized requests return HTTP 404 (not 401) by design to hide endpoint existence.

### 14.2 SignalR Hub

```csharp
// TagInv.API/SignalRHub.cs
using Microsoft.AspNetCore.SignalR;
using TagInv.Domain.Cashier;

namespace TagInv.API
{
    public class SignalRHub : Hub
    {
        public async Task SendNewSaleNotification(Invoice data)
        {
            await Clients.All.SendAsync("ReceiveNotification_NewSale", data);
        }
        
        public async Task SendStockAlertNotification(object data)
        {
            await Clients.All.SendAsync("ReceiveNotification_StockAlert", data);
        }
        
        public async Task SendExpiryAlertNotification(object data)
        {
            await Clients.All.SendAsync("ReceiveNotification_ExpiryAlert", data);
        }
    }
}
```

**SignalR Events:**

| Event Name | Trigger | Data |
|-----------|---------|------|
| `ReceiveNotification_NewSale` | Invoice saved | Invoice header |
| `ReceiveNotification_StockAlert` | Stock goes below reorder level | Product + stock info |
| `ReceiveNotification_ExpiryAlert` | Batch approaching expiry | Batch + product info |
| `ReceiveNotification_TransferRequest` | New transfer request | Transfer header |

---

## 15. appsettings.json Configuration

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "Cors": {
    "AllowedOrigins": [
      "http://localhost:4700",
      "http://localhost:4200"
    ]
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "AdminConnection":   "Data Source=<server>;Initial Catalog=Tag_Res_Admin;User Id=<user>;Password=<pass>;TrustServerCertificate=True",
    "ProductConnection": "Data Source=<server>;Initial Catalog=TagInv_Product;User Id=<user>;Password=<pass>;TrustServerCertificate=True"
  },
  "AppSettings": {
    "DefaultPageSize": 50,
    "MaxPageSize": 500,
    "BarcodeAutoGeneratePrefix": "479",
    "ReceiptMaxLineWidth": 48,
    "DefaultCurrency": "LKR",
    "DefaultDecimalPlaces": 2
  }
}
```

### System Settings (Managed in `SYS_Setting` table — not hardcoded)

| Setting Key | Default Value | Description |
|-------------|--------------|-------------|
| `SHOP_NAME` | My Shop | Shop display name |
| `SHOP_ADDRESS` | — | Full shop address for receipts |
| `SHOP_PHONE` | — | Contact number |
| `VAT_REG_NO` | — | VAT registration number |
| `VAT_ENABLED` | true | Enable VAT calculations |
| `VAT_RATE` | 18.00 | VAT percentage |
| `NBT_ENABLED` | false | Enable NBT |
| `NBT_RATE` | 0.00 | NBT percentage |
| `CURRENCY_CODE` | LKR | Currency code |
| `DECIMAL_PLACES` | 2 | Price decimal places |
| `FISCAL_YEAR_START` | 04-01 | MM-DD format |
| `BARCODE_DEFAULT_TYPE` | EAN-13 | Default barcode format |
| `LOYALTY_ENABLED` | true | Enable loyalty points |
| `LOYALTY_POINTS_PER_LKR` | 1.00 | Points earned per LKR spent |
| `LOYALTY_REDEMPTION_RATE` | 0.10 | LKR value per loyalty point |
| `EXPIRY_WARNING_DAYS_CRITICAL` | 30 | Critical expiry threshold (days) |
| `EXPIRY_WARNING_DAYS_WARNING` | 90 | Warning expiry threshold (days) |
| `REORDER_ALERT_ENABLED` | true | Show reorder alerts |
| `RECEIPT_FOOTER_TEXT` | Thank you! | Receipt footer |
| `RECEIPT_SHOW_TAX` | true | Show tax breakdown on receipt |
| `FP` | C:\TagInv\Files | File storage root path |
| `POS_PRICE_OVERRIDE_ALLOWED` | true | Allow cashier price override |
| `POS_PRICE_OVERRIDE_REQUIRES_SUPERVISOR` | true | Require supervisor for override |
| `INVOICE_NO_PREFIX` | INV | Invoice number prefix |
| `GRN_NO_PREFIX` | GRN | GRN number prefix |
| `TRANSFER_NO_PREFIX` | TRF | Transfer number prefix |
| `SESSION_NO_PREFIX` | SES | Session number prefix |

#### Feature Module Flags (`MOD_*` keys — stored in `SYS_Setting`)

These flags control which optional modules are active. Value: `"true"` / `"false"` (or `"1"` / `"0"`).

| Setting Key | Default | Controls |
|-------------|---------|---------|
| `MOD_BARCODE` | `false` | Barcode scanning & lookup, multi-barcode per product, barcode generation, barcode label printing |
| `MOD_BRAND` | `false` | Brand master data management (BrandService) |
| `MOD_SUPPLIER` | `false` | Supplier master data management (SupplierService) |
| `MOD_PRICING_RULES` | `false` | Promotional & tiered pricing rules (PricingRuleService) |
| `MOD_CUSTOMER` | `false` | Customer management, phone lookup (CustomerService) |
| `MOD_LOYALTY` | `false` | Loyalty points earn/redeem — requires `MOD_CUSTOMER=true` |
| `MOD_SUPPLY_CHAIN` | `false` | GRN, Purchase Orders, Stock Transfers (GRNService, StockTransferService) |
| `MOD_BATCH_EXPIRY` | `false` | Batch tracking, expiry date capture, FEFO, expiry alerts |
| `MOD_PRODUCT_ATTRIBUTES` | `false` | Dynamic custom product attributes (ProductAttributeService) |
| `MOD_MULTI_BRANCH` | `false` | Multi-branch & multi-warehouse management (BranchService, WarehouseService) |
| `MOD_RETURNS` | `false` | Invoice return/refund processing (ReturnService) |
| `MOD_REPORTS` | `true` | All reports — sales, stock, expiry, loyalty, session Z-report |

> These settings are read at runtime by `ModuleConfigService` (see §5.3.4). Changing a flag takes effect immediately on the next request — no restart required.

---

## 16. Program.cs & DI Registration

```csharp
// TagInv.API/Program.cs
using Microsoft.AspNetCore.Http.Features;
using TagInv.API.Middlewares;
using TagInv.Services;
using TagInv.Services.Reference;
using TagInv.Services.Inventory;
using TagInv.Services.Cashier;
using TagInv.Services.System;
using TagInv.API;

var builder = WebApplication.CreateBuilder(args);

// 1. Read connection strings
var _AdminConnectionString   = builder.Configuration.GetConnectionString("AdminConnection");
var _ProductConnectionString = builder.Configuration.GetConnectionString("ProductConnection");

// 2. Register all services as Transient
// Auth
builder.Services.AddTransient<TokenValidityService>(c =>
    new TokenValidityService(_AdminConnectionString, _ProductConnectionString));

// System
builder.Services.AddTransient<BranchService>(c =>
    new BranchService(_AdminConnectionString, _ProductConnectionString));
builder.Services.AddTransient<WarehouseService>(c =>
    new WarehouseService(_AdminConnectionString, _ProductConnectionString));
builder.Services.AddTransient<SettingService>(c =>
    new SettingService(_AdminConnectionString, _ProductConnectionString));
builder.Services.AddTransient<TaxConfigService>(c =>
    new TaxConfigService(_AdminConnectionString, _ProductConnectionString));

// Reference
builder.Services.AddTransient<CategoryService>(c =>
    new CategoryService(_AdminConnectionString, _ProductConnectionString));
builder.Services.AddTransient<BrandService>(c =>
    new BrandService(_AdminConnectionString, _ProductConnectionString));
builder.Services.AddTransient<SupplierService>(c =>
    new SupplierService(_AdminConnectionString, _ProductConnectionString));
builder.Services.AddTransient<UnitOfMeasureService>(c =>
    new UnitOfMeasureService(_AdminConnectionString, _ProductConnectionString));
builder.Services.AddTransient<ProductService>(c =>
    new ProductService(_AdminConnectionString, _ProductConnectionString));
builder.Services.AddTransient<ProductAttributeService>(c =>
    new ProductAttributeService(_AdminConnectionString, _ProductConnectionString));
builder.Services.AddTransient<PricingRuleService>(c =>
    new PricingRuleService(_AdminConnectionString, _ProductConnectionString));

// Inventory
builder.Services.AddTransient<GRNService>(c =>
    new GRNService(_AdminConnectionString, _ProductConnectionString));
builder.Services.AddTransient<StockService>(c =>
    new StockService(_AdminConnectionString, _ProductConnectionString));
builder.Services.AddTransient<StockTransferService>(c =>
    new StockTransferService(_AdminConnectionString, _ProductConnectionString));
builder.Services.AddTransient<StockAdjustmentService>(c =>
    new StockAdjustmentService(_AdminConnectionString, _ProductConnectionString));

// Cashier
builder.Services.AddTransient<SessionService>(c =>
    new SessionService(_AdminConnectionString, _ProductConnectionString));
builder.Services.AddTransient<InvoiceService>(c =>
    new InvoiceService(_AdminConnectionString, _ProductConnectionString));
builder.Services.AddTransient<CustomerService>(c =>
    new CustomerService(_AdminConnectionString, _ProductConnectionString));
builder.Services.AddTransient<ReturnService>(c =>
    new ReturnService(_AdminConnectionString, _ProductConnectionString));

// Reports
builder.Services.AddTransient<ReportService>(c =>
    new ReportService(_AdminConnectionString, _ProductConnectionString));

// 3. File upload size limit (50 MB)
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 52428800;
});

// 4. SignalR
builder.Services.AddSignalR();

// 5. Controllers + Newtonsoft JSON
builder.Services.AddControllers().AddNewtonsoftJson();

// 6. Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 7. CORS
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("TagInvCors", policy =>
    {
        policy.WithOrigins(allowedOrigins!)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// ── Middleware pipeline (ORDER MATTERS) ──────────────────
app.UseCors("TagInvCors");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<TokenValidity>();
app.UseAuthorization();
app.MapControllers();
app.MapHub<SignalRHub>("/signalRHub");

app.Run();
```

---

## 17. Non-Functional Requirements

### 17.1 Performance

| Metric | Target |
|--------|--------|
| Barcode lookup response | < 100ms |
| Invoice creation (full with stock deduction) | < 500ms |
| Product list page (50 items) | < 300ms |
| Stock on hand report (1000 products) | < 2 seconds |
| Concurrent POS terminals | 20+ per branch |
| Database query timeout | 30 seconds |

### 17.2 Reliability

- All POS-critical operations (invoice creation, stock deduction) are wrapped in SQL transactions
- ACID compliance for all inventory movements
- Stock deduction and invoice creation are atomic — partial failures are rolled back
- GRN approval is atomic — all stock updates succeed or none do

### 17.3 Security

| Concern | Approach |
|---------|---------|
| Authentication | X-Token header (GUID) validated per request via Admin DB |
| Authorization | Module-level via X-Token-module |
| Unauthorized response | HTTP 404 (not 401) to hide endpoint existence |
| SQL injection | 100% stored procedures via Dapper — no inline SQL |
| File upload | MIME type + extension validation; files stored outside web root |
| Sensitive data | Card numbers: only last 4 digits stored; no CVV/full PAN |
| Connection strings | Environment-specific; not committed to source control |

### 17.4 Scalability

- Stateless API — horizontal scaling via load balancer
- No server-side session state (token validated DB-side)
- Index strategy covers all common query patterns
- Pagination required for all list endpoints (default 50, max 500)
- `INV_StockBalance` maintains pre-computed balance (no on-the-fly SUM) for real-time POS speed

### 17.5 Maintainability

- Zero hardcoded business rules — all configurable via `SYS_Setting`
- All DB operations via stored procedures — schema changes localized to SPs
- Modular solution structure — each functional area in own folder
- Domain models match SP output column aliases exactly (camelCase)

### 17.6 Availability

| Target | SLA |
|--------|-----|
| Core POS operations | 99.9% uptime |
| Reporting | 99.5% uptime |
| Scheduled maintenance window | 02:00–04:00 daily |

### 17.7 Offline Capability (POS)

The frontend POS client must support offline mode:

**Strategy (frontend-owned, API-supported):**
1. On startup, POS client syncs product catalog + prices to local IndexedDB/SQLite
2. When connection is lost, invoices are queued locally with a temporary invoice number
3. On reconnection, queued invoices are submitted to API via `POST /Invoice/Insert`
4. The API assigns the final invoice number and processes stock deduction
5. Sync endpoint `GET /Product/SelectForSync?since=<timestamp>` returns only changed products

**API Support:**
- Products carry `modifiedOn` timestamp for delta sync
- Invoice submission is idempotent — a client-generated temp ref is accepted and stored, returned with server invoice number

---

## 18. Reporting & Analytics

### 18.1 Phase 1 Reports

| Report | SP | Key Filters |
|--------|----|------------|
| Sales Summary | `TAG_INV_SELECT_SalesSummary` | Date range, branch |
| Sales by Product | `TAG_INV_SELECT_SalesSummary` (result set 2) | Date range, category |
| Stock On Hand | `TAG_INV_SELECT_StockOnHand` | Warehouse, branch, category |
| Low Stock / Reorder | `TAG_INV_SELECT_StockOnHand` (LowStockOnly=1) | Warehouse, branch |
| Expiry Alerts | `TAG_INV_SELECT_ExpiryAlert` | Days threshold, warehouse |
| GRN Report | `TAG_INV_SELECT_GRNReport` | Date range, supplier, branch |
| Cashier Session Z-Report | `TAG_INV_SELECT_SessionSummary` | Session ID |
| Customer Loyalty Summary | `TAG_INV_SELECT_LoyaltySummary` | Customer, date range |

### 18.2 Report Response Format

All reports return `BaseModel.data` as an array of objects or multi-result sets via `QueryMultipleAsync`. The `ReportService` handles multi-result aggregation before returning to the controller.

---

## 19. Barcode & Label Printing

### 19.1 Barcode Generation

| Barcode Type | Format | Usage |
|-------------|--------|-------|
| EAN-13 | 13-digit GTIN | Standard retail (local GS1 prefix: 479) |
| EAN-8 | 8-digit GTIN | Small product labels |
| Code 128 | Variable length alphanumeric | Internal codes, pharmacy, wholesale |
| CODE-39 | Variable length alphanumeric | Hardware and industrial use |

Auto-generation rules (when product has no barcode):
- **EAN-13:** `479` (GS1 Sri Lanka) + 9-digit product ID + check digit
- **Code 128:** `TAG` + branch code + sequential number

### 19.2 Label Printing API

```
GET  /api/TagInv/Product/GenerateBarcode?productId=123&type=EAN-13
     → Returns: { code: "1000", data: { barcode: "4790001230012", svg: "<svg>...</svg>" } }

POST /api/TagInv/Product/PrintLabelBatch
     Body: { productIds: [1,2,3], labelTemplate: "standard", copies: 2 }
     → Returns: PDF binary (direct download, not BaseModel envelope)
```

Label templates are configurable in `SYS_Setting`:
- `LABEL_TEMPLATE_STANDARD`: template ID for standard price labels
- `LABEL_TEMPLATE_PHARMACY`: template ID for pharmacy labels (includes expiry, batch)
- `LABEL_TEMPLATE_WHOLESALE`: template ID for bulk/pallet labels

---

## 20. Offline Capability Strategy

### 20.1 POS Offline Operation Flow

```
POS Client (Browser/Desktop)
│
├─── Online Mode ────────────────────────────────────
│    • All operations sync to API immediately
│    • Product catalog served from API with caching
│    • Invoice submission is real-time
│
├─── Offline Mode (Network Lost) ────────────────────
│    • Detect connectivity loss (navigator.onLine API)
│    • Serve products from local cache (IndexedDB)
│    • Store invoices in local queue with temp prefix "OFFLINE-{uuid}"
│    • Continue billing without interruption
│
└─── Reconnection Sync ──────────────────────────────
     • Submit queued invoices to POST /Invoice/Insert
     • API processes each atomically (stock deduction)
     • Server assigns final invoice numbers
     • Client updates local state with server response
     • Handle stock-out conflicts: alert cashier, void offline invoice
```

### 20.2 Sync API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /Product/SelectForSync?since=<ISO8601>` | Delta sync of changed products |
| `GET /Reference/GetPricingRules?activeOnly=true` | Sync active pricing rules |
| `POST /Invoice/InsertBatch` | Submit multiple queued offline invoices |

---

## 21. Appendix — SP Naming Quick Reference

### Product Database (`TagInv_Product`)

| Entity | POPULATE SP | SELECT SP |
|--------|------------|----------|
| Branch | `TAG_INV_POPULATE_Branch` | `TAG_INV_SELECT_Branch` |
| Warehouse | `TAG_INV_POPULATE_Warehouse` | `TAG_INV_SELECT_Warehouse` |
| Setting | `TAG_INV_POPULATE_Setting` | `TAG_INV_SELECT_Setting` |
| TaxConfig | `TAG_INV_POPULATE_TaxConfig` | `TAG_INV_SELECT_TaxConfig` |
| Category | `TAG_INV_POPULATE_Category` | `TAG_INV_SELECT_Category` |
| Brand | `TAG_INV_POPULATE_Brand` | `TAG_INV_SELECT_Brand` |
| UnitOfMeasure | `TAG_INV_POPULATE_UnitOfMeasure` | `TAG_INV_SELECT_UnitOfMeasure` |
| Supplier | `TAG_INV_POPULATE_Supplier` | `TAG_INV_SELECT_Supplier` |
| Product | `TAG_INV_POPULATE_Product` | `TAG_INV_SELECT_Product` |
| ProductBarcode | `TAG_INV_POPULATE_ProductBarcode` | `TAG_INV_SELECT_ProductBarcode` |
| AttributeDefinition | `TAG_INV_POPULATE_AttributeDefinition` | `TAG_INV_SELECT_AttributeDefinition` |
| PricingRule | `TAG_INV_POPULATE_PricingRule` | `TAG_INV_SELECT_PricingRule` |
| GRN | `TAG_INV_POPULATE_GRN` | `TAG_INV_SELECT_GRN` |
| StockAdjustment | `TAG_INV_POPULATE_StockAdjustment` | `TAG_INV_SELECT_StockAdjustment` |
| StockTransfer | `TAG_INV_POPULATE_StockTransfer` | `TAG_INV_SELECT_StockTransfer` |
| Session | `TAG_INV_POPULATE_Session` | `TAG_INV_SELECT_Session` |
| Invoice | `TAG_INV_POPULATE_Invoice` | `TAG_INV_SELECT_Invoice` |
| Customer | `TAG_INV_POPULATE_Customer` | `TAG_INV_SELECT_Customer` |
| Return | `TAG_INV_POPULATE_Return` | `TAG_INV_SELECT_Return` |

### Report-Only SPs

| Report | SP |
|--------|---|
| Stock on hand | `TAG_INV_SELECT_StockOnHand` |
| Expiry alert | `TAG_INV_SELECT_ExpiryAlert` |
| Sales summary | `TAG_INV_SELECT_SalesSummary` |
| GRN report | `TAG_INV_SELECT_GRNReport` |
| Session Z-report | `TAG_INV_SELECT_SessionSummary` |
| Loyalty summary | `TAG_INV_SELECT_LoyaltySummary` |

### Admin Database (`Tag_Res_Admin`)

| Operation | SP |
|-----------|----|
| Token validation + log | `TAG_AD_UPDATE_ModuleLog` |
| Admin settings | `TAG_AD_SELECT_Settings` |

---

*End of PRD — TagInv Inventory Management System v1.1*  
*v1.1 change: Added §5.3 Feature Module Configuration, §5.4 Shop Profiles, and MOD_* system settings keys. All v1.0 functionality retained.*
*Generated: 2026-04-02 | Aligned with SKILL.md architecture standards*
