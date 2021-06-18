using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace watermango {

    [ApiController]
    public class PlantController : ControllerBase
    {
        LiteDbManager db = new LiteDbManager();

        [HttpGet("plants/all/{userId}")]
        public ActionResult<IEnumerable<Plant>> GetAll(string userId)
        {
            ActionResult<IEnumerable<Plant>> ief = db.GetPlantsForUser(userId);
            return ief;
        }

        [HttpPost("plants/add/{userId}")]
        public void Add(Plant plant, string userId)
        {
            db.AddEditPlant(plant, userId);
        }

        [HttpPost("plants/remove/{userId}")]
        public void Remove(Plant plant, string userId)
        {
            db.RemovePlant(plant, userId);
        }
    }

    public class Plant
    {
        public string ID { get; set; }
        public string Title { get; set; }
        public int WaterTime { get; set; }
        public int TimeToWait { get; set;}
        public string Watered { get; set; }

        public long LastWatered { get; set; }
        public Plant()
        {}
        public Plant(string id, string title, int waterTime, string watered, int timeToWait, long lastWatered)
        {
            this.ID = id; 
            this.Title = title; 
            
            this.WaterTime = waterTime; this.Watered = watered; this.TimeToWait = timeToWait; this.LastWatered = lastWatered;
        }
    }
}