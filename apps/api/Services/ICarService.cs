using FullStackDemo.Api.Models;

namespace FullStackDemo.Api.Services;

public interface ICarService
{
    IReadOnlyCollection<Car> GetCars(string? make);
}
