using FullStackDemo.Api.Models;
using FullStackDemo.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FullStackDemo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class CarsController(ICarService carService) : ControllerBase
{
    [HttpGet]
    public ActionResult<IReadOnlyCollection<Car>> GetCars([FromQuery] string? make)
    {
        var cars = carService.GetCars(make);
        return Ok(cars);
    }
}
