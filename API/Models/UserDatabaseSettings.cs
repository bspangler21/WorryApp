namespace API.Models
{
    public class UserDatabaseSettings
    {
        /// <summary>
        /// Gets or sets the connection string for the database.
        /// </summary>
        public string ConnectionString { get; set; } = null!;

        /// <summary>
        /// Gets or sets the name of the database.
        /// </summary>
        public string DatabaseName { get; set; } = null!;

        /// <summary>
        /// Gets or sets the name of the golfers collection in the database.
        /// </summary>
        public string UserCollectionName { get; set; } = null!;
    }
}
