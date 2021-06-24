using System;
using System.Net.WebSockets;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// Notes: This class contains all the web socket code.
//  The main job of this class is let any client app make
//  a constant connection to the server so that it can update
//  the plant state realtime. It accepts a userId and returns
//  a list of plants

namespace watermango
{
    [ApiController]
    [Route("[controller]")]
    public class WebSocketsController : ControllerBase
    {
        LiteDbManager db = new LiteDbManager();
        private readonly ILogger<WebSocketsController> _logger;

        public WebSocketsController(ILogger<WebSocketsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("/ws")]
        public async Task Get()
        {
            _logger.LogInformation("Someone is trying to connect to the socket...");
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                // Setup socket for new connection
                using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                _logger.Log(LogLevel.Information, "WebSocket connection established");
                await ClientSocketHandler(webSocket);
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }
        
        private async Task ClientSocketHandler(WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];

            try
            {
                var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                // Initial connection
                _logger.Log(LogLevel.Information, "Message received from Client");
                _logger.Log(LogLevel.Information, System.Text.Encoding.Default.GetString(buffer));

                // All after connections
                while (!result.CloseStatus.HasValue)
                {
                    var serverMsg = Encoding.UTF8.GetBytes($"Server: Hello. You said: {Encoding.UTF8.GetString(buffer)}");

                    List<Plant> pl = db.GetPlantsForUser(System.Text.Encoding.Default.GetString(buffer));

                    // Turn into json string to send to front-end
                    var data = Newtonsoft.Json.JsonConvert.SerializeObject(pl);
                    var encoded = Encoding.UTF8.GetBytes(data);
                    var buffer2 = new ArraySegment<Byte>(encoded, 0, encoded.Length);

                    // Send the data to client
                    await webSocket.SendAsync(buffer2, result.MessageType, result.EndOfMessage, CancellationToken.None);

                    result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                }

                await webSocket.CloseOutputAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
                _logger.Log(LogLevel.Information, "WebSocket connection closed");
            }
            catch (Exception ex)
            {
                if (ex.Data != null){
                    // Do something with params
                }

                // Get rid of socket instance after connection lost
                webSocket.Dispose();
                _logger.Log(LogLevel.Warning, "Client connection disconnected...");
            }
        }
    }
}