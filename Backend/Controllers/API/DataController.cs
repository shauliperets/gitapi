using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

using Microsoft.AspNetCore.Http; 

namespace Backend.Controllers.API
{
    [ApiController]
    public class DataController : ControllerBase
    {   

        string key = "json";

        [HttpGet]
        [Route("api/[controller]")]
        public string GetData()
        {
            string session = HttpContext.Session.GetString(key);

            return session;
        }

        [HttpPost]
        [Route("api/[controller]")]
        public string SaveSession(JsonElement jsonString)
        {
            JsonDocument document = JsonDocument.Parse(jsonString.ToString());

            JsonElement root = document.RootElement;

            HttpContext.Session.SetString("id", root[0].GetProperty("id").ToString());
            HttpContext.Session.SetString("avatar", root[0].GetProperty("avatar").ToString());
            HttpContext.Session.SetString("name", root[0].GetProperty("name").ToString());

            return HttpContext.Session.GetString(key);
        }
    }
}