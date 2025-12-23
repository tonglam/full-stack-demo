using FullStackDemo.Api.Models;
using FullStackDemo.Api.Services;
using Xunit;

namespace FullStackDemo.Tests;

public class RegistrationStatusCalculatorTests
{
    [Fact]
    public void EmitsMakeModelAndTogglesStatus()
    {
        TestCarRepository.OverrideCars([
            new Car(Guid.NewGuid(), "Toyota", "Corolla", 2020, "VIN-1", DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1)), DateTime.UtcNow)
        ]);

        var calculator = new RegistrationStatusCalculator();

        var first = calculator.Calculate().Single();
        Assert.Equal("Toyota", first.Make);
        Assert.Equal("Corolla", first.Model);

        var initialStatus = first.IsExpired;

        calculator.ToggleExpiryFlag();

        var second = calculator.Calculate().Single();
        Assert.NotEqual(initialStatus, second.IsExpired);
    }
}
