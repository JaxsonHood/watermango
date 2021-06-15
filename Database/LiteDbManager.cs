using System;
using System.Threading;
using System.Collections.Generic;
using System.Linq;
using LiteDB;

using System.Reflection;

namespace watermango {
    public class LiteDbManager
    {
        public LiteDatabase Database { get; }

        public LiteDbManager()
        {
            Database = new LiteDatabase(@"WatermangoData.db");

            var collection = Database.GetCollection<Plant>("plants");
            IEnumerable<Plant> pe = collection.FindAll();
            List<Plant> pl = pe.ToList();

            if (pl.Count == 0){
                List<Plant> defaultPlants = new List<Plant>(){
                    new Plant(NextId(), "Plant in the boardroom down the hall", 30, "Full"),
                    new Plant(NextId(), "The Roses beside Kevin", 67, "Semi"),
                    new Plant(NextId(), "Front-desk shrubbery", 10, "Empty")
                };

                collection.Insert(defaultPlants);

                // Loop through and print out all properties
                // foreach (var p in collection.FindAll().ToList()){
                //     foreach (PropertyInfo prop in p.GetType().GetProperties())
                //     {
                //         var type = Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType;
                //         Console.WriteLine(prop.GetValue(p, null).ToString());
                //     }
                // }

            }
        }

        public String NextId(){
            return CorrelationIdGenerator.GetNextId();
        }

        public void AddPlant(Plant p){
            Plant pl = new Plant(){
                ID = NextId(),
                Title = p.Title,
                WaterTime = p.WaterTime,
                Watered = p.Watered
            };

            Console.WriteLine("Adding plant with ID: " + pl.ID);

            var collection = Database.GetCollection<Plant>("plants");
            collection.Insert(pl);
        }

        public List<Plant> AllPlants(){
            List<Plant> nl = new List<Plant>();

            // Get plant collection
            var collection = Database.GetCollection<Plant>("plants");

            return collection.FindAll().ToList();
        }
    }

    internal static class CorrelationIdGenerator  
    {
        private static readonly string _encode32Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUV";

        private static readonly char[] _buffer = new char[13];

        private static long _lastId = DateTime.UtcNow.Ticks;

        public static string GetNextId() => GenerateId(Interlocked.Increment(ref _lastId));

        private static string GenerateId(long id)
        {
            var charBuffer = _buffer;

            charBuffer[0] = _encode32Chars[(int)(id >> 60) & 31];
            charBuffer[1] = _encode32Chars[(int)(id >> 55) & 31];
            charBuffer[2] = _encode32Chars[(int)(id >> 50) & 31];
            charBuffer[3] = _encode32Chars[(int)(id >> 45) & 31];
            charBuffer[4] = _encode32Chars[(int)(id >> 40) & 31];
            charBuffer[5] = _encode32Chars[(int)(id >> 35) & 31];
            charBuffer[6] = _encode32Chars[(int)(id >> 30) & 31];
            charBuffer[7] = _encode32Chars[(int)(id >> 25) & 31];
            charBuffer[8] = _encode32Chars[(int)(id >> 20) & 31];
            charBuffer[9] = _encode32Chars[(int)(id >> 15) & 31];
            charBuffer[10] = _encode32Chars[(int)(id >> 10) & 31];
            charBuffer[11] = _encode32Chars[(int)(id >> 5) & 31];
            charBuffer[12] = _encode32Chars[(int)id & 31];

            return new string(charBuffer, 0, 13);
        }
    }
}