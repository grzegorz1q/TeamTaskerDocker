using Microsoft.AspNetCore.Mvc;

namespace TeamTasker.Server.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        public HomeController()
        {

        }

        [HttpGet("/tests/helloworld", Name = "HelloWorldAction")]
        public ActionResult GetHelloWorld()
        {
            return Ok("Hello World!");
        }
    }
}
