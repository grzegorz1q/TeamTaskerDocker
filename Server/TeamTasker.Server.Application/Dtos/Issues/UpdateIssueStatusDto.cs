using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Application.Dtos.Issues
{
    public class UpdateIssueStatusDto
    {
        public int Id { get; set; }
        public IssueStatus Status { get; set; }
    }
}
