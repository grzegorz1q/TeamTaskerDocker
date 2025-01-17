using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Application.Dtos.Noitifcations
{
    public class ReadNotificationDto
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}
