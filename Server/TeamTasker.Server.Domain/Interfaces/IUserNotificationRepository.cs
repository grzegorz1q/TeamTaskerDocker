using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Domain.Interfaces
{
    public interface IUserNotificationRepository
    {
        UserNotification? GetUserNotification(int? userId, int? notificationId);
        IEnumerable<UserNotification> GetAllUserNotifications(int userId);
        void AddUserNotification(UserNotification userNotification);
        void UpdateUserNotification(UserNotification userNotification);
        void DeleteUserNotification(int? userId, int? notificationId);
    }
}
