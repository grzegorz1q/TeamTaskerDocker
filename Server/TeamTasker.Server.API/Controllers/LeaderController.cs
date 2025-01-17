using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamTasker.Server.Application.Authorization;
using TeamTasker.Server.Application.Dtos.EmployeeTeam;
using TeamTasker.Server.Application.Dtos.Issues;
using TeamTasker.Server.Application.Dtos.Projects;
using TeamTasker.Server.Application.Dtos.Teams;
using TeamTasker.Server.Application.Dtos.Users;
using TeamTasker.Server.Application.Interfaces;
using TeamTasker.Server.Application.Interfaces.Authorization;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaderController : ControllerBase
    {
        private readonly IJwtAuthorizationService _jwtService;
        private readonly ILeaderService _leaderService;

        public LeaderController(IJwtAuthorizationService jwtService ,ILeaderService leaderService, IIssueService issueService)
        {
            _jwtService = jwtService;
            _leaderService = leaderService;
        }
        [HttpPost]
        [Route("CreateIssue", Name = "CreateIssue")]
        public IActionResult CreateIssue(CreateIssueDto dto)
        {
            try
            {
                var email = _jwtService.GetEmailFromToken(Request.Headers.Authorization!);
                _leaderService.CreateIssue(dto, email);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was no issue provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was a problem with adding the new issue: {ex.Message}");
                return BadRequest($"There was a problem with adding the new issue: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
        }

    }
}
