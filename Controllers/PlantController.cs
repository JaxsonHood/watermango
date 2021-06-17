using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace watermango {

    [ApiController]
    public class PlantController : ControllerBase
    {
        LiteDbManager db = new LiteDbManager();

        [HttpGet("plants/all")]
        public ActionResult<IEnumerable<Plant>> GetAll()
        {
            ActionResult<IEnumerable<Plant>> ief = db.AllPlants();
            return ief;
        }

        [HttpPost("plants/add")]
        public void Add(Plant plant)
        {
            db.AddEditPlant(plant);
        }

        [HttpPost("plants/remove")]
        public void Remove(Plant plant)
        {
            db.RemovePlant(plant);
        }
    }

    public class Plant
    {
        public string ID { get; set; }
        public string Title { get; set; }
        public int WaterTime { get; set; }

        public int TimeToWait { get; set;}

        public string Watered { get; set; }

        public Plant()
        {}

        public Plant(string id, string title, int waterTime, string watered, int timeToWait)
        {
            this.ID = id; 
            this.Title = title; 
            
            this.WaterTime = waterTime; this.Watered = watered; this.TimeToWait = timeToWait;
        }
    }
}