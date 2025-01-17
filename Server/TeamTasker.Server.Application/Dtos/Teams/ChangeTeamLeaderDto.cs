using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTasker.Server.Application.Dtos.Teams
{
    public class ChangeTeamLeaderDto
    {
        public int Id { get; set; }
        public int LeaderId { get; set; }
    }
}
