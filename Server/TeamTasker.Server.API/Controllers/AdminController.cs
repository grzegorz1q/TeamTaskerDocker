using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamTasker.Server.Application.Authorization;
using TeamTasker.Server.Application.Dtos.EmployeeTeam;
using TeamTasker.Server.Application.Dtos.Projects;
using TeamTasker.Server.Application.Dtos.Teams;
using TeamTasker.Server.Application.Dtos.Users;
using TeamTasker.Server.Application.Interfaces;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.API.Controllers
{
    [ApiController]
    //TODO: Add authnetication header for swagger testing
    [Authorize(Policy = AuthorizationPolicies.AdminUserPolicy)]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IProjectService _projectService;
        private readonly ITeamService _teamService;

        public AdminController(IEmployeeService employeeService, IProjectService projectService, ITeamService teamService)
        {
            _employeeService = employeeService;
            _projectService = projectService;
            _teamService = teamService;
        }

        [HttpPost]
        [Route("CreateEmployee", Name = "CreateEmployee")]
        public IActionResult CreateEmployee(CreateEmployeeDto dto)
        {
            try
            {
                _employeeService.CreateEmployee(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was no employee provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting employees : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was a problem with adding the new employee: {ex.Message}");
                return BadRequest($"There was a problem with adding the new employee: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting employees : {ex.Message}");
            }
        }

        [HttpPost]
        [Route("CreateProject", Name = "CreateProject")]
        public IActionResult CreateProject(CreateProjectDto dto)
        {
            try
            {
                _projectService.CreateProject(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was no project provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting projects : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was a problem with adding the new project: {ex.Message}");
                return BadRequest($"There was a problem with adding the new project: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting projects : {ex.Message}");
            }
        }

        [HttpPost]
        [Route("CreateTeam", Name = "CreateTeam")]
        public IActionResult CreateTeam(CreateTeamDto dto) //nie dziala
        {
            try
            {
                _teamService.CreateTeam(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was no team provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting teams : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was a problem with adding the new team: {ex.Message}");
                return BadRequest($"There was a problem with adding the new team: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting teams : {ex.Message}");
            }
        }

        [HttpPost]
        [Route("AddEmployeeToTeam", Name = "AddEmployeeToTeam")]
        public IActionResult AddEmployeeToTeam(CreateEmployeeTeamDto dto)
        {
            try
            {
                _teamService.AddEmployeeToTeam(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was no team provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting teams : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was a problem with adding the new employee: {ex.Message}");
                return BadRequest($"There was a problem with adding the new employee: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting teams : {ex.Message}");
            }
        }
        [HttpPut]
        [Route("ChangeTeamLeader", Name = "ChangeTeamLeader")]
        public IActionResult ChangeTeamLeader(ChangeTeamLeaderDto dto)
        {
            try
            {
                _teamService.ChangeTeamLeader(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was no team provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting teams : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was a problem with changing team leader: {ex.Message}");
                return BadRequest($"There was a problem with changing team leader: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting teams : {ex.Message}");
            }
        }

        [HttpPost]
        [Route("AddTeamToProject", Name = "AddTeamToProject")]
        public IActionResult AddTeamToProject(AddTeamToProjectDto dto)
        {
            try
            {
                _projectService.AddTeamToProject(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was no project provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting projects : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was a problem with adding the new project: {ex.Message}");
                return BadRequest($"There was a problem with adding the new project: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting projects : {ex.Message}");
            }
        }
    }
}
