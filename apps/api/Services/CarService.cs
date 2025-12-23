using FullStackDemo.Api.Data;
using FullStackDemo.Api.Models;

namespace FullStackDemo.Api.Services;

/// <summary>
/// Reads car data from the repository, sorts by creation time, and applies the make filter when present.
/// Returns the cars in descending order of creation time.
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
