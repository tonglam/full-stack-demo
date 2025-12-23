# Data Model

## Car

- `id`: GUID/UUID string that uniquely identifies the car.
- `make`: string for the manufacturer (e.g., Toyota).
- `model`: string for the model name (e.g., Corolla).
- `year`: integer build year.
- `vin`: string placeholder VIN for display/testing.
- `registrationExpiry`: ISO date string (UTC, date-only) showing when the registration ends.
- `createdAt`: ISO datetime string noting when the mock car record was created.

## RegistrationStatus

- `carId`: UUID string referencing the related car.
- `isExpired`: boolean indicating whether the registration is past expiry.
- `expiresOn`: ISO date string (UTC), mirrors the car's `registrationExpiry`.
- `checkedAt`: ISO datetime string marking when the background job evaluated the status.

## Notes

- Treat all dates as UTC; comparisons use date-only precision.
