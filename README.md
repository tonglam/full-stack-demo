# Full Stack Demo

## Overview

Simple car inventory API + React dashboard showing a mocked registration status feed.

## Requirements

| #   | Requirement                                                   | Implementation                                                          |
| --- | ------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1   | `GET /api/cars?make=` returns a list of cars filtered by make | `CarService` + `CarsController` in `apps/api`                           |
| 2   | `/` displays the cars in a searchable table                   | `Home.tsx` fetches `/api/cars` and renders Tailwind table               |
| 3   | Background service checks registrations                       | `RegistrationMonitorService` + `RegistrationStatusCalculator`           |
| 4   | `/registration` shows live valid/expired status via SignalR   | `RegistrationHub` + `Registration.tsx` with a shared SignalR connection |

## Tech Stack

- **Backend:** .NET 10 Web API, SignalR, hosted background service
- **Frontend:** React 19, Vite, Tailwind CSS, React Router 7
- **Testing:** xUnit (backend services), Vitest + Testing Library (Home table), ESLint

## Project Structure

```
full-stack-demo/
├── apps/
│   ├── api/                     # ASP.NET Core Web API
│   └── web/                     # Vite + React frontend
│       └── tests/               # Vitest + Testing Library specs
├── tests/                       # Backend xUnit project
└── docs/                        # Requirements/checklist docs
```

## Getting Started

### Backend

```bash
cd apps/api
dotnet run
```

- API listens on `http://localhost:5000`

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

- Vite serves `http://localhost:5173`

**Vist `http://localhost:5173`**

## Data

- `CarRepository` holds mock data in-memory (VIN, make, expiry, etc.)
- `RegistrationStatusCalculator` flips the first car’s expiry flag every monitor cycle (5s) to demonstrate live updates

## Testing

- Backend unit tests: `dotnet test`
- Frontend lint + tests: `cd apps/web && npm run lint && npm run test`

## Future Improvements

- **Auth/Security:** add auth around the API + hub and restrict origins for production
- **Cars table UX:** paginate and sort the `/` table (currently fetches all cars at once)
- **Registration page filtering/sorting:** allow filtering by make or status and sorting by expiry
- **Caching/Storage:** persist car data/registration statuses in an actual data store or cache instead of in-memory
- **Environment separation:** add distinct development/production configurations (separate CORS lists, telemetry, logging)
- **WebSocket UX:** surface reconnection failures or transient disconnects to the user instead of silently retrying
