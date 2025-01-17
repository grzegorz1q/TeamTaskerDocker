using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.Users;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Application.Dtos.Teams
{
    public class ReadTeamDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
      //  public string ProjectName { get; set; } = string.Empty;
      //  public string LeaderName { get; set; } = string.Empty;
        public int LeaderId { get; set; }

        public ICollection<ReadEmployeeDto> Employees { get; set; } = default!;
    }
}
