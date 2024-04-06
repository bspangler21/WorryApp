using WorryBlazor.Client.Models;

namespace WorryBlazor.Client.Services;

public interface IWorryService
{
    public Task<Worry[]> GetWorriesAsync();

    //public Task PostMovieAsync(Movie movie);

    //public Task PutMovieAsync(long id, Movie movie);

    //public Task DeleteMovieAsync(long id);
}
