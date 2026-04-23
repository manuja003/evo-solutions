# EVODINE Restaurant Administration Panel
## User Manual — Menu & Setup Module Guide

> **Prepared by:** TagTeam Engineering | infotagteamengineering@gmail.com
> **Version:** 1.0 | **Date:** April 2026
> **Classification:** Client Operations Document — Confidential
> **Audience:** Restaurant Administrators, Operations Managers, IT Staff

---

## Table of Contents

**[1. Introduction](#1-introduction)**
  - 1.1 Purpose of This Manual
  - 1.2 System Overview
  - 1.3 System Workflow Overview

**[2. User Roles & Access Levels](#2-user-roles--access-levels)**
  - 2.1 Role Summary Table
  - 2.2 Detailed Role Descriptions

**[3. Menu Categories](#3-menu-categories)**
  - 3.1 Overview
  - 3.2 Adding a New Category
  - 3.3 Editing & Deleting Categories

**[4. Food Portions](#4-food-portions)**
  - 4.1 Overview
  - 4.2 Adding a New Portion
  - 4.3 Editing & Deleting Portions

**[5. Tables Management](#5-tables-management)**
  - 5.1 Overview
  - 5.2 Adding a New Table
  - 5.3 Editing & Deleting Tables

**[6. Chargers (Surcharges)](#6-chargers-surcharges)**
  - 6.1 Overview
  - 6.2 Charge Types Explained
  - 6.3 Adding a New Charger
  - 6.4 Editing & Deleting Chargers

**[7. Food Items](#7-food-items)**
  - 7.1 Overview
  - 7.2 Adding a New Food Item
  - 7.3 Assigning Portions & Prices
  - 7.4 Uploading a Food Image
  - 7.5 Editing & Deleting Food Items

**[8. Addons](#8-addons)**
  - 8.1 Overview
  - 8.2 Adding a New Addon
  - 8.3 Editing & Deleting Addons

**[9. Best Practices](#9-best-practices)**

**[10. Troubleshooting & FAQs](#10-troubleshooting--faqs)**

**[Appendix — Revision History](#appendix--revision-history)**

---

## 1. Introduction

### 1.1 Purpose of This Manual

This manual provides step-by-step operational guidance for administrators and operations staff who manage the EVODINE Restaurant Administration Panel. It covers all six core setup modules: Menu Categories, Food Portions, Tables, Chargers, Food Items, and Addons. By following this guide, staff can confidently configure the system so that the restaurant's front-of-house ordering experience runs smoothly.

### 1.2 System Overview

| Property | Details |
|---|---|
| **System Name** | EVODINE Restaurant Administration Panel |
| **Developed By** | TagTeam Engineering |
| **Technology Platform** | Angular 17 — Standalone Components |
| **Access Method** | Web browser (desktop & mobile responsive) |
| **Authentication** | SSO token-based login via the EVODINE platform |
| **Primary Purpose** | Centralised menu setup, table management, and billing configuration |
| **Modules Covered** | Categories, Food Portions, Tables, Chargers, Food Items, Addons |

### 1.3 System Workflow Overview

The diagram below shows how the setup modules relate to each other and to the customer ordering experience. The supporting modules must be configured before Food Items and Addons can be created.

```
┌──────────────────────────────────────────┐
│   🔐 Administrator Logs In via EVODINE   │
│              SSO Portal                  │
└───────────────────┬──────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────┐
│      ⚙️ Configure Supporting Data        │
│  Categories · Portions · Tables          │
│  Chargers                                │
└───────────────────┬──────────────────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
         ▼                     ▼
┌────────────────┐   ┌─────────────────────┐
│ 🍽️ Create      │   │  ➕ Create Addons    │
│  Food Items    │   │  (extras with unit   │
│  (with image   │   │   price & category)  │
│   & portions)  │   └──────────┬──────────┘
└───────┬────────┘              │
        └──────────┬────────────┘
                   │
                   ▼
┌──────────────────────────────────────────┐
│   ✅ Menu Ready for Customer Orders      │
│          and Billing                     │
└──────────────────────────────────────────┘
```

> **NOTE:** Categories and Food Portions must be set up **before** you can create Food Items. The system will not allow saving a food item without a category and at least one portion assigned.

---

## 2. User Roles & Access Levels

### 2.1 Role Summary Table

| Role | Categories | Portions | Tables | Chargers | Food Items | Addons |
|---|---|---|---|---|---|---|
| **Super Admin** | Full Access | Full Access | Full Access | Full Access | Full Access | Full Access |
| **Restaurant Admin** | Full Access | Full Access | Full Access | Full Access | Full Access | Full Access |
| **Menu Manager** | View & Edit | View & Edit | View Only | View Only | Full Access | Full Access |
| **Operations Staff** | View Only | View Only | View Only | View Only | View Only | View Only |

> **NOTE:** The ability to manually edit the system-generated **Code** field for each record is controlled separately by a per-module setting, enabled or disabled by the Super Admin.

### 2.2 Detailed Role Descriptions

---

**👑 Super Admin**
- Unrestricted access to all modules and system settings
- Can enable or disable the code-edit feature for each module
- Manages user accounts and role assignments
- Responsible for initial system configuration and ongoing maintenance

---

**🛠️ Restaurant Admin**
- Full create, read, update, and delete access to all six setup modules
- Manages daily menu configuration, table setup, and surcharge rules
- Can upload and update food item and addon images
- Receives toast notifications confirming successful operations

---

**📋 Menu Manager**
- Can create, edit, and delete Categories, Portions, Food Items, and Addons
- Read-only access to Tables and Chargers
- Cannot modify surcharge rules or table capacity settings

---

**👁️ Operations Staff**
- Read-only access to all setup modules for reference purposes
- Cannot add, edit, or delete any records
- Typically includes front-of-house supervisors reviewing menu data

---

## 3. Menu Categories

### 3.1 Overview

**Navigation:** Sidebar Menu → Menu Setup → Categories | **Users:** Restaurant Admin, Menu Manager

Menu Categories are the top-level groupings that organise your food items on the customer-facing ordering screen. Every food item must belong to a category, and every category must be linked to an order placement type (such as Dine In or Takeaway). Setting up categories is the first step before any food items can be created.

### 3.2 Adding a New Category

```
Step 1: Navigate to Menu Categories
         └─ From the left sidebar, expand Menu Setup and click Categories.

Step 2: Enter the Category Name
         └─ In the Description field, type the category name
            (e.g., "Starters", "Main Course", "Beverages"). Required.

Step 3: Select the Order Placement Type
         └─ From the Order Place Type dropdown, choose the service mode
            (Dine In, Takeaway, etc.). Required.

Step 4: Review the Code (optional)
         └─ System auto-generates the code. Edit only if the administrator
            has enabled code modification for this module.

Step 5: Click Save
         └─ A success notification confirms the save and displays
            the new category code. The list refreshes automatically.
```

**Form Field Reference**

| Field | Type | Required | Description |
|---|---|---|---|
| **Code** | Text | Auto | System-generated unique identifier. Editable only if enabled. |
| **Description** | Text | ✅ Required | The display name for the category (e.g., "Main Course"). |
| **Order Place Type** | Dropdown | ✅ Required | Links the category to a service mode such as Dine In or Takeaway. |

> **Screenshot Placeholder — Menu Categories: Add New Category Form**
> `[ Insert screenshot showing Description field, Order Place Type dropdown, and Save button ]`

### 3.3 Editing & Deleting Categories

**To Edit:**
1. Locate the category in the list (use the **Search** box to filter)
2. Click the edit icon — the form populates with existing values
3. Modify the fields and click **Update**

**To Delete:**
1. Click the delete icon next to the category
2. A dialog asks: *"Do you want to delete this category?"*
3. Click **Yes** to confirm or **No** to cancel

> **⚠️ IMPORTANT:** Deleting a category that has food items linked to it may affect those items on the ordering screen. Always reassign or delete linked food items before removing a category.

> **Screenshot Placeholder — Menu Categories: Categories List with Search Filter**
> `[ Insert screenshot of the data grid with Code, Description, Order Place Type columns and Edit/Delete buttons ]`

---

## 4. Food Portions

### 4.1 Overview

**Navigation:** Sidebar Menu → Menu Setup → Food Portions | **Users:** Restaurant Admin, Menu Manager

Food Portions define the size variants assigned to food items — for example, Small, Regular, Large, Half, or Full. Each food item must have at least one portion with a corresponding price. Portions are created here first and selected during food item setup.

> **NOTE:** The **Display Name** controls the label shown to customers (e.g., "Sm", "Lg"). The **Description** is the full internal name used by staff.

### 4.2 Adding a New Portion

```
Step 1: Navigate to Food Portions
         └─ Expand Menu Setup in the sidebar and click Food Portions.

Step 2: Enter the Portion Description
         └─ Type the full internal name (e.g., "Large Portion"). Required.

Step 3: Enter the Display Name
         └─ Type the short customer-facing label (e.g., "Lg"). Required.

Step 4: Review the Code (optional)
         └─ Auto-assigned by the system. Edit only if permitted.

Step 5: Click Save
         └─ A notification confirms the save with the new code.
            The list below the form refreshes automatically.
```

**Form Field Reference**

| Field | Type | Required | Description |
|---|---|---|---|
| **Code** | Text | Auto | Unique identifier, auto-generated. |
| **Description** | Text | ✅ Required | Full internal name for the portion size (e.g., "Large Portion"). |
| **Display Name** | Text | ✅ Required | Short label shown on the ordering screen (e.g., "Lg"). |

> **Screenshot Placeholder — Food Portions: Add New Portion Form**
> `[ Insert screenshot of Description and Display Name fields with Save button ]`

### 4.3 Editing & Deleting Portions

1. Find the portion using the **Search** box or by scrolling the list
2. Click the edit icon to load the record into the form above
3. Make changes and click **Update**, or click the delete icon and confirm

> **⚠️ WARNING:** Deleting a portion already assigned to food items may affect those items' pricing. Review all linked food items before deleting a portion.

> **Screenshot Placeholder — Food Portions: Portions List Grid**
> `[ Insert screenshot showing Code, Description, Display Name columns with action buttons ]`

---

## 5. Tables Management

### 5.1 Overview

**Navigation:** Sidebar Menu → Dining Setup → Tables | **Users:** Restaurant Admin

The Tables module allows administrators to register all physical dining tables. Each entry includes a name and seating capacity. This data is used by the ordering system to assign orders to specific tables and manage dine-in seating efficiently.

### 5.2 Adding a New Table

```
Step 1: Navigate to Tables
         └─ From the sidebar, click Tables under Dining Setup.

Step 2: Enter the Table Name
         └─ Type a recognisable name (e.g., "Table 01", "Window Booth",
            "VIP Room"). Required.

Step 3: Enter the Head Count
         └─ Enter the maximum number of guests this table can seat.
            Must be a number. Required.

Step 4: Review the Code (optional)
         └─ Auto-assigned. Edit only if enabled by the administrator.

Step 5: Click Save
         └─ The table is saved and the new code appears in the
            success notification. The list refreshes.
```

**Form Field Reference**

| Field | Type | Required | Description |
|---|---|---|---|
| **Code** | Text | Auto | Unique table identifier, auto-generated. |
| **Table Name** | Text | ✅ Required | A recognisable name as it appears in the ordering system. |
| **Head Count** | Number | ✅ Required | Maximum number of guests the table can accommodate. |

> **Screenshot Placeholder — Tables: Add New Table Form**
> `[ Insert screenshot of Table Name and Head Count fields with Save button ]`

### 5.3 Editing & Deleting Tables

1. Use the search box or scroll the list to find the table
2. Click the edit icon to load the record, modify fields, then click **Update**
3. Click the delete icon and confirm in the dialog to remove the table

> **⚠️ WARNING:** Do not delete a table with open or in-progress orders assigned to it. Complete or reassign all active orders before removing a table.

> **Screenshot Placeholder — Tables: Tables List Grid**
> `[ Insert screenshot showing Code, Table Name, Head Count columns with Edit/Delete buttons ]`

---

## 6. Chargers (Surcharges)

### 6.1 Overview

**Navigation:** Sidebar Menu → Billing Setup → Chargers | **Users:** Restaurant Admin, Super Admin

Chargers are additional fees applied to customer bills — such as a service charge, delivery fee, or a government levy. Each charger can be a fixed amount or a percentage of the bill total. They are configured here and applied automatically when orders are processed.

### 6.2 Charge Types Explained

```
┌─────────────────────────────┐     ┌─────────────────────────────┐
│      FIXED AMOUNT           │     │        PERCENTAGE           │
│                             │     │                             │
│  A flat fee added to every  │     │  A % of the bill subtotal   │
│  bill regardless of total.  │────▶│  applied to each bill.      │
│  e.g., $2.00 delivery fee   │     │  Value must be 0–100.       │
│                             │     │  e.g., 10% service charge   │
└─────────────────────────────┘     └─────────────────────────────┘
```

| Charge Type | Selection Value | Allowed Range | Example |
|---|---|---|---|
| **Fixed Amount** | Amount | Any positive number | 2.50 → adds $2.50 to every bill |
| **Percentage** | Percentage | 0 to 100 (inclusive) | 10 → adds 10% of the bill subtotal |

### 6.3 Adding a New Charger

```
Step 1: Navigate to Chargers
         └─ From the sidebar, click Chargers under Billing Setup.

Step 2: Enter the Charger Name
         └─ Enter a short reference name (e.g., "SVC", "DEL"). Required.

Step 3: Enter the Description
         └─ Provide a clear explanation (e.g., "10% Service Charge on
            all dine-in orders"). Required.

Step 4: Select the Charge Type
         └─ Choose Amount for a flat fee or Percentage for proportional.
            Note: changing the type clears the value field.

Step 5: Enter the Amount or Percentage Value
         └─ Type the fee value. Maximum is 100 for Percentage type. Required.

Step 6: Click Save
         └─ The charger is saved. The list refreshes and the new
            code is shown in the success notification.
```

**Form Field Reference**

| Field | Type | Required | Description |
|---|---|---|---|
| **Code** | Text | Auto | Unique identifier, auto-generated. |
| **Name** | Text | ✅ Required | Short reference name (e.g., "SVC"). |
| **Description** | Text | ✅ Required | Full description of the charge as it may appear on receipts. |
| **Charge Type** | Dropdown | ✅ Required | Amount (fixed flat fee) or Percentage (proportional). |
| **Amount / Percentage** | Number | ✅ Required | The fee value. Must be 0–100 when Percentage is selected. |

> **⚠️ WARNING:** When you change the Charge Type, the value field is cleared automatically. Always re-enter the correct value after switching types.

### 6.4 Editing & Deleting Chargers

1. Use the search box to filter the list by name, description, or code
2. Click the edit icon to load the charger into the form, modify, then click **Update**
3. Click the delete icon and confirm to remove the charger

> **Screenshot Placeholder — Chargers: Chargers List and Form**
> `[ Insert screenshot showing the charger form with Charge Type selection and the list grid ]`

---

## 7. Food Items

### 7.1 Overview

**Navigation:** Sidebar Menu → Menu Setup → Food Items | **Users:** Restaurant Admin, Menu Manager

The Food Items module is the core of the menu setup. Each food item represents a dish or drink on the menu. A food item must be linked to a category and must have at least one portion with a unit price before it can be saved. Optional features include an image upload and a Combo flag for set meals.

**Screen Tabs:**

| Tab | Purpose |
|---|---|
| **Food Items List** | Displays all existing food items in a searchable grid. Automatically shown when items exist. |
| **Add / Edit Food Item** | Entry form for creating or editing a food item. Automatically shown when no items exist yet. |

### 7.2 Adding a New Food Item

```
Step 1: Navigate to Food Items
         └─ From the sidebar, click Food Items. Switch to the
            Add Food Item tab if the list is displayed.

Step 2: Enter the Item Name
         └─ Type the dish name as it appears on the menu
            (e.g., "Grilled Chicken Burger"). Required.

Step 3: Enter the Description
         └─ Provide a customer-facing description of the item. Required.

Step 4: Select a Category
         └─ Choose the menu category from the dropdown. Required.

Step 5: Mark as Combo (optional)
         └─ Tick the Is Combo checkbox if this is a set meal offer.

Step 6: Assign at Least One Portion with a Price
         └─ See Section 7.3. This step is mandatory — saving fails
            without at least one portion assigned.

Step 7: Upload an Image (optional)
         └─ See Section 7.4 for image upload instructions.

Step 8: Click Save
         └─ The system saves the item with its portions and image.
            The success notification shows the new item code.
```

**Form Field Reference**

| Field | Type | Required | Description |
|---|---|---|---|
| **Code** | Text | Auto | System-generated item code. Editable only if enabled. |
| **Name** | Text | ✅ Required | The menu-facing name of the food item. |
| **Description** | Text | ✅ Required | A customer-friendly description of the dish. |
| **Category** | Dropdown | ✅ Required | The menu category this item belongs to. |
| **Is Combo** | Checkbox | Optional | Tick to mark this item as a combo or set meal. |
| **Portions** | Selection Panel | ✅ Required | At least one portion must be assigned with a price > 0. |
| **Image** | File Upload | Optional | A photo of the dish. Image files only (JPG, PNG, etc.). |

### 7.3 Assigning Portions & Prices

```
Step 1: Find a Portion
         └─ Scroll the available portions list or type in the
            Search Portions box to filter by name.

Step 2: Click to Select a Portion
         └─ Click a portion that is not yet added. A pricing popup appears.

Step 3: Enter the Unit Price
         └─ Type the price for this portion (e.g., 4.50 for Small).
            Price must be greater than zero.

Step 4: Click Add
         └─ The portion is added to the assigned list with the entered price.
            It is now marked as selected and cannot be re-added.

Step 5: Repeat for Additional Portions
         └─ Add as many portions as required. Each can only appear once.

Step 6: Remove a Portion (if needed)
         └─ Click the remove button next to the portion. Confirm in the
            dialog. The portion returns to the available list.
```

> **⚠️ IMPORTANT:** You must assign at least one portion with a price greater than zero. Clicking **Save** without any portions shows the error: *"Select one of portion with price"* and the item will not be saved.

> **Screenshot Placeholder — Food Items: Portion Assignment Panel & Price Popup**
> `[ Insert screenshot of available portions on the left, assigned portions on the right, and unit price popup ]`

### 7.4 Uploading a Food Image

```
Step 1: Click the Image Upload Area
         └─ A placeholder image is shown. Click it or the upload
            button to open the file browser.

Step 2: Select an Image File
         └─ Choose any JPG, PNG, GIF, or other image file.
            Non-image files are automatically rejected.

Step 3: Review the Preview
         └─ The selected image appears immediately in the preview area.

Step 4: Clear the Image (optional)
         └─ Click Clear Image to restore the placeholder image.
```

> **NOTE:** When editing an existing food item, the system automatically loads and displays the previously saved image. Upload a new file only if you want to replace it.

> **Screenshot Placeholder — Food Items: Image Upload & Preview**
> `[ Insert screenshot showing image preview box, upload button, and Clear Image option ]`

### 7.5 Editing & Deleting Food Items

**To Edit:**
1. Go to the **Food Items List** tab and locate the item (use the search box)
2. Click the edit icon — the form switches to the Add/Edit tab, pre-populated with all data
3. Modify fields, portions, or image as needed, then click **Update**

**To Delete:**
- From the **Food Items List** tab: click the delete icon on the item's row
- From the **Edit form**: click the **Delete** button at the bottom of the form
- Both methods show a confirmation dialog before proceeding

> **Screenshot Placeholder — Food Items: List Tab with Edit & Delete Actions**
> `[ Insert screenshot of the food items grid showing image thumbnails, name, category, and action buttons ]`

---

## 8. Addons

### 8.1 Overview

**Navigation:** Sidebar Menu → Menu Setup → Addons | **Users:** Restaurant Admin, Menu Manager

Addons are optional extras customers can add to their orders — such as extra sauces, toppings, or premium ingredients. Each addon has a fixed unit price and belongs to a menu category. Unlike food items, addons do not use portions; they are sold as individual units at a single price.

**Screen Tabs:**

| Tab | Purpose |
|---|---|
| **Addons List** | Displays all existing addons in a searchable grid. |
| **Add / Edit Addon** | Entry form for creating or editing an addon. |

### 8.2 Adding a New Addon

```
Step 1: Navigate to Addons
         └─ From the sidebar, click Addons. Switch to the Add Addon
            tab if the list is displayed.

Step 2: Enter the Addon Name
         └─ Type the name as it appears to customers
            (e.g., "Extra Cheese", "Garlic Sauce"). Required.

Step 3: Enter the Description
         └─ Provide a brief customer-facing description. Required.

Step 4: Enter the Unit Price
         └─ Enter the price for one unit of this addon (e.g., 0.50). Required.

Step 5: Select a Category
         └─ Choose the menu category from the dropdown. Required.

Step 6: Upload an Image (optional)
         └─ Click the image area to browse and select a photo.
            Only image files are accepted.

Step 7: Click Save
         └─ The addon is saved. The success notification shows
            the new addon code. The list refreshes.
```

**Form Field Reference**

| Field | Type | Required | Description |
|---|---|---|---|
| **Code** | Text | Auto | System-generated unique identifier. |
| **Name** | Text | ✅ Required | The customer-facing name of the addon item. |
| **Description** | Text | ✅ Required | A brief description for customer display. |
| **Unit Price** | Decimal | ✅ Required | The price charged for one unit of this addon. |
| **Category** | Dropdown | ✅ Required | The menu category this addon is grouped under. |
| **Image** | File Upload | Optional | A photo of the addon. Image files only. |

> **Screenshot Placeholder — Addons: Add New Addon Form**
> `[ Insert screenshot showing Name, Unit Price, Category fields and image upload area ]`

### 8.3 Editing & Deleting Addons

1. Go to the **Addons List** tab — the grid shows image thumbnail, code, name, category, unit price, and action buttons
2. Click the edit icon to load the addon into the form (image loads automatically)
3. Make changes and click **Update**; click the delete icon and confirm to remove

> **✅ KEY RULE:** When editing an addon, the system automatically loads the previously saved image. Only upload a new file if you want to replace it.

> **Screenshot Placeholder — Addons: Addons List Grid**
> `[ Insert screenshot of the data grid showing image thumbnails, name, category, unit price, and action buttons ]`

---

## 9. Best Practices

### For Restaurant Administrators

| Area | Best Practice | Reason |
|---|---|---|
| **Setup Order** | Set up Categories and Portions before creating Food Items | Food Items cannot be saved without a category and at least one portion |
| **Category Naming** | Use clear, customer-friendly names ("Starters" not "CAT01") | Category names may appear on customer-facing screens |
| **Portion Display Names** | Keep Display Names short (2–4 characters, e.g., "Sm", "Lg") | Long names can overflow on small customer device screens |
| **Food Images** | Use consistent dimensions (e.g., 400×400 px square) for all items and addons | Inconsistent sizes create an uneven appearance on the customer menu |
| **Charger Configuration** | Double-check the charge type before saving | Selecting Percentage when Amount is intended can severely overcharge customers |
| **Code Field** | Leave the Code field to auto-generate unless you have a specific system | Manual codes can conflict with system codes or break sorting |

### For Menu Managers

| Area | Best Practice | Reason |
|---|---|---|
| **Combo Items** | Always tick "Is Combo" for set-meal items | The Combo flag helps the ordering system apply correct pricing rules |
| **Portion Pricing** | Verify each portion price before clicking Save | Incorrect prices affect every order placed for that item |
| **Addon Pricing** | Match addon unit prices to current supplier costs | Outdated prices lead to billing discrepancies |
| **Image Quality** | Use high-resolution images (minimum 72 dpi for screen display) | Blurry images reduce customer confidence in the menu |
| **Seasonal Items** | Delete or re-categorise items no longer available | Unavailable items on the menu cause confusion and failed orders |

### For IT Staff & System Administrators

| Area | Best Practice | Reason |
|---|---|---|
| **Code Edit Setting** | Keep "Allow Code Modification" disabled unless there is a specific need | Accidental code changes can break record linkages across modules |
| **Session Management** | Log out using the power button when leaving the system unattended | Leaving sessions open on shared computers is a security risk |
| **Browser Compatibility** | Use Google Chrome or Microsoft Edge | The system is optimised for modern Chromium-based browsers |
| **Environment Config** | Verify the active environment collection before making changes | Editing in Test environment has no effect on live production data |

---

## 10. Troubleshooting & FAQs

### Common Issues — Categories & Portions

| Symptom | Likely Cause | Resolution |
|---|---|---|
| Cannot save a new category — form shows red validation errors | One or more required fields are empty | Ensure both Description and Order Place Type are filled before clicking Save |
| Order Place Type dropdown is empty | No order placement types configured in the system | Contact your system administrator to configure the available types first |
| Code field is greyed out and cannot be edited | Code editing is disabled for this module by the administrator | This is by design. Ask the Super Admin to enable code editing if needed |
| A deleted category still appears in food item dropdowns | The browser is showing cached data | Press F5 to refresh the page — the dropdown will reload from the server |

### Common Issues — Food Items

| Symptom | Likely Cause | Resolution |
|---|---|---|
| Error: "Select one of portion with price" when clicking Save | No portion has been assigned to the food item | Add at least one portion and enter a price greater than zero |
| Image upload fails or shows an error | The selected file is not an image (e.g., a PDF was chosen) | Select only image files (JPG, PNG, GIF, WEBP). Non-image files are rejected |
| A portion appears greyed out in the available list | That portion is already assigned to this food item | Remove it first if the price needs updating, then re-add with the correct price |
| Category dropdown shows no options | No categories created yet, or categories failed to load | Navigate to Menu Categories, create at least one category, then return |
| Saved food item not appearing on the ordering screen | The item may be in the wrong category for the active service mode | Check the category's Order Place Type to ensure it matches the current service mode |

### Common Issues — Chargers

| Symptom | Likely Cause | Resolution |
|---|---|---|
| Percentage value above 100 is not accepted | System enforces a maximum of 100% for percentage-type chargers | Enter a value between 0 and 100. Use Amount type if a flat fee above 100 is needed |
| Amount/Percentage field resets when changing Charge Type | Intentional system behaviour to prevent carrying over incorrect values | Re-enter the correct value after switching the charge type |
| Charger saved but not appearing on customer bills | The charger may not be activated or linked to the applicable order type | Contact your system administrator to verify charger activation settings |

### Frequently Asked Questions

---

**Q: Can I assign the same portion (e.g., "Large") to multiple food items at different prices?**

Yes. Each food item maintains its own portion-price relationship. You can assign the "Large" portion to a burger at $8.50 and to a pizza at $12.00 — each price is stored independently.

---

**Q: What happens to historical orders if I delete a food item?**

Historical order records are preserved regardless of whether the food item is deleted. The item will no longer appear on the live menu for new orders, but past order data is not affected.

---

**Q: Can I upload multiple images per food item or addon?**

No. Each item supports a single image. To change the image, upload a new file while editing — the new image replaces the previous one.

---

**Q: Is there a file size limit for image uploads?**

Yes. The maximum upload size is configured by the system administrator in the application settings. If an upload fails silently, contact IT to check the configured file size limit.

---

**Q: Can I rename a category after food items are already linked to it?**

Yes. Editing a category's description only changes the display name. All linked food items remain linked and are not affected by the name change.

---

**Q: Why does the system show "Successfully inserted. Code is ..." after saving?**

This confirms the save was successful and shows the auto-generated unique code for the new record. This code is useful for referencing the record in reports or when contacting support.

---

## Appendix — Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | April 2026 | TagTeam Engineering | Initial release — covers Categories, Food Portions, Tables, Chargers, Food Items, and Addons modules |
| | | | |
| | | | |

---

*EVODINE Restaurant Administration Panel — User Manual v1.0*
*Prepared by TagTeam Engineering | infotagteamengineering@gmail.com | April 2026*
*Client Operations Document — Confidential*
