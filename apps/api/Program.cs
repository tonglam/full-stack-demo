using FullStackDemo.Api.Hubs;
using FullStackDemo.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSingleton<ICarService, CarService>();
builder.Services.AddSingleton<RegistrationStatusCalculator>();
builder.Services.AddHostedService<RegistrationMonitorService>();
builder.Services.AddSignalR();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.MapControllers();
app.MapHub<RegistrationHub>("/hubs/registration");

app.Run();
