using FullStackDemo.Api.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace FullStackDemo.Api.Services;

/// <summary>
/// Background worker that recalculates registration statuses every 15 seconds
/// so other components (e.g., SignalR hub/controllers) can read fresh data.
/// </summary>
public sealed class RegistrationMonitorService : BackgroundService
{
    private static readonly TimeSpan Interval = TimeSpan.FromSeconds(5);

    private readonly ILogger<RegistrationMonitorService> _logger;
    private readonly RegistrationStatusCalculator _calculator;
    private readonly IHubContext<RegistrationHub> _hubContext;

    public RegistrationMonitorService(
        ILogger<RegistrationMonitorService> logger,
        RegistrationStatusCalculator calculator,
        IHubContext<RegistrationHub> hubContext)
    {
        _logger = logger;
        _calculator = calculator;
        _hubContext = hubContext;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Registration monitor running every {Interval}s", Interval.TotalSeconds);

        while (!stoppingToken.IsCancellationRequested)
        {
            _calculator.ToggleExpiryFlag();
            await RunCycleAsync();
            await Task.Delay(Interval, stoppingToken);
        }
    }

    private async Task RunCycleAsync()
    {
        var statuses = _calculator.Calculate();
        await _hubContext.Clients.All.SendAsync("statusUpdated", statuses);
        _logger.LogInformation("Refreshed {Count} statuses at {Time}", statuses.Count, DateTime.UtcNow);
    }
}
