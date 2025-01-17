using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.Users;

namespace TeamTasker.Server.Application.Dtos.Teams
{
    public class CreateTeamDto
    {
        public string Name { get; set; } = string.Empty;
       // public ICollection<ReadEmployeeDto> Employees { get; set; } = default!;
        public int LeaderId { get; set; }
    }
}
