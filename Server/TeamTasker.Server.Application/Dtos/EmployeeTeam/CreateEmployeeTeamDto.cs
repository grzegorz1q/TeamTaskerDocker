using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTasker.Server.Application.Dtos.EmployeeTeam
{
    public class CreateEmployeeTeamDto
    {
        public int EmployeeId { get; set; }
        public int TeamId { get; set; }
    }
}
