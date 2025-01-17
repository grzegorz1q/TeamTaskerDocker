using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamTasker.Server.Application.Authorization;
using TeamTasker.Server.Application.Dtos.Comments;
using TeamTasker.Server.Application.Dtos.Users;
using TeamTasker.Server.Application.Interfaces;
using TeamTasker.Server.Application.Interfaces.Authorization;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly IJwtAuthorizationService _jwtService;

        public CommentController(ICommentService commentService, IJwtAuthorizationService jwtService)
        {
            _commentService = commentService;
            _jwtService = jwtService;
        }


        [HttpPost]
        //[Authorize(Policy = AuthorizationPolicies.BothUserPolicy)]
        [Route("AddCommentToIssue", Name = "AddCommentToIssue")]
        public IActionResult AddCommentToIssue(AddCommentToIssueDto dto)
        {
            try
            {
                var email = _jwtService.GetEmailFromToken(Request.Headers.Authorization!);
                _commentService.AddCommentToIssue(dto, email);
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

        [HttpGet]
        //[Authorize(Policy = AuthorizationPolicies.BothUserPolicy)]
        [Route("GetIssueComments", Name = "GetIssueComments")]
        public ActionResult<IEnumerable<ReadCommentDto>> GetIssueComments(int IssueId)
        {
            try
            {
                var comment = _commentService.GetIssueComments(IssueId);
                return Ok(comment);
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
        [Route("GetAllComments", Name = "GetAllComments")]
        public IActionResult GetAllComments()
        {
            try
            {
                var comment = _commentService.GetAllComments();
                return Ok(comment);
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
        [Route("DeleteComment", Name = "DeleteComment")]
        public IActionResult DeleteComment(int commentId)
        {
            try
            {
                _commentService.DeleteComment(commentId);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <Delete> Comment not found: {ex.Message}");
                return NotFound("The comment was not found.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Delete> Unhandled exception: {ex.Message}");
                return BadRequest($"An unexpected error occurred while deleting the comment: {ex.Message}");
            }
        }

    }
}
