using FullStackDemo.Api.Models;

namespace FullStackDemo.Api.Data;

/// <summary>
/// Provides the mock car inventory used by the API.
/// </summary>
public static class CarRepository
{
    private static List<Car> _cars =
    [
        new(
            Guid.Parse("6a8c8eca-9c57-42af-8aa2-4b091df2d212"),
            "Toyota",
            "Corolla",
            2018,
            "1HGBH41JXMN109186",
            DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-2)),
            DateTime.UtcNow.AddMonths(-2)
        ),
        new(
            Guid.Parse("42b62b4d-c2d3-4a6e-8271-1a4ae2b0c271"),
            "Honda",
            "Civic",
            2017,
            "1HGBH41JXMN209999",
            DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1)),
            DateTime.UtcNow.AddMonths(-5)
        ),
        new(
            Guid.Parse("2f6d2a6b-3c41-4cdc-99ff-0c42de4b7fdd"),
            "Ford",
            "Focus",
            2020,
            "1HGBH41JXMN309111",
            DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-10)),
            DateTime.UtcNow.AddMonths(-1)
        ),
        new(
            Guid.Parse("c0da54af-801f-458e-a074-7adf5a0470e3"),
            "Tesla",
            "Model 3",
            2022,
            "5YJ3E1EA7KF317000",
            DateOnly.FromDateTime(DateTime.UtcNow.AddDays(20)),
            DateTime.UtcNow.AddDays(-10)
        ),
        new(
            Guid.Parse("f2c5a4f1-6b99-42f3-9c4b-1a9a2f3f6c4c"),
            "BMW",
            "330i",
            2019,
            "WBA8E9G53GNU12345",
            DateOnly.FromDateTime(DateTime.UtcNow.AddDays(60)),
            DateTime.UtcNow.AddMonths(-7)
        ),
        new(
            Guid.Parse("de93a9b9-6d65-4a21-aafc-2b7685e6b1aa"),
            "Audi",
            "A4",
            2021,
            "WAUAFAFL2EN012345",
            DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-1)),
            DateTime.UtcNow.AddMonths(-3)
        )
    ];

    public static IReadOnlyList<Car> Cars => _cars;

    public static void SetCars(IReadOnlyList<Car> cars)
    {
        _cars = cars.ToList();
    }
}
