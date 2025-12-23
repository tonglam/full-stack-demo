namespace FullStackDemo.Api.Models;

public sealed record Car(
    Guid Id,
    string Make,
    string Model,
    int Year,
    string Vin,
    DateOnly RegistrationExpiry,
    DateTime CreatedAt
);
