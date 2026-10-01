# Sigma Medex — B2B & B2C Pharmaceutical E-Commerce Platform

A production-ready pharmaceutical wholesale and distribution web platform built with **React 19**, **Tailwind CSS v4**, **SQLite3**, and **Express**. Inspired by top Indian pharmaceutical exporters and distributors like *Sigmamedex.com*, this platform provides dual-tier commerce for wholesale institutions (pharmacies, clinics, hospitals) and retail buyers.

---

## 🚀 Key Features

### 🛒 1. Dual B2B & B2C Commerce
- **Tiered MOQ & Bulk Discounts**: Wholesale rates automatically apply when order quantity meets or exceeds Minimum Order Quantity (MOQ).
- **Interactive Cart Drawer**: Real-time pharmaceutical subtotal calculation, 12% GST tax computation, free wholesale cold-chain delivery indicator, and instant fallback for all product thumbnails.
- **B2B Bulk Quotation Inquiries**: Dedicated RFQ workflow for bulk hospital supply with direct WhatsApp integration.

### 🛡️ 2. Regulatory Compliance & Prescription (Rx) Verification
- **Doctor's Prescription Upload**: Visual file uploader for JPG, PNG, and PDF doctor prescriptions with instant verification badge.
- **Strict Schedule-H & Schedule-X Guard**: Requires prescription attachment before proceeding with checkout for Rx-controlled medications.
- **Compliance Top Bar**: WHO-GMP verification badges and GST Number display (`27AEPFS7579K1ZW`).

### 📦 3. Order Management & GST Tax Invoicing
- **Multi-Step Checkout**: Full shipping and billing address capture, GSTIN validation, and payment selection (UPI / Net Banking / NEFT / COD).
- **Official Printable GST Tax Invoices**: Formats clean, printable medical invoices with breakdown of CGST, SGST, Batch numbers, and manufacturer data.
- **Live Order Tracking**: Visual progress bar tracking order stages: *Confirmed* ➔ *Dispatched (In Transit)* ➔ *Delivered*.

### 📊 4. Executive Dark SaaS Admin Dashboard
- **Instant Orders & Invoices Focus**: The dashboard defaults to the Orders & Invoices tab front-and-center, displaying customer info, order items, invoice totals, and live status toggle buttons (*Confirmed*, *Dispatched*, *Delivered*).
- **Product Inventory Management (Full CRUD)**:
  - Add new medicines with chemical salt name, MOQ, packaging, stock, price, and wholesale tier.
  - Edit existing medicines in real time.
  - Delete SKUs with auto-sync to SQLite database.
- **Wholesale Leads & RFQs Manager**: Review inquiries submitted by clinics and hospitals, change lead status (*New*, *In Progress*, *Fulfilled*), and initiate 1-click WhatsApp quotes.
- **Pharmacist Rx Audit Desk**: Review uploaded patient prescriptions and mark them as *Verified* or *Rejected*.

### ⚡ 5. High-Performance SQLite Backend
- **Native SQLite Persistence**: Powered by `better-sqlite3` in WAL (Write-Ahead Logging) mode at `server/pharma.db`.
- **RESTful Endpoints**: Full CRUD endpoints for `/api/products`, `/api/orders`, `/api/inquiries`, `/api/prescriptions`, and `/api/health`.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 (Hooks, Context API, Lucide Icons) |
| **Bundler & Tooling** | Vite 8.3 |
| **Styling** | Tailwind CSS v4 with custom responsive grids |
| **Database** | SQLite3 (`better-sqlite3` with WAL mode) |
| **Backend Server** | Node.js + Express (`server/server.js`) |
| **Process Management** | `concurrently` (runs Vite + Express concurrently) |

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone git@github.com:BhupendraBalapure/Sigma_Medex.git
cd Sigma_Medex
npm install
```

### 2. Development Mode
Run both the SQLite Express backend and Vite frontend with a single command:
```bash
npm run dev
```
- **Storefront**: `http://localhost:5173/` (or `http://localhost:5174/`)
- **Backend API**: `http://localhost:5000/api/health`

### 3. Production Build
```bash
npm run build
```

---

## 👥 Demo Accounts

| Role | Email | Password | Access |
|---|---|---|---|
| **Admin** | `admin@sigmamedex.com` | `admin123` | Full Dashboard & Inventory Controls |
| **Buyer / Chemist** | `rajesh@apollohealth.com` | `buyer123` | Storefront, Cart & Orders |

*You can also switch roles instantly using the **Quick Role Test** buttons in the top navbar.*

---

## 📄 License
This project is licensed under the MIT License.
