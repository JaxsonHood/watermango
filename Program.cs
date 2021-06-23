using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

using Quartz;
using Quartz.Impl;
using Quartz.Logging;

namespace watermango
{
    public class Program
    {
        private static async Task Main(string[] args)
        {
            LogProvider.SetCurrentLogProvider(new ConsoleLogProvider());

            // Grab the Scheduler instance from the Factory
            StdSchedulerFactory factory = new StdSchedulerFactory();
            IScheduler scheduler = await factory.GetScheduler();

            // and start it off
            await scheduler.Start();

            // define the job and tie it to our HelloJob class
            IJobDetail job = JobBuilder.Create<MasterTicker>()
                .WithIdentity("job1", "group1")
                .Build();

            // Trigger the job to run now, and then repeat every 10 seconds
            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity("trigger1", "group1")
                .StartNow()
                .WithSimpleSchedule(x => x
                    .WithIntervalInSeconds(1)
                    .RepeatForever())
                .Build();

            // Tell quartz to schedule the job using our trigger
            await scheduler.ScheduleJob(job, trigger);

            CreateHostBuilder(args).Build().Run();
        }
        

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });


         // simple log provider to get something to the console
        private class ConsoleLogProvider : ILogProvider
        {
            public Logger GetLogger(string name)
            {
                return (level, func, exception, parameters) =>
                {
                    if (level >= LogLevel.Info && func != null)
                    {
                        Console.WriteLine("[" + DateTime.Now.ToLongTimeString() + "] [" + level + "] " + func(), parameters);
                    }
                    return true;
                };
            }

            public IDisposable OpenNestedContext(string message)
            {
                throw new NotImplementedException();
            }

            public IDisposable OpenMappedContext(string key, object value, bool destructure = false)
            {
                throw new NotImplementedException();
            }
        }
    }
    public class MasterTicker : IJob
    {
        LiteDbManager db = new LiteDbManager();
        public async Task Execute(IJobExecutionContext context)
        {
            List<Plant> plants = db.AllPlants();
            long currentTimeInMilliseconds = DateTime.Now.Ticks / TimeSpan.TicksPerMillisecond;

            List<Plant> plantsToUpdate = new List<Plant>();

            // Look through every plant for any active timers
            plants.ForEach((plant) => {

                // de-increment watering timer
                if (plant.WateringTimeLeft > 0 && !plant.Paused){

                    plant.WateringTimeLeft--;

                    if (plant.WateringTimeLeft == 0){
                        plant.LastWatered = currentTimeInMilliseconds;
                        plant.Watered = "Full";
                        plant.WaitingTimeLeft = plant.TimeToWait;
                    }

                    plantsToUpdate.Add(plant);

                // de-increment waiting timer
                } else if (plant.WaitingTimeLeft > 0 && plant.Watered == "Full"){
                    plant.WaitingTimeLeft--;

                    if (plant.WaitingTimeLeft == 0){
                        plant.Watered = "Semi";
                    }

                    plantsToUpdate.Add(plant);
                }
            });

            // Save plants if there are any to change
            if (plantsToUpdate.Count > 0){
                db.BatchUpdatePlants(plantsToUpdate);
                await Console.Out.WriteLineAsync("[MASTER_TICKER] - # of PLANTS: " + plants.Count + ", ~|~ Time in (ms)_"+ currentTimeInMilliseconds + " >> Updated " + plantsToUpdate.Count + " plants...");
            }
        }
    }

}
