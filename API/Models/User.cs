using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;

namespace API.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("_id")]
        public string? Id { get; set; }

        [BsonElement("username")]
        public string username { get; set; } = null!;

        [BsonElement("password")]
        public string password { get; set; } = null!;

    }
}
