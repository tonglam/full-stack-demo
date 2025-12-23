using FullStackDemo.Api.Models;
using FullStackDemo.Api.Services;
using Xunit;

namespace FullStackDemo.Tests;

public class CarServiceTests
{
    private static CarService CreateService(IEnumerable<Car> cars)
    {
        TestCarRepository.OverrideCars(cars);
        return new CarService();
    }

    [Fact]
    public void ReturnsAllCarsWhenNoFilter()
    {
        var service = CreateService([
            new Car(Guid.NewGuid(), "Toyota", "Corolla", 2020, "VIN-1", DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1)), DateTime.UtcNow)
        ]);

        var results = service.GetCars(null);

        Assert.Single(results);
    }

    [Fact]
    public void FiltersByCaseInsensitiveMake()
    {
        var service = CreateService([
            new Car(Guid.NewGuid(), "Toyota", "Corolla", 2020, "VIN-1", DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1)), DateTime.UtcNow),
            new Car(Guid.NewGuid(), "Honda", "Civic", 2019, "VIN-2", DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1)), DateTime.UtcNow)
        ]);

        var results = service.GetCars("toyota");

        Assert.Single(results);
        Assert.Equal("Toyota", results.First().Make);
    }

    [Fact]
    public void SupportsPartialMatches()
    {
        var service = CreateService([
            new Car(Guid.NewGuid(), "Tesla", "Model 3", 2022, "VIN-3", DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1)), DateTime.UtcNow),
            new Car(Guid.NewGuid(), "Honda", "Civic", 2019, "VIN-2", DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1)), DateTime.UtcNow)
        ]);

        var results = service.GetCars("Tes");

        Assert.Single(results);
        Assert.Equal("Tesla", results.First().Make);
    }
}
