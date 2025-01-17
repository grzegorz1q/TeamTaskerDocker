using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamTasker.Server.Application.Authorization;
using TeamTasker.Server.Application.Dtos.Issues;
using TeamTasker.Server.Application.Interfaces;
using TeamTasker.Server.Application.Services;
using TeamTasker.Server.Domain.Entities;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IssueController : ControllerBase
    {
        private readonly IIssueService _issueService;

        public IssueController(IIssueService issueService)
        {
            _issueService = issueService;
        }
        [HttpGet]
        [Route("GetAllIssues", Name = "GetAllIssues")]
        public IActionResult GetAllIssue()
        {
            try
            {
                var issue = _issueService.GetAllIssues();
                return Ok(issue);
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

        [HttpGet]
        [Route("GetNewIssues", Name = "GetNewIssues")]
        public IActionResult GetNewIssues(int projectId)
        {
            try
            {
                var issue = _issueService.GetNewIssues(projectId);
                return Ok(issue);
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
        [HttpGet]
        [Route("GetInProgressIssues", Name = "GetInProgressIssues")]
        public IActionResult GetInProgressIssues(int projectId)
        {
            try
            {
                var issue = _issueService.GetInProgressIssues(projectId);
                return Ok(issue);
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
        [HttpGet]
        [Route("GetOnHoldIssues", Name = "GetOnHoldIssues")]
        public IActionResult GetOnHoldIssues(int projectId)
        {
            try
            {
                var issue = _issueService.GetOnHoldIssues(projectId);
                return Ok(issue);
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
        [HttpGet]
        [Route("GetDoneIssues", Name = "GetDoneIssues")]
        public IActionResult GetDoneIssues(int projectId)
        {
            try
            {
                var issue = _issueService.GetDoneIssues(projectId);
                return Ok(issue);
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

        [HttpGet]
        [Route("GetCountOfAllAndDoneIssues", Name = "GetCountOfAllAndDoneIssues")]
        public IActionResult GetCountOfAllAndDoneIssues(int projectId)
        {
            try
            {
                var issue = _issueService.GetCountOfAllAndDoneIssues(projectId);
                return Ok(issue);
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
        

        [HttpGet]
        [Route("GetIssueAssignedToEmployee", Name = "GetIssueAssignedToEmployee")]
        public IActionResult GetIssueAssignedToEmployee(int id)
        {
            try
            {
                var issue = _issueService.GetIssueAssignedToEmployee(id);
                return Ok(issue);
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

        [HttpGet]
        [Route("GetIssueByPriority", Name = "GetIssueByPriority")]
        public IActionResult GetIssueByPriority(IssuePriority priority)
        {
            try
            {
                var issue = _issueService.GetIssueByPriority(priority);
                return Ok(issue);
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

        [HttpGet]
        [Route("GetAllIssuesFromProject", Name = "GetAllIssuesFromProject")]
        public IActionResult GetAllIssuesFromProject(int projectId)
        {
            try
            {
                var issues = _issueService.GetAllIssuesFromProject(projectId);
                return Ok(issues);
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> No issues were found - the table is empty!: {ex.Message}");
                return NotFound("There is no issues in the database.");
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> Received null value - either list or DbSet{ex.Message}");
                return BadRequest($"The returned data seems to be invalid: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
        }

        [HttpGet]
        [Route("GetScheduleTime", Name = "GetScheduleTime")]
        public IActionResult GetScheduleTime(int Id)
        {
            try
            {
                var issue = _issueService.GetScheduleTime(Id);
                return Ok(issue);
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

        [HttpGet]
        [Route("GetEmployeeIssuesFromProject", Name = "GetEmployeeIssuesFromProject")]
        public IActionResult GetEmployeeIssuesFromProject(int employeeId, int projectId)
        {
            try
            {
                var issues = _issueService.GetEmployeeIssuesFromProject(employeeId, projectId);
                return Ok(issues);
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> No issues were found - the table is empty!: {ex.Message}");
                return NotFound("There is no issues in the database.");
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> Received null value - either list or DbSet{ex.Message}");
                return BadRequest($"The returned data seems to be invalid: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
        }

        

        [HttpPut]
        [Route("UpdateIssueStartDate", Name = "UpdateIssueStartDate")]
        public IActionResult UpdateIssueStartDate(UpdateIssueStartDateDto dto)
        {
            try
            {
                _issueService.UpdateIssueStartDate(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> There was no issue provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> There was a problem with adding the new issue: {ex.Message}");
                return BadRequest($"There was a problem with adding the new issue: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
        }

        [HttpPut]
        [Route("UpdateIssueEndtDate", Name = "UpdateIssueEndtDate")]
        public IActionResult UpdateIssueEndtDate(UpdateIssueEndDateDto dto)
        {
            try
            {
                _issueService.UpdateIssueEndDate(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> There was no issue provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> There was a problem with adding the new issue: {ex.Message}");
                return BadRequest($"There was a problem with adding the new issue: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
        }
        [HttpPut]
        //[Authorize(Policy = AuthorizationPolicies.BothUserPolicy)]
        [Route("UpdateIssueName", Name = "UpdateIssueName")]
        public IActionResult UpdateIssueName(UpdateIssueNameDto dto)
        {
            try
            {
                _issueService.UpdateIssueName(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> There was no issue provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> There was a problem with adding the new issue: {ex.Message}");
                return BadRequest($"There was a problem with adding the new issue: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
        }
        [HttpPut]
        //[Authorize(Policy = AuthorizationPolicies.BothUserPolicy)]
        [Route("UpdateIssueDescription", Name = "UpdateIssueDescription")]
        public IActionResult UpdateIssueDescription(UpdateIssueDescriptionDto dto)
        {
            try
            {
                _issueService.UpdateIssueDescription(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> There was no issue provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> There was a problem with adding the new issue: {ex.Message}");
                return BadRequest($"There was a problem with adding the new issue: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
        }
        [HttpPut]
        [Route("UpdateIssueStatus", Name = "UpdateIssueStatus")]
        public IActionResult UpdateIssueStatus(UpdateIssueStatusDto dto)
        {
            try
            {
                _issueService.UpdateIssueStatus(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> There was no issue provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> There was a problem with adding the new issue: {ex.Message}");
                return BadRequest($"There was a problem with adding the new issue: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
        }

        [HttpPut]
        [Route("UpdateIssuePriority", Name = "UpdateIssuePriority")]
        public IActionResult UpdateIssuePriority(UpdateIssuePriorityDto dto)
        {
            try
            {
                _issueService.UpdateIssuePriority(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> There was no issue provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> There was a problem with adding the new issue: {ex.Message}");
                return BadRequest($"There was a problem with adding the new issue: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
        }

        [HttpPut]
        [Route("UpdateIssueEmployee", Name = "UpdateIssueEmployee")]
        public IActionResult UpdateIssueEmployee(UpdateIssueEmployeeDto dto)
        {
            try
            {
                _issueService.UpdateIssueEmployee(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> There was no issue provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> There was a problem with adding the new issue: {ex.Message}");
                return BadRequest($"There was a problem with adding the new issue: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Update> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting issues : {ex.Message}");
            }
        }

        [HttpDelete]
        [Route("DeleteIssue", Name = "DeleteIssue")]
        public IActionResult DeleteIssue(int issueId)
        {
            try
            {
                _issueService.DeleteIssue(issueId);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <Delete> Issue not found: {ex.Message}");
                return NotFound("The issue was not found.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Delete> Unhandled exception: {ex.Message}");
                return BadRequest($"An unexpected error occurred while deleting the issue: {ex.Message}");
            }
        }
    }
}
