# Full Stack Demo

A .NET 10 Web API paired with a Vite + React + Tailwind frontend. The API exposes mock car data, a background monitor recalculates registration statuses in-memory, and a SignalR hub streams live updates to the `/registration` page. Everything runs without external databases; all data lives in-memory for the take-home.

## Requirements

| # | Requirement | Implementation |
|---|-------------|----------------|
| 1 | `GET /api/cars?make=` returns a list of cars filtered by make | `CarService` + `CarsController` (`apps/api`) |
| 2 | `/` displays the cars in a table with filtering | `Home.tsx` fetches `/api/cars` and renders a Tailwind table |
| 3 | Background service checks if registrations expire | `RegistrationMonitorService` + `RegistrationStatusCalculator` |
| 4 | `/registration` shows live status via SignalR | `RegistrationHub` + `Registration.tsx` (single shared SignalR connection) |

## Tech stack
- **Backend:** .NET 10 Web API, SignalR, hosted background service
- **Frontend:** React 19, Vite, Tailwind CSS, React Router 7
- **Testing:** xUnit for backend services, Vitest + Testing Library for a basic frontend check, ESLint for linting

## Running the app

### Prerequisites
- .NET 10 SDK
- Node.js 20+

### Backend
```bash
# from repo root
cd apps/api
ASPNETCORE_ENVIRONMENT=Development dotnet run
# API listens on http://localhost:5000
```

### Frontend
```bash
cd apps/web
npm install
npm run dev
# Vite serves at http://localhost:5173 and proxies /api and /hubs to the API
```

Open `http://localhost:5173`:
- `/` shows the car list and a make search
- `/registration` connects to SignalR showing live status + last update timestamp

## Testing & linting
```bash
# Backend unit tests
cd <repo root>
dotnet test

# Frontend lint / unit tests
cd apps/web
npm run lint
npm run test
```

## Architecture notes
- `CarRepository` holds the mock data in-memory; tests can override via `SetCars`.
- `RegistrationMonitorService` runs every 5 seconds, flips one mock car’s expiry flag for demonstration, and pushes updates through `RegistrationHub`.
- The frontend uses a single shared `HubConnection` to avoid duplicate SignalR negotiations under React StrictMode.
- Vite proxies `/api` and `/hubs` in dev, so the browser never hits the API cross-origin (no CORS issues).

## Testing Summary
- `xUnit` suite covers `CarService` filtering and the registration status calculator’s mock flip.
- `Vitest` + Testing Library verifies the home page renders rows from the mocked fetch response.
- `npm run lint` ensures the React code stays within ESLint rules.
