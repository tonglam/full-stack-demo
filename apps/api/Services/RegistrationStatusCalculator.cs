using FullStackDemo.Api.Data;
using FullStackDemo.Api.Models;

namespace FullStackDemo.Api.Services;

/// <summary>
/// Translates car data into registration statuses and simulates flips.
/// </summary>
public sealed class RegistrationStatusCalculator
{
    private readonly Guid? _demoCarId;
    private bool _flipFlag;

    public RegistrationStatusCalculator()
    {
        _demoCarId = CarRepository.Cars.FirstOrDefault()?.Id;
    }

    public IReadOnlyCollection<RegistrationStatus> Calculate()
    {
        var now = DateTime.UtcNow;
        var today = DateOnly.FromDateTime(now);

        return CarRepository.Cars
            .Select(car =>
            {
                var expired = car.RegistrationExpiry < today;
                if (_demoCarId.HasValue && car.Id == _demoCarId.Value && _flipFlag)
                {
                    expired = !expired;
                }

                return new RegistrationStatus(car.Id, expired, car.RegistrationExpiry, now);
            })
            .ToArray();
    }

    /// <summary>
    /// Flips the expiry flag so the next Calculate() call emits the opposite state for the mock car.
    /// </summary>
    public void ToggleExpiryFlag() => _flipFlag = !_flipFlag;
}
