using FullStackDemo.Api.Data;
using FullStackDemo.Api.Models;

namespace FullStackDemo.Api.Services;

/// <summary>
/// Returns seeded cars sorted by creation date, with optional make filtering.
/// </summary>
public sealed class CarService : ICarService
{
    public IReadOnlyCollection<Car> GetCars(string? make)
    {
        var cars = CarRepository.Cars
            .OrderByDescending(car => car.CreatedAt)
            .ToArray();

        if (string.IsNullOrWhiteSpace(make))
        {
            return cars;
        }

        return cars
            .Where(car => car.Make.Equals(make, StringComparison.OrdinalIgnoreCase))
            .ToArray();
    }
}
