using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamTasker.Server.Application.Authorization;
using TeamTasker.Server.Application.Dtos.Noitifcations;
using TeamTasker.Server.Application.Dtos.Users;
using TeamTasker.Server.Application.Interfaces;
using TeamTasker.Server.Application.Interfaces.Authorization;
using TeamTasker.Server.Application.Services;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }
        /*[HttpPost]
        [Route("CreateNotification", Name = "CreateNotification")]
        public IActionResult CreateNotification(CreateNotificationDto dto)
        {
            try
            {
                _notificationService.CreateNotification(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was no notification provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting notifications : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was a problem with adding the new notification: {ex.Message}");
                return BadRequest($"There was a problem with adding the new notification: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting notifications : {ex.Message}");
            }
        }*/

        [HttpPost]
        [Route("AddNotificationToUser", Name = "AddNotificationToUser")]
        public IActionResult AddNotificationToUser(AddNotificationToUserDto dto)
        {
            try
            {
                _notificationService.AddNotificationToUser(dto);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was no notification provided: {ex.Message}");
                return BadRequest($"There was an unexpected error while getting notifications : {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> There was a problem with adding the new notification: {ex.Message}");
                return BadRequest($"There was a problem with adding the new notification: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Create> Unhandled exception : {ex.Message}");
                return BadRequest($"There was an unexpected error while getting notifications : {ex.Message}");
            }
        }

        [HttpGet]
        [Route("GetUserNotifications", Name = "GetUserNotifications")]
        public ActionResult<IEnumerable<ReadNotificationDto>> GetUserNotifications(int id)
        {
            try
            {
                var readNotificationsDto = _notificationService.GetUserNotifications(id);
                return Ok(readNotificationsDto);
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

        [HttpDelete]
        [Route("DeleteNotification/{notificationId}", Name = "DeleteNotification")]
        public IActionResult DeleteNotification(int notificationId)
        {
            try
            {
                _notificationService.DeleteNotification(notificationId);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($">[TasksCtr] <Delete> No notification found with id: {notificationId} - {ex.Message}");
                return NotFound($"No notification found with id: {notificationId}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($">[TasksCtr] <Delete> Unhandled exception: {ex.Message}");
                return BadRequest($"There was an unexpected error while deleting the notification: {ex.Message}");
            }
        }

    }
}
