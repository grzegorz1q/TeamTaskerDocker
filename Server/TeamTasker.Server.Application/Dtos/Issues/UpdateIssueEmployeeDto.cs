using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTasker.Server.Application.Dtos.Issues
{
    public class UpdateIssueEmployeeDto
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
    }
}
