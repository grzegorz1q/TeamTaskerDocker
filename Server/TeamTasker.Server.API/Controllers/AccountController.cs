using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TeamTasker.Server.Application.Authorization;
using TeamTasker.Server.Application.Dtos.Users;
using TeamTasker.Server.Application.Interfaces.Authorization;
using TeamTasker.Server.Domain.Interfaces;
using TeamTasker.Server.Application.Services;
using TeamTasker.Server.Application.Interfaces;

namespace TeamTasker.Server.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IJwtAuthorizationService _jwtService;

        public AccountController(/*IEmployeeService employeeService,*/ IJwtAuthorizationService jwtService)
        {
            //_employeeService = employeeService;
            _jwtService = jwtService;
        }

        [AllowAnonymous]
        [HttpPost("login/credentials", Name = "UserLogin")]
        public ActionResult LoginRequest(LoginDto loginUserDto)
        {
            try
            {
                _jwtService.GetUserToken(loginUserDto, Response);
            }
            catch (KeyNotFoundException)
            {
                return Unauthorized("The email address or password is incorrect.");
            }
            catch (ArgumentNullException)
            {
                return BadRequest("One of the passed values is null.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest($"There was an issue with encoding credentials data: {ex}");
            }
            catch (Exception ex) 
            {
                return BadRequest($"An unexcpeted error occrued: {ex.Message}");
            }

            return Ok("Login was successfull - the Token also has been created successfully.");
        }

        [AllowAnonymous]
        [HttpGet("login/tests/getroleid", Name = "TestGetRoleId")]
        public ActionResult<int> GetUserRoleId()
        {
            var userIdRole = _jwtService.GetUserRoleFromToken(Request.Headers.Authorization!);

            return Ok($"User has roleId: {userIdRole}");
        }

        [Authorize(Policy = AuthorizationPolicies.LoggedInUserPolicy)]
        [HttpGet("authorize/loggedin", Name = "VerifyLoggedInUser")]
        public ActionResult VerifyLoggedInUserPermission()
        {
            try
            {
                _jwtService.CheckIfHasLoggedInUserPermission(Request.Headers.Authorization);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("You don't have enough permissions, to access this page.");
            }
            catch (SecurityTokenExpiredException)
            {
                return Unauthorized("Your sessions has expired.");
            }
            catch (ArgumentNullException)
            {
                return Unauthorized("There was no identity token provided.");
            }
            catch (Exception ex)
            {
                return BadRequest($"An unexpected error has occured: {ex.Message}");
            }

            return Ok("User is allowed to use this resource.");
        }

        [Authorize(Policy = AuthorizationPolicies.AdminUserPolicy)]
        [HttpGet("authorize/admin", Name = "VerifyAdminUser")]
        public IActionResult VerifyAdminPermission()
        {
            try
            {
                _jwtService.CheckIfHasAdminPermission(Request.Headers.Authorization);
            }
            catch (UnauthorizedAccessException)
            {
                Console.WriteLine("You don't have enough permissions, to access this admin page.");
                return Unauthorized("You don't have enough permissions, to access this admin page.");
            }
            catch (SecurityTokenExpiredException)
            {
                Console.WriteLine("Your sessions has expired.");
                return Unauthorized("Your sessions has expired.");
            }
            catch (ArgumentNullException)
            {
                Console.WriteLine("There was no identity token provided.");
                return Unauthorized("There was no identity token provided.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An unexpected error has occured: {ex.Message}");
                return BadRequest($"An unexpected error has occured: {ex.Message}");
            }

            return Ok("User is allowed to use this admin resource.");
        }

        [Authorize(Policy = AuthorizationPolicies.LoggedInUserPolicy)]
        [HttpGet("authorize/leader", Name = "VerifyProjectLeader")]
        public ActionResult VerifyProjectLeader(/*int Project Id*/)
        {
            try
            {
                _jwtService.CheckIfLeaderOfTheProject(Request.Headers.Authorization);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("You don't have enough permissions, to access leader reasource.");
            }
            catch (SecurityTokenExpiredException)
            {
                return Unauthorized("Your sessions has expired.");
            }
            catch (ArgumentNullException)
            {
                return Unauthorized("There was no identity token provided.");
            }
            catch (Exception ex)
            {
                return BadRequest($"An unexpected error has occured: {ex.Message}");
            }

            return Ok("User is allowed to use this leader resource.");
        }

        [AllowAnonymous]
        [HttpGet("authorize/email", Name = "GetEmailFromToken")]
        public ActionResult<string> GetEmailFromToken()
        {
            try
            {
                var userEmail = _jwtService.GetEmailFromToken(Request.Headers.Authorization);
                return Ok(userEmail);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("You don't have enough permissions, to access this reasource.");
            }
            catch (SecurityTokenExpiredException)
            {
                return Unauthorized("Your sessions has expired.");
            }
            catch (ArgumentNullException)
            {
                return Unauthorized("There was no identity token provided.");
            }
            catch (Exception ex)
            {
                return BadRequest($"An unexpected error has occured: {ex.Message}");
            }
        }
        [HttpGet]
        [Route("authorize/IsLeader", Name = "IsLeader")]
        public IActionResult IsLeader(int projectId)
        {
            try
            {
                var email = _jwtService.GetEmailFromToken(Request.Headers.Authorization!);
                var isLeader = _jwtService.IsLeader(email, projectId);
                return Ok(isLeader);
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> No projects were found - the table is empty!: {ex.Message}");
                return NotFound("There is no projects in the database.");
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> Received null value - either list or DbSet{ex.Message}");
                return BadRequest($"The returned data seems to be invalid: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting projects : {ex.Message}");
            }
        }
    }
}
