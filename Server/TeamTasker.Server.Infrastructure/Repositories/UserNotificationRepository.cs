using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;
using TeamTasker.Server.Domain.Interfaces;
using TeamTasker.Server.Infrastructure.Presistence;

namespace TeamTasker.Server.Infrastructure.Repositories
{
    public class UserNotificationRepository : IUserNotificationRepository
    {
        private readonly AppDbContext _appDbContext;

        public UserNotificationRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public UserNotification? GetUserNotification(int? userId, int? notificationId)
        {
            return _appDbContext.UserNotifications.FirstOrDefault(e => e.UserId == userId && e.NotificationId == notificationId);
        }
        public IEnumerable<UserNotification> GetAllUserNotifications(int userId)
        {
            var allDbUserNotifications = _appDbContext.UserNotifications.Where(e => e.UserId == userId).ToList();

            return allDbUserNotifications;
        }
        public void AddUserNotification(UserNotification userNotification)
        {
            if (userNotification == null)
                throw new ArgumentNullException();

            _appDbContext.UserNotifications.Add(userNotification);
            _appDbContext.SaveChanges();
        }
        public void UpdateUserNotification(UserNotification userNotification)
        {
            if (userNotification == null)
                throw new ArgumentNullException();

            _appDbContext.UserNotifications.Update(userNotification);
            _appDbContext.SaveChanges();
        }

        public void DeleteUserNotification(int? userId, int? notificationId)
        {
            if (userId == null || notificationId == null)
                throw new ArgumentNullException();

            var userNotificationToDelete = _appDbContext.UserNotifications.FirstOrDefault(un => un.UserId == userId && un.NotificationId == notificationId);
            if (userNotificationToDelete != null)
            {
                _appDbContext.UserNotifications.Remove(userNotificationToDelete);
                _appDbContext.SaveChanges();
            }
        }

    }
}
