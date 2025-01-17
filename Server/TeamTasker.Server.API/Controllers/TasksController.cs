using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamTasker.Server.Application.Dtos.Emails;
using TeamTasker.Server.Application.Interfaces;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITasksService _taskService;
        private readonly IGmailServiceClient _gmailClient;

        public TasksController(ITasksService taskService, IGmailServiceClient gmailClient)
        {
            _taskService = taskService;
            _gmailClient = gmailClient;
        }

        [HttpGet]
        [Route("/SendTestEmail", Name = "SendEmail")]
        public async Task<IActionResult> SendEmail(string targetEmail, string emailSubject, string emailContent)
        {
            try
            {
                await _gmailClient.SendEmailAsync(targetEmail, emailSubject, emailContent);
                return Ok("Email was delivered successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"There was an error while sending and email.... {ex.Message}");
                return BadRequest($"There was an error while sending and email.... {ex.Message}");
            }
        }

        [HttpGet]
        [Route("", Name = "GetAllEmailEntries")]
        public ActionResult<IEnumerable<ReadEmailDto>> GetAllEmailEntries()
        {
            try
            {
                var readEmailEntriesDto = _taskService.GetAllEmailEntries();
                return Ok(readEmailEntriesDto);
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> No entries were found - the table is empty!: {ex.Message}");
                return NotFound("There is no email entries in the database.");
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> Received null value - either list or DbSet{ex.Message}");
                return BadRequest($"The returned data seems to be invalid: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <GetAll> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting email entries : {ex.Message}");
            }
        }

        [HttpGet]
        [Route("{emailEntryId}", Name = "GetEmailEntryById")]
        public ActionResult<ReadEmailDto> GetEmailEntryById(int emailEntryId)
        {
            try
            {
                var emailEntryReadDto = _taskService.GetEmailEntry(emailEntryId);
                return Ok(emailEntryReadDto);
            }
            catch (ArgumentOutOfRangeException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetById> negative email id \"{emailEntryId}\" - {ex.Message}");
                return BadRequest($"Email id \"{emailEntryId}\" is not a valid id.");
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <GetById> There is no email entry with this id: \"{emailEntryId}\" - {ex.Message}");
                return BadRequest($"There is no email entry with this id: \"{emailEntryId}\"");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <GetById> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting email entries : {ex.Message}");
            }
        }

        [HttpPost]
        [Route("", Name = "CreateEmailEntry")]
        public async Task<ActionResult> CreateEmailEntry(CreateEmailDto createEmailEntryDto)
        {
            try
            {
                var createdEmailEntryReadDto = await _taskService.CreateEmailEntry(createEmailEntryDto);
                return CreatedAtRoute(nameof(GetEmailEntryById), new { emailEntryId = createdEmailEntryReadDto.Id }, createdEmailEntryReadDto);
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was no email entry provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting email entries : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was a problem with adding the new email entry: {ex.Message}");
                return BadRequest($"There was a problem with adding the new email entry: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting email entries : {ex.Message}");
            }
        }
    }
}
