using API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace API.Services
{
    public class WorryService
    {
        private readonly IMongoCollection<Worry> _worryCollection;

        public WorryService(IOptions<WorryDatabaseSettings> databaseSettings)
        {
            var client = new MongoClient(databaseSettings.Value.ConnectionString);
            var database = client.GetDatabase(databaseSettings.Value.DatabaseName);

            _worryCollection = database.GetCollection<Worry>(databaseSettings.Value.WorryCollectionName);
        }

        public async Task<List<Worry>> GetWorryAsync()
        {

            var worryes = await _worryCollection.FindAsync(_ => true);

            return await worryes.ToListAsync();
        }

        public async Task<Worry> GetWorryAsync(string id)
        {
            var worry = await _worryCollection.FindAsync(w => w.Id == id);

            return await worry.FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Worry newWorry)
        {
            await _worryCollection.InsertOneAsync(newWorry);
        }

        public async Task UpdateAsync(string id, Worry updatedWorry)
        {
            FilterDefinition<Worry> filter = Builders<Worry>.Filter.Eq(w => w.Id, id);
            UpdateDefinition<Worry> update = Builders<Worry>.Update
                .Set(w => w.title, updatedWorry.title)
                .Set(w => w.description, updatedWorry.description)
                .Set(w => w.symptoms, updatedWorry.symptoms)
                .Set(w => w.intensity, updatedWorry.intensity)
                .Set(w => w.triggers, updatedWorry.triggers)
                .Set(w => w.dateRecorded, updatedWorry.dateRecorded)
                .Set(w => w.judgments, updatedWorry.judgments)
                .Set(w => w.copingStrategies, updatedWorry.copingStrategies)
                .Set(w => w.dateResolved, updatedWorry.dateResolved)
                .Set(w => w.resolved, updatedWorry.resolved);
            await _worryCollection.UpdateOneAsync(filter, update);
        }

        public async Task DeleteAsync(string id)
        {
            await _worryCollection.DeleteOneAsync(w => w.Id == id);
        }
    }
}
