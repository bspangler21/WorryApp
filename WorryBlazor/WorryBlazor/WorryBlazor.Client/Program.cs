using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using WorryBlazor.Client;
using WorryBlazor.Client.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.Services.AddScoped<IWorryService, ClientWorryService>();

builder.Services.AddScoped(sp =>
    new HttpClient
    {
        //BaseAddress = new Uri(builder.Configuration["FrontendUrl"] ?? "https://localhost:4000/api
        BaseAddress = new Uri("http://localhost:4000/api")
    });

await builder.Build().RunAsync();
