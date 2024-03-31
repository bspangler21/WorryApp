using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;

namespace API.Models
{
    public class Worry
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("_id")]
        public string? Id { get; set; }

        [BsonElement("title")]
        public string title { get; set; } = null!;

        [BsonElement("description")]
        public string? description { get; set; } = null;

        [BsonElement("symptoms")]
        public string? symptoms { get; set; } = null;

        [BsonElement("intensity")]
        public int intensity { get; set; } = 0;

        [BsonElement("triggers")]
        public string? triggers { get; set; } = null;

        [BsonElement("dateRecorded")]
        public DateTime dateRecorded { get; set; } = DateTime.Now;

        [BsonElement("judgments")]
        public string? judgments { get; set; } = null;

        [BsonElement("copingStrategies")]
        public string? copingStrategies { get; set; } = null;

        [BsonElement("dateResolved")]
        public DateTime? dateResolved { get; set; } = null;

        [BsonElement("resolved")]
        public bool resolved { get; set; } = false;
    }
}
