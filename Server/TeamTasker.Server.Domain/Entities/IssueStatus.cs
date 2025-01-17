using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTasker.Server.Domain.Entities
{
    public enum IssueStatus
    {
        NewIssue = 1,
        InProgress = 2,
        OnHold = 3,
        IssueDone = 4
    }
}
