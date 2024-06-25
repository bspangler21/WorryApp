using API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace API.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _userCollection;

        public UserService(IOptions<UserDatabaseSettings> databaseSettings)
        {
            var client = new MongoClient(databaseSettings.Value.ConnectionString);
            var database = client.GetDatabase(databaseSettings.Value.DatabaseName);

            _userCollection = database.GetCollection<User>(databaseSettings.Value.UserCollectionName);
        }

        public async Task<List<User>> GetUserAsync()
        {

            var useres = await _userCollection.FindAsync(_ => true);

            return await useres.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            var user = await _userCollection.FindAsync(u => u.Id == id);

            return await user.FirstOrDefaultAsync();
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            var user = await _userCollection.FindAsync(u => u.username == username);

            return await user.FirstOrDefaultAsync();
        }

        public async Task CreateAsync(User newUser)
        {
            await _userCollection.InsertOneAsync(newUser);
        }

        public async Task UpdateAsync(string id, User updatedUser)
        {
            FilterDefinition<User> filter = Builders<User>.Filter.Eq(u => u.Id, id);
            UpdateDefinition<User> update = Builders<User>.Update
                .Set(u => u.username, updatedUser.username)
                .Set(u => u.password, updatedUser.password);
                
            await _userCollection.UpdateOneAsync(filter, update);
        }

        public async Task DeleteAsync(string id)
        {
            await _userCollection.DeleteOneAsync(u => u.Id == id);
        }
    }
}
