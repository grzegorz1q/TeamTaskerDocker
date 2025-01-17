using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Application.Dtos.Projects
{
    public class AddTeamToProjectDto
    {
        public int Id { get; set; }
        public int TeamId { get; set; }
    }
}
