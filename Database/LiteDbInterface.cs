using System;
using System.Collections.Generic;
using System.Linq;
using LiteDB;

namespace watermango {
    public class LiteDbInterface
    {
        public LiteDatabase Database { get; }

        public LiteDbInterface()
        {
            Database = new LiteDatabase(@"MyData.db");

            var collection = Database.GetCollection<Plant>("plants");
            IEnumerable<Plant> pe = collection.FindAll();
            List<Plant> pl = pe.ToList();

            if (pl.Count == 0){
                var plant = new Plant(1, "Plant in the boardroom", 30, "Full");

                List<Plant> defaultPlants = new List<Plant>(){
                    new Plant(1, "Plant in the boardroom down the hall", 30, "Full"),
                    new Plant(2, "The Roses beside Kevin", 67, "Semi"),
                    new Plant(3, "Front-desk shrubbery", 10, "Empty")
                };

                collection.Insert(defaultPlants);
            }
        }

        public void AddPlant(Plant p){
            var collection = Database.GetCollection<Plant>("plants");
            collection.Insert(p);
        }

        public List<Plant> AllPlants(){
            List<Plant> nl = new List<Plant>();

            // Get plant collection
            var collection = Database.GetCollection<Plant>("plants");

            return collection.FindAll().ToList();
        }
    }
}