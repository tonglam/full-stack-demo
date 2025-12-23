namespace FullStackDemo.Api.Services;

/// <summary>
/// Background worker that recalculates registration statuses every 15 seconds
/// so other components (e.g., SignalR hub/controllers) can read fresh data.
/// </summary>
public sealed class RegistrationMonitorService : BackgroundService
{
    private static readonly TimeSpan Interval = TimeSpan.FromSeconds(15);

    private readonly ILogger<RegistrationMonitorService> _logger;
    private readonly RegistrationStatusCalculator _calculator;

    public RegistrationMonitorService(
        ILogger<RegistrationMonitorService> logger,
        RegistrationStatusCalculator calculator)
    {
        _logger = logger;
        _calculator = calculator;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Registration monitor running every {Interval}s", Interval.TotalSeconds);

        while (!stoppingToken.IsCancellationRequested)
        {
            RunCycle();
            _calculator.ToggleExpiryFlag();
            await Task.Delay(Interval, stoppingToken);
        }
    }

    private void RunCycle()
    {
        var statuses = _calculator.Calculate();
        _logger.LogInformation("Refreshed {Count} statuses at {Time}", statuses.Count, DateTime.UtcNow);
    }
}
