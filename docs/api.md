# API Overview

## GET /api/cars
- Returns all cars as a JSON array.
- Query params:
  - `make` (optional, string) – filters cars by partial make match (case-insensitive).
- Response sample:
```json
[
  {
    "id": "6a8c8eca-9c57-42af-8aa2-4b091df2d212",
    "make": "Toyota",
    "model": "Corolla",
    "year": 2018,
    "vin": "1HGBH41JXMN109186",
    "registrationExpiry": "2025-05-01",
    "createdAt": "2024-03-01T10:00:00Z"
  }
]
```

## SignalR Hub /hubs/registration
- Method: WebSocket (SignalR) connection for live updates.
- Events:
  - `statusUpdated`: sends array of registration status payloads.
- Payload sample:
```json
[
  {
    "carId": "6a8c8eca-9c57-42af-8aa2-4b091df2d212",
    "make": "Toyota",
    "model": "Corolla",
    "isExpired": false,
    "expiresOn": "2025-05-01",
    "checkedAt": "2024-05-25T12:00:00Z"
  }
]
```

## Notes
- All responses use JSON.
- Dates use ISO 8601 strings (UTC).
- Additional endpoints can be added later if needed.
