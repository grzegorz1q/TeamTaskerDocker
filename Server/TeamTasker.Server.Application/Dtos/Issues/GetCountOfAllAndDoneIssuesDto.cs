using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTasker.Server.Application.Dtos.Issues
{
    public class GetCountOfAllAndDoneIssuesDto
    {
        public int DoneIssues { get; set; }
        public int AllIssues { get; set; }
    }
}
