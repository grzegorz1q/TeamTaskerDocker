using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamTasker.Server.Application.Authorization;
using TeamTasker.Server.Application.Dtos.Projects;
using TeamTasker.Server.Application.Dtos.Teams;
using TeamTasker.Server.Application.Dtos.Users;
using TeamTasker.Server.Application.Interfaces.Authorization;
using TeamTasker.Server.Application.Services;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IJwtAuthorizationService _jwtService;

        public UserController(IEmployeeService employeeService, IJwtAuthorizationService jwtService)
        {
            _employeeService = employeeService;
            _jwtService = jwtService;
        }
        [HttpPut]
        [Authorize(Policy = AuthorizationPolicies.BothUserPolicy)]
        [Route("ChangePassword", Name = "ChangePassword")]
        public IActionResult ChangePassword(ChangePasswordDto dto)
        {
            try
            {
                var email = _jwtService.GetEmailFromToken(Request.Headers.Authorization!);
                _employeeService.ChangePassword(dto, email);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was no user provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting users : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was a problem with changing user's password: {ex.Message}");
                return BadRequest($"There was a problem with changing user's password: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting users : {ex.Message}");
            }
        }

        [HttpGet]
        [Authorize(Policy = AuthorizationPolicies.BothUserPolicy)]
        [Route("id", Name = "GetEmployee")]
        public IActionResult GetEmployee(int id)
        {
            try
            {
                var employee = _employeeService.GetEmployee(id);
                return Ok(employee);
            }
            catch (ArgumentOutOfRangeException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetById> negative user id \"{id}\" - {ex.Message}");
                return BadRequest($"User id \"{id}\" is not a valid id.");
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetById> There is no user with this id: \"{id}\" - {ex.Message}");
                return BadRequest($"There is no user with this id: \"{id}\"");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <GetById> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting user : {ex.Message}");
            }
        }

        [HttpGet]
        [Authorize(Policy = AuthorizationPolicies.BothUserPolicy)]
        [Route("email", Name = "GetUserByEmail")]
        public IActionResult GetUserByEmail(string email)
        {
            try
            {
                var user = _employeeService.GetUserByEmail(email);
                return Ok(user);
            }
            catch (ArgumentOutOfRangeException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetByEmail> negative user email \"{email}\" - {ex.Message}");
                return BadRequest($"User email \"{email}\" is not a valid email.");
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetByEmail> There is no user with this email: \"{email}\" - {ex.Message}");
                return BadRequest($"There is no user with this id: \"{email}\"");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <GetByEmail> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting user : {ex.Message}");
            }
        }

        [HttpGet]
        [Authorize(Policy = AuthorizationPolicies.LoggedInUserPolicy)]
        [Route("getPassword_id", Name = "GetUserPassword")]
        public IActionResult GetUserPasword(int id)
        {
            try
            {
                var password = _employeeService.GetUserPassword(id);
                return Ok(password);
            }
            catch (ArgumentOutOfRangeException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetById> negative user id \"{id}\" - {ex.Message}");
                return BadRequest($"User id \"{id}\" is not a valid id.");
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetById> There is no user with this id: \"{id}\" - {ex.Message}");
                return BadRequest($"There is no user with this id: \"{id}\"");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <GetById> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting user : {ex.Message}");
            }
        }

        [HttpGet]
       // [Authorize(Policy = AuthorizationPolicies.AdminUserPolicy)]
        [Route("GetAllEmployees", Name = "GetAllEmployees")]
        public ActionResult<IEnumerable<ReadEmployeeDto>> GetAllEmployees()
        {
            try
            {
                var readEmployeesDto = _employeeService.GetAllEmployees();
                return Ok(readEmployeesDto);
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> No employees were found - the table is empty!: {ex.Message}");
                return NotFound("There is no employees in the database.");
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> Received null value - either list or DbSet{ex.Message}");
                return BadRequest($"The returned data seems to be invalid: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting employees : {ex.Message}");
            }
        }

        [HttpGet]
        [Authorize(Policy = AuthorizationPolicies.BothUserPolicy)]
        [Route("GetUserName", Name = "GetUserName")]
        public IActionResult GetUserName(int id)
        {
            try
            {
                var name = _employeeService.GetUserName(id);
                return Ok(name);
            }
            catch (ArgumentOutOfRangeException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetById> negative user id \"{id}\" - {ex.Message}");
                return BadRequest($"User id \"{id}\" is not a valid id.");
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetById> There is no user with this id: \"{id}\" - {ex.Message}");
                return BadRequest($"There is no user with this id: \"{id}\"");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <GetById> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting user : {ex.Message}");
            }
        }

        [HttpGet]
        [Authorize(Policy = AuthorizationPolicies.BothUserPolicy)]
        [Route("GetUserNameAndEmail", Name = "GetUserNameAndEmail")]
        public IActionResult GetUserNameAndEmail(int id)
        {
            try
            {
                var user = _employeeService.GetUserNameAndEmail(id);
                return Ok(user);
            }
            catch (ArgumentOutOfRangeException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetById> negative user id \"{id}\" - {ex.Message}");
                return BadRequest($"User id \"{id}\" is not a valid id.");
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetById> There is no user with this id: \"{id}\" - {ex.Message}");
                return BadRequest($"There is no user with this id: \"{id}\"");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <GetById> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting user : {ex.Message}");
            }
        }

        [HttpGet]
        //TODO: Add authnetication header for swagger testing
        //[Authorize(Policy = AuthorizationPolicies.AdminUserPolicy)]
        [Route("GetAllUsers", Name = "GetAllUsers")]
        public ActionResult<IEnumerable<ReadUserDto>> GetAllUsers()
        {
            try
            {
                var readUsersDto = _employeeService.GetAllUsers();
                return Ok(readUsersDto);
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> No users were found - the table is empty!: {ex.Message}");
                return NotFound("There is no users in the database.");
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> Received null value - either list or DbSet{ex.Message}");
                return BadRequest($"The returned data seems to be invalid: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting users : {ex.Message}");
            }
        }

        [HttpPut]
        [Route("AddAvatarTouser", Name = "AddAvatarTouser")]
        public IActionResult AddAvatarTouser(AddAvatarToUserDto dto)
        {
            try
            {
                _employeeService.AddAvatarToUser(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was no user provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting users : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was a problem with changing user's avatar: {ex.Message}");
                return BadRequest($"There was a problem with changing user's avatar: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting users : {ex.Message}");
            }
        }

        [HttpGet]
        //TODO: Add authnetication header for swagger testing
        //[Authorize(Policy = AuthorizationPolicies.AdminUserPolicy)]
        [Route("GetAllEmployeeProjects", Name = "GetAllEmployeeProjects")]
        public ActionResult<IEnumerable<ReadProjectDto>> GetAllEmployeeProjects(int id)
        {
            try
            {
                var readUserProjectsDto = _employeeService.GetUserProjects(id);
                return Ok(readUserProjectsDto);
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

        [HttpDelete]
        [Route("DeleteEmployee", Name = "DeleteEmployee")]
        public IActionResult DeleteEmployee(int id)
        {
            try
            {
                _employeeService.DeleteEmployee(id);
                return Ok();
            }
            catch (ArgumentOutOfRangeException ex)
            {
                Console.WriteLine($">[TasksCtr] <Delete> Negative employee id \"{id}\" - {ex.Message}");
                return BadRequest($"Employee id \"{id}\" is not a valid id.");
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <Delete> There is no employee with this id: \"{id}\" - {ex.Message}");
                return BadRequest($"There is no employee with this id: \"{id}\"");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Delete> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while deleting the employee : {ex.Message}");
            }
        }
    }
}
