![Status](https://img.shields.io/badge/🚧_Current proyect in  Proggress-orange?style=for-the-badge)

# 🏪 Tienda Frontend — POS & Invoicing System

> A modern **Point of Sale (POS)** and **Invoicing** web application built with **Angular 21** and **TailwindCSS 4**. Designed for retail stores in Ecuador, featuring role-based access control (Admin / Employee), real-time inventory management, and a streamlined checkout experience.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features — Current](#features--current)
  - [Authentication](#authentication)
  - [Admin Dashboard](#admin-dashboard)
  - [Employee Dashboard](#employee-dashboard)
  - [Sidebar & Navigation](#sidebar--navigation)
- [Features — Roadmap](#features--roadmap)
  - [SRI Electronic Invoicing](#sri-electronic-invoicing)
  - [Email Invoice Delivery](#email-invoice-delivery)
  - [Additional Planned Features](#additional-planned-features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Environment Configuration](#environment-configuration)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Tienda Frontend** is the client-side application for a comprehensive retail management system. It communicates with a **Spring Boot** backend (`http://localhost:8080/api`) and provides two distinct user experiences based on roles:

| Role       | Access Level                                         |
| ---------- | ---------------------------------------------------- |
| **ADMIN**  | Full system management: inventory, users, reports    |
| **EMPLEADO** | Point of Sale operations, sales history, lookups  |

The application uses **JWT-based authentication** with a functional HTTP interceptor that automatically attaches Bearer tokens to all API requests.

---

## Tech Stack

| Technology         | Version  | Purpose                              |
| ------------------ | -------- | ------------------------------------ |
| Angular            | 21.2.0   | Core framework (standalone components) |
| TailwindCSS        | 4.2.4    | Utility-first CSS styling            |
| TypeScript         | 5.9.2    | Type-safe development                |
| RxJS               | 7.8.x    | Reactive state & HTTP management     |
| Vitest             | 4.0.8    | Unit testing framework               |
| PostCSS            | 8.5.x    | CSS processing pipeline              |
| Prettier           | 3.8.1    | Code formatting                      |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      App (Root)                         │
│                     <router-outlet>                     │
├─────────────┬───────────────────────────────────────────┤
│   Login     │            Dashboard                      │
│  (public)   │  ┌──────────┬────────────────────────┐    │
│             │  │ Sidebar  │    <router-outlet>     │    │
│             │  │ (fixed)  │                        │    │
│             │  │          │  Admin Views:          │    │
│             │  │ • Logo   │  • Dashboard Site      │    │
│             │  │ • User   │  • Inventory           │    │
│             │  │   Card   │  • Users               │    │
│             │  │ • Menu   │  • Reports             │    │
│             │  │   Items  │                        │    │
│             │  │ • Logout │  Employee Views:       │    │
│             │  │          │  • POS                 │    │
│             │  │          │  • Lookups             │    │
│             │  │          │  • My Sales            │    │
│             │  └──────────┴────────────────────────┘    │
└─────────────┴───────────────────────────────────────────┘
```

The app follows a **layout + nested routing** pattern: the `Dashboard` component acts as a shell with a persistent `Sidebar` and a `<router-outlet>` that renders child views based on the current route.

---

## Features — Current

### Authentication

- **JWT Login** — Secure authentication against the Spring Boot backend.
- **Token Persistence** — JWT token, username, and role stored in `localStorage`.
- **Automatic Token Injection** — A functional `HttpInterceptorFn` (`jwtInterceptor`) attaches the `Authorization: Bearer <token>` header to every outgoing request (except `/api/login`).
- **Role-Based Redirect** — After login, users are routed to their corresponding dashboard:
  - `ADMIN` → `/dashboard/admin`
  - `EMPLEADO` → `/dashboard/pos`
- **Wildcard Route Guard** — Any unknown route redirects to `/login`.

<!-- TODO: Add route guards (CanActivate) for protected routes -->
<!-- TODO: Add token expiration handling and auto-logout -->

---

### Admin Dashboard

#### Dashboard Site (`/dashboard/admin`)
<!-- TODO: Add detailed description once the admin overview panel is implemented -->
- Main landing page for administrators.
- *Currently a placeholder — will include KPI cards, charts, and quick-action panels.*

#### Inventory Management (`/dashboard/inventario`)
- **Product List** (`inventario-list`) — Displays all products from the database in a structured view.
- **Product Form** (`inventario-form`) — Create and edit products with the following fields:

| Field           | Type     | Description                       |
| --------------- | -------- | --------------------------------- |
| `nombre`        | string   | Product name                      |
| `descripcion`   | string   | Product description               |
| `precioCompra`  | number   | Purchase/cost price               |
| `precioVenta`   | number   | Selling price                     |
| `stock`         | number   | Current stock quantity             |
| `categoria`     | string   | Product category                  |
| `codigoBarras`  | string   | Barcode identifier                |
| `activo`        | boolean  | Whether the product is active     |

<!-- TODO: Add barcode scanner integration details -->
<!-- TODO: Add product image upload feature -->
<!-- TODO: Add stock alert thresholds -->

#### User Management (`/dashboard/usuarios`)
- Full CRUD operations for system users.
- Supports two roles: `ADMIN` and `EMPLEADO`.
- Managed through the `UsuariosService` (GET, POST, PUT, DELETE).

<!-- TODO: Add detailed description of the user management UI -->
<!-- TODO: Add password reset functionality -->

#### Reports (`/dashboard/reportes`)
<!-- TODO: Add detailed description once the reports module is implemented -->
- *Currently a placeholder — will include sales reports, inventory reports, and financial summaries.*

---

### Employee Dashboard

#### Point of Sale — POS (`/dashboard/pos`)
<!-- TODO: Add detailed description once the POS interface is fully implemented -->
- *The core checkout interface for cashiers/employees.*
- *Will include product search, cart management, payment processing, and receipt generation.*

#### Lookups (`/dashboard/consultas`)
<!-- TODO: Add detailed description once the lookups module is implemented -->
- *Product and price lookup tool for employees.*

#### My Sales (`/dashboard/mis-ventas`)
<!-- TODO: Add detailed description once the sales history module is implemented -->
- *Personal sales history for each employee.*

---

### Sidebar & Navigation

The sidebar is a modular, fixed-position component composed of four reusable sub-components:

| Sub-Component     | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `sidebar-logo`    | Displays the application logo/brand                      |
| `user-card`       | Shows the currently logged-in user's name and role       |
| `sidebar-item`    | Dynamic navigation menu items (role-aware)               |
| `logout-button`   | Clears the session and redirects to login                |

<!-- TODO: Add collapsible sidebar toggle for mobile responsiveness -->

---

## Features — Roadmap

### SRI Electronic Invoicing
> Integration with Ecuador's **Servicio de Rentas Internas (SRI)** for legally compliant electronic invoicing.

| Feature                          | Status       | Description |
| -------------------------------- | ------------ | ----------- |
| SRI XML document generation      | 🔲 Planned   | Generate XML invoices following SRI's official schema (Factura v2.1.0) |
| Digital signature (`.p12`)       | 🔲 Planned   | Sign electronic documents with the business's digital certificate |
| SRI Web Service integration      | 🔲 Planned   | Submit signed documents to SRI's `RecepcionComprobantesOffline` and `AutorizacionComprobantes` endpoints |
| RIDE PDF generation              | 🔲 Planned   | Generate the printable "Representación Impresa del Documento Electrónico" |
| Sequential numbering             | 🔲 Planned   | Automatic invoice numbering per establishment and emission point |
| SRI environment toggle           | 🔲 Planned   | Switch between SRI **Pruebas** (testing) and **Producción** (production) environments |
| Authorization status tracking    | 🔲 Planned   | Track and display the authorization status of each invoice |
| Contingency key generation       | 🔲 Planned   | Generate contingency access keys when SRI services are unavailable |

<!-- TODO: Add SRI configuration screen details -->
<!-- TODO: Add SRI credential management details -->
<!-- TODO: Add withholding document support (Comprobantes de Retención) -->

---

### Email Invoice Delivery
> Automatic delivery of electronic invoices to customers via email.

| Feature                          | Status       | Description |
| -------------------------------- | ------------ | ----------- |
| Customer email registration      | 🔲 Planned   | Capture and store customer email during checkout |
| Automatic invoice emailing       | 🔲 Planned   | Send the RIDE (PDF) and XML to the customer's email upon SRI authorization |
| Email templates                  | 🔲 Planned   | Professional, branded HTML email templates for invoice delivery |
| Delivery status tracking         | 🔲 Planned   | Track whether the invoice email was sent and delivered |
| Resend functionality             | 🔲 Planned   | Allow manual resend of invoices from the admin panel |
| Batch email processing           | 🔲 Planned   | Queue-based email sending to handle high-volume checkout periods |

<!-- TODO: Add SMTP / email provider configuration details -->
<!-- TODO: Add email template preview screenshots -->

---

### Additional Planned Features

| Feature                          | Status       | Description |
| -------------------------------- | ------------ | ----------- |
| Route Guards (`CanActivate`)     | 🔲 Planned   | Protect routes based on authentication and role |
| Token Refresh & Auto-Logout      | 🔲 Planned   | Handle JWT expiration gracefully |
| Responsive / Mobile Layout       | 🔲 Planned   | Collapsible sidebar and mobile-optimized POS |
| Barcode Scanner Integration      | 🔲 Planned   | Camera/scanner-based product lookup in POS |
| Thermal Printer Support          | 🔲 Planned   | Direct printing of receipts and RIDE documents |
| Customer Management (Clients)    | 🔲 Planned   | CRUD for customers with RUC/Cédula validation |
| Dashboard Analytics              | 🔲 Planned   | Charts and KPIs for the admin overview panel |
| Dark Mode                        | 🔲 Planned   | System-wide dark theme toggle |
| Audit Logs                       | 🔲 Planned   | Track critical operations (sales, voids, user changes) |
| Multi-Establishment Support      | 🔲 Planned   | Manage multiple store locations under one system |

---

## Project Structure

```
src/
├── app/
│   ├── app.ts                          # Root component
│   ├── app.html                        # Root template
│   ├── app.css                         # Global styles
│   ├── app.config.ts                   # App configuration (providers, interceptors)
│   ├── app.routes.ts                   # Route definitions
│   │
│   ├── components/
│   │   ├── login/                      # 🔐 Login screen
│   │   │   ├── login.ts
│   │   │   ├── login.html
│   │   │   └── login.css
│   │   │
│   │   ├── dashboard/                  # 📊 Main layout shell
│   │   │   ├── dashboard.ts
│   │   │   ├── dashboard.html
│   │   │   └── dashboard.css
│   │   │
│   │   ├── sidebar/                    # 📌 Navigation sidebar
│   │   │   ├── sidebar.ts / .html / .css
│   │   │   ├── sidebar-logo/           # Brand logo
│   │   │   ├── sidebar-item/           # Nav menu items
│   │   │   ├── user-card/              # Logged-in user info
│   │   │   └── logout-button/          # Session logout
│   │   │
│   │   ├── admin-dashboard/            # 👑 Admin-only views
│   │   │   ├── dashboard-site/         # Admin overview
│   │   │   ├── inventario/             # Inventory management
│   │   │   │   ├── inventario-form/    # Product create/edit form
│   │   │   │   └── inventario-list/    # Product listing table
│   │   │   ├── usuarios/               # User management (CRUD)
│   │   │   └── reportes/               # Reports & analytics
│   │   │
│   │   └── empleado-dashboard/         # 🧑‍💼 Employee-only views
│   │       ├── pos/                    # Point of Sale checkout
│   │       ├── consultas/              # Product/price lookups
│   │       └── mis-ventas/             # Personal sales history
│   │
│   ├── models/
│   │   ├── producto.model.ts           # Product interface
│   │   └── user.model.ts              # User & UserResponse interfaces
│   │
│   ├── services/
│   │   ├── auth.ts                     # Authentication service (login/logout)
│   │   ├── inventarioService.ts        # Product CRUD operations
│   │   └── usuarios.ts                # User CRUD operations
│   │
│   └── interceptors/
│       └── jwt-interceptor.ts          # JWT Bearer token injector
│
└── public/                             # Static assets
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 10.x
- **Angular CLI** >= 21.x (`npm install -g @angular/cli`)
- A running instance of the **Spring Boot backend** on `http://localhost:8080`

### Installation

```bash
# Clone the repository
git clone https://github.com/Santiago193/tienda-frontend.git

# Navigate to the project directory
cd tienda-frontend

# Install dependencies
npm install
```

### Development Server

```bash
ng serve
# or
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload on file changes.

### Build for Production

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
ng test
```

Tests are executed using [Vitest](https://vitest.dev/).

---

## API Reference

The frontend communicates with the following backend endpoints:

| Method | Endpoint              | Description                | Auth Required |
| ------ | --------------------- | -------------------------- | ------------- |
| POST   | `/api/login`          | Authenticate user          | ❌            |
| GET    | `/api/productos`      | List all products          | ✅ Bearer     |
| POST   | `/api/productos`      | Create a new product       | ✅ Bearer     |
| PUT    | `/api/productos/:id`  | Update an existing product | ✅ Bearer     |
| GET    | `/api/users`          | List all users             | ✅ Bearer     |
| POST   | `/api/users`          | Create a new user          | ✅ Bearer     |
| PUT    | `/api/users/:id`      | Update a user              | ✅ Bearer     |
| DELETE | `/api/users/:id`      | Delete a user              | ✅ Bearer     |

<!-- TODO: Add invoicing endpoints once SRI integration is implemented -->
<!-- TODO: Add sales/POS endpoints -->
<!-- TODO: Add reports endpoints -->

---

## Environment Configuration

| Variable         | Default                   | Description                    |
| ---------------- | ------------------------- | ------------------------------ |
| API Base URL     | `http://localhost:8080/api` | Spring Boot backend URL      |

<!-- TODO: Add environment.ts configuration for production/staging -->
<!-- TODO: Add SRI environment variables (testing vs production URLs) -->
<!-- TODO: Add email service configuration variables -->

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'feat: add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

This project is private and proprietary.

---

<p align="center">
  <strong>Santiago Castillo</strong> — v1.0<br>
  Built with ❤️ using Angular 21 & TailwindCSS 4
</p>
