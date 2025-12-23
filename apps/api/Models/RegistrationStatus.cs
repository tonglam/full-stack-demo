namespace FullStackDemo.Api.Models;

public sealed record RegistrationStatus(
    Guid CarId,
    bool IsExpired,
    DateOnly ExpiresOn,
    DateTime CheckedAt
);
