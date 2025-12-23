using FullStackDemo.Api.Hubs;
using FullStackDemo.Api.Services;

Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT",
    Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development");

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSingleton<ICarService, CarService>();
builder.Services.AddSingleton<RegistrationStatusCalculator>();
builder.Services.AddHostedService<RegistrationMonitorService>();
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultCors", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseRouting();
app.UseCors("DefaultCors");
app.MapControllers().RequireCors("DefaultCors");
app.MapHub<RegistrationHub>("/hubs/registration").RequireCors("DefaultCors");

app.Run();
