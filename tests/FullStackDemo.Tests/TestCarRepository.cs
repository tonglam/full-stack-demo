using FullStackDemo.Api.Data;
using FullStackDemo.Api.Models;

namespace FullStackDemo.Tests;

public static class TestCarRepository
{
    public static void OverrideCars(IEnumerable<Car> cars)
    {
        CarRepository.SetCars(cars.ToList());
    }
}
