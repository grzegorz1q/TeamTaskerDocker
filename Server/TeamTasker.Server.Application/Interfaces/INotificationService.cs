using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.Issues;
using TeamTasker.Server.Application.Dtos.Noitifcations;

namespace TeamTasker.Server.Application.Interfaces
{
    public interface INotificationService
    {
        void AddNotificationToUser(AddNotificationToUserDto dto);
        IEnumerable<ReadNotificationDto> GetUserNotifications(int userId);
        void DeleteNotification(int id);
    }
}
