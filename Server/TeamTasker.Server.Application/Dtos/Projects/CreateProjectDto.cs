using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Application.Dtos.Projects
{
    public class CreateProjectDto
    {
        public string Name { get; set; } = string.Empty;
        public DateTime Deadline { get; set; }
        public ProjectStatus Status { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
