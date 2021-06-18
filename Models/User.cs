using System;
using System.Collections.Generic;

namespace watermango
{
        public class User
    {
        public string ID { get; set; }

        public string Email { get; set;}

        public string Password { get; set;}

        public bool LoggedIn {get; set;}

        public List<String> plantIds { get; set;}

        public User()
        {
            this.plantIds = new List<string>();
        }

        public User(string id, string email, string password)
        {
            this.ID = id; 
            this.Email = email; 
            this.Password = password;

            this.plantIds = new List<string>();
        }

        public void AddPlantId(String id){
            this.plantIds.Add(id);
        }

        public void RemovePlantId(String id){
            this.plantIds.Remove(id);
        }
    }
}