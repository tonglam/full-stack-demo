using FullStackDemo.Api.Models;
using FullStackDemo.Api.Services;
using Microsoft.AspNetCore.SignalR;

namespace FullStackDemo.Api.Hubs;

public sealed class RegistrationHub(RegistrationStatusCalculator calculator) : Hub
{
    public override async Task OnConnectedAsync()
    {
        var currentStatuses = calculator.Calculate();
        await Clients.Caller.SendAsync("statusUpdated", currentStatuses);
        await base.OnConnectedAsync();
    }
}
