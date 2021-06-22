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

        [HttpPost("plants/save/{userId}")]
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
}