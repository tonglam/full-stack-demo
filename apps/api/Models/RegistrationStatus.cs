namespace FullStackDemo.Api.Models;

public sealed record RegistrationStatus(
    Guid CarId,
    string Make,
    string Model,
    bool IsExpired,
    DateOnly ExpiresOn,
    DateTime CheckedAt
);
