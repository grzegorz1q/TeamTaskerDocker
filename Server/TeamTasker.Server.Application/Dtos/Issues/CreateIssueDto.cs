using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Application.Dtos.Issues
{
    public class CreateIssueDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public IssuePriority Priority { get; set; }
      //  public StatusValue Status { get; set; } = StatusValue.NewIssue;
        public int EmployeeId { get; set; }
        public int ProjectId { get; set; }

    }
}
