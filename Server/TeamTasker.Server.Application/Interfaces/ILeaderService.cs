using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.Issues;

namespace TeamTasker.Server.Application.Interfaces
{
    public interface ILeaderService
    {
        void CreateIssue(CreateIssueDto issueDto, string email);
    }
}
