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
}