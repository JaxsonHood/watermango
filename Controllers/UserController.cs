using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace watermango {

    [ApiController]
    public class UserController : ControllerBase
    {
        LiteDbManager db = new LiteDbManager();

        [HttpGet("user/get")]
        public ActionResult<User> GetUser(string userId)
        {
            ActionResult<User> ief = db.GetUser(userId);
            return ief;
        }

        [HttpPost("user/login")]
        public ActionResult<User> Login(UserTransporter transporter)
        {
            Console.WriteLine("Logging in: " + transporter.Email);
            ActionResult<User> ur = db.LoginUser(transporter);
            return ur;
        }


        [HttpPost("user/logout")]
        public ActionResult<UserTransporter> Logout(UserTransporter transporter)
        {
            if (db.LogoutUser(transporter)){
                ActionResult<UserTransporter> ut = new UserTransporter(){
                    Email = "",
                    Password = ""
                };

                return ut;
            }

            ActionResult<UserTransporter> ur = transporter;
            return ur;
        }

        [HttpPost("user/create")]
        public ActionResult<User> Create(UserTransporter transporter)
        {
            ActionResult<User> ur = db.AddUser(transporter);
            return ur;
        }
    }

    public class UserTransporter 
    {
        public string Email { get; set;}
        public string Password { get; set;}
    }

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