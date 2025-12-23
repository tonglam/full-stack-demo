# Implementation Checklist

## Backend (.NET 10)

- [x] Create solution + Web API project.
- [x] Add models (Car, RegistrationStatus) and in-memory seed data.
- [x] Add service that returns cars with optional make filter.
- [x] Build `GET /api/cars` endpoint and validate query.
- [x] Write background service that recalculates registration status on a timer.
- [x] Add SignalR hub that pushes live status updates.
- [x] Register services, logging, and config in DI container.
- [ ] Write tests for filtering and expiry logic.

## Frontend (Vite + React + Tailwind CSS)

- [x] Scaffold Vite React TS app and install Tailwind CSS.
- [x] Configure routes for `/` and `/registration`.
- [x] Build simple API client and hook data to the home table.
- [x] Add make filter input and optional client-side pagination.
- [ ] Build `/registration` page with SignalR client and live table.
- [ ] Style tables and status tags with Tailwind CSS.
- [ ] Add small tests for hooks or components (time permitting).

## Documentation & Tooling

- [ ] Write README with overview, setup, usage, and requirement mapping.
- [ ] Capture key architecture notes or future improvements.
- [ ] Document lint/format commands (ESLint, dotnet format, etc.).
- [ ] Prepare final checklist (tests, lint, run instructions).
