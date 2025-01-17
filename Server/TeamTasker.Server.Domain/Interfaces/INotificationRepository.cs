using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Domain.Interfaces
{
    public interface INotificationRepository
    {
        void CreateNotification(Notification notification);
        void UpdateNotification(Notification notification);
        IEnumerable<Notification> GetAllNotifications();
        Notification? GetNotification(int? id);
        void DeleteNotification(int? id);
    }
}
