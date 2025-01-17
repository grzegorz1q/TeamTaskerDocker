using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTasker.Server.Domain.Entities
{
    public class UserNotification
    {
        public virtual User User { get; set; } = default!;
        public int UserId { get; set; }
        public virtual Notification Notification { get; set; } = default!;
        public int NotificationId { get; set; }
    }
}
