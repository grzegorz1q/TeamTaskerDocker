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
    public class NotificationRepository : INotificationRepository
    {
        private readonly AppDbContext _appDbContext;

        //TODO: Fix issues with the database access

        public NotificationRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public void CreateNotification(Notification notification)
        {
            if (notification == null)
                throw new ArgumentNullException();

            _appDbContext.Notifications.Add(notification);
            _appDbContext.SaveChanges();
        }
        public void UpdateNotification(Notification notification)
        {
            if (notification == null)
                throw new ArgumentNullException();

            _appDbContext.Notifications.Update(notification);
            _appDbContext.SaveChanges();
        }

        public IEnumerable<Notification> GetAllNotifications()
        {
            var allDbNotifications = _appDbContext.Notifications.ToList();

            return allDbNotifications;
        }

        public Notification? GetNotification(int? id)
        {
            return _appDbContext.Notifications.FirstOrDefault(notification => notification.Id == id);
        }

        public void DeleteNotification(int? id)
        {
            if (id == null)
                throw new ArgumentNullException();

            var notificationToDelete = _appDbContext.Notifications.FirstOrDefault(notification => notification.Id == id);
            if (notificationToDelete != null)
            {
                _appDbContext.Notifications.Remove(notificationToDelete);
                _appDbContext.SaveChanges();
            }
        }

    }
}
