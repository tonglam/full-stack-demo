using FullStackDemo.Api.Hubs;
using FullStackDemo.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSingleton<ICarService, CarService>();
builder.Services.AddSingleton<RegistrationStatusCalculator>();
builder.Services.AddHostedService<RegistrationMonitorService>();
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors();
app.MapControllers();
app.MapHub<RegistrationHub>("/hubs/registration");

app.Run();
