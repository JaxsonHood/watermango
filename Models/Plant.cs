using System;

namespace watermango {
    public class Plant
    {
        public string ID { get; set; }
        public string Title { get; set; }
        public int WaterTime { get; set; }
        public int TimeToWait { get; set;}
        public string Watered { get; set; }

        public long LastWatered { get; set; }

        public long StartedWateringAt { get; set; }

        public long PausedAt { get; set; }
        public Plant()
        {}
        public Plant(string id, string title, int waterTime, string watered, int timeToWait, long lastWatered)
        {
            this.ID = id; 
            this.Title = title; 
            
            this.WaterTime = waterTime; this.Watered = watered; this.TimeToWait = timeToWait; this.LastWatered = lastWatered;

            this.StartedWateringAt = -1;
            this.PausedAt = -1;
        }
    }
}