# Requirements Analysis

## Purpose

- Build a simple demo that proves full-stack skills with .NET 10 and React.
- Show REST APIs, SignalR, and a small background process using mock data.

## Functional Requirements

- **Cars listing API**: `GET /api/cars?make=` returns cars, filtered by make when provided.
- **Homepage UI**: Route `/` loads the car list and shows it in a table.
- **Expiry monitoring service**: Background job checks if each registration is valid or expired on a timer.
- **Real-time registration feed**: Route `/registration` listens to SignalR updates from the background job and shows current status.

## Data & Storage

- Mock data stored in-memory via a seeded list; no external DB required.
- Services share simple in-memory collections.

## Technology Constraints

- Backend: C# .NET 9/10 (use .NET 10) with SignalR, a background service, logging, and xUnit tests.
- Frontend: Vite + React (TypeScript) with Tailwind CSS, routing, HTTP client, and SignalR client.

## Non-Functional Goals

- MVC, keep layers clear (controllers → services → data seed).
- Log background job runs and hub pushes.
- Make the SignalR client reconnect gracefully.
- Add tests for filtering and expiry checks when possible.
- Write short docs with run instructions.

## Assumptions

- No authentication/authorization required for now.
- Broadcasting the whole list each time is fine for now.
- Use UTC timezone unless stated otherwise.
- Treat expiry as date-only at midnight.
