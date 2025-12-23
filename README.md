# Full Stack Demo (WIP)

## Overview

- .NET 10 Web API + React (Vite + Tailwind) frontend.
- Mock car data with background service checking registration expiry.
- REST endpoint + SignalR hub power both `/` and `/registration` pages.

## Requirements Coverage

1. `GET /api/cars` returns cars with optional `make` filter.
2. `/` shows the car list in a table, with optional search/pagination.
3. Background service recalculates registration status on a timer.
4. `/registration` uses SignalR to show live valid/expired status.

## Getting Started (to be expanded)

- Backend: `dotnet run` .
- Frontend: `npm install && npm run dev`.

## Testing (planned)

- Backend: `dotnet test` (filtering + expiry logic).
- Frontend: `npm run test` (components/hooks if time permits).

## Architecture Notes

- In-memory data seed for cars; services share data via DI.
- Background service triggers SignalR hub broadcasts.
- React app uses React Router, fetch wrapper, and SignalR client.
