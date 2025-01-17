using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Domain.Interfaces
{
    public interface IIssueRepository
    {
        void CreateIssue(Issue issue);
        void UpdateIssue(Issue issue);
        IEnumerable<Issue> GetAllIssues();
        Issue? GetIssue(int? id);
        void DeleteIssue(int? id);
    }
}
