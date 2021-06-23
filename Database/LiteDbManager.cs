using System;
using System.Threading;
using System.Collections.Generic;
using System.Linq;
using LiteDB;

namespace watermango {
    public class LiteDbManager
    {
        public LiteDatabase Database { get; }

        public LiteDbManager()
        {
            Database = new LiteDatabase(@"Filename=WatermangoData.db; Connection=shared");

            var collection = Database.GetCollection<Plant>("plants");
            IEnumerable<Plant> pe = collection.FindAll();
            List<Plant> pl = pe.ToList();

            // Add some default plants
            if (pl.Count == 0){
                List<Plant> defaultPlants = new List<Plant>(){
                    new Plant(NextId(), "Plant in the boardroom down the hall", 30, "Full", 50, 1623982242897),
                    new Plant(NextId(), "The Roses beside Kevin", 67, "Semi", 30, 1623982242897),
                    new Plant(NextId(), "Front-desk shrubbery", 10, "Empty", 10, 1623982242897)
                };

                collection.Insert(defaultPlants);
            }
        }

        public String NextId(){
            return CorrelationIdGenerator.GetNextId();
        }

        public void AddEditPlant(Plant p, String userId){

            var collection = Database.GetCollection<Plant>("plants");

            // If null create a new plant
            if (p.ID == null){
                Plant pl = new Plant(){
                    ID = NextId(),
                    Title = p.Title,
                    WaterTime = p.WaterTime,
                    Watered = p.Watered,
                    TimeToWait = p.TimeToWait
                };

                Console.WriteLine("Adding plant with ID: " + pl.ID + " to USER - " + userId);
                collection.Insert(pl);

                AddRemovePlantFromUser(pl, userId, "add");
            } else {
                collection.Update(p);
            }
        }

        public void BatchUpdatePlants(List<Plant> pl){
            var collection = Database.GetCollection<Plant>("plants");
            collection.Update(pl);
        }

        public void RemovePlant(Plant p, string userId){
            var collection = Database.GetCollection<Plant>("plants");
            AddRemovePlantFromUser(p, userId, "remove");
            collection.Delete(p.ID);
        }

        public List<Plant> AllPlants(){
            List<Plant> nl = new List<Plant>();

            // Get plant collection
            var collection = Database.GetCollection<Plant>("plants");

            return collection.FindAll().ToList();
        }

        public User GetUser(String id){
            // Get user collection
            var collection = Database.GetCollection<User>("users");
            return collection.FindOne(x => x.ID == id);
        }

        public User AddUser(UserTransporter transporter){
            var collection = Database.GetCollection<User>("users");

            // If cannot find user create a new one
            if (collection.FindOne(x => x.Email == transporter.Email) == null){
                User newUser = new User(NextId(), transporter.Email, transporter.Password);
                collection.Insert(newUser);
                return newUser;
            }

            return null;
        }

        public void AddRemovePlantFromUser(Plant p, string userId, string action){
            var collection = Database.GetCollection<User>("users");

            // Find user to remove plant from
            User u = collection.FindOne(x => x.ID == userId);

            Console.WriteLine("User to add plant to - " + u.Email);
            
            if (u != null){
                if (action == "add"){
                    u.AddPlantId(p.ID);
                } else u.RemovePlantId(p.ID);
                Console.WriteLine(collection.Update(u) + " - SIZE=" + u.plantIds.Count);
            }
        }

        public User LoginUser(UserTransporter transporter){
            var collection = Database.GetCollection<User>("users");
            User u = collection.FindOne(x => x.Email == transporter.Email);

            // Check if user was found and password matches
            if (u != null && u.Password == transporter.Password){
                u.LoggedIn = true;
                collection.Update(u);
                return u;
            }

            return null;
        }

        public bool LogoutUser(UserTransporter transporter){
            var collection = Database.GetCollection<User>("users");
            User u = collection.FindOne(x => x.Email == transporter.Email);

            if (u != null){
                u.LoggedIn = false;
                collection.Update(u);
                return true;;
            }

            return false;
        }

        public List<Plant> GetPlantsForUser(string userId){
            User u = GetUser(userId);

            // Get plant collection
            var collection = Database.GetCollection<Plant>("plants");
            return collection.Find(x => u.plantIds.Contains<string>(x.ID)).ToList();
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