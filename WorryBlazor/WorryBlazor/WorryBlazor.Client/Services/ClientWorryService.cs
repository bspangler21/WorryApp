using System.Net.Http.Json;
using WorryBlazor.Client.Models;


namespace WorryBlazor.Client.Services;

//public class ClientWorryService(HttpClient http) : IWorryService
//{
//    public async Task<Worry[]> GetWorriesAsync()
//    {
//        var requestUri = "Worry";
//        return await http.GetFromJsonAsync<Worry[]>(requestUri) ?? [];
//    }

//}


public class ClientWorryService : IWorryService
{
    private readonly HttpClient http;

    public ClientWorryService(HttpClient http)
    {
        this.http = http;
    }

    public async Task<Worry[]> GetWorriesAsync()
    {
        var requestUri = "Worry";
        return await http.GetFromJsonAsync<Worry[]>(requestUri) ?? Array.Empty<Worry>();
    }
}

