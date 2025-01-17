using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTasker.Server.Domain.Entities
{
    public enum ProjectStatus
    {
        OnTheRightPath = 1,
        OnHold = 2,
        Finished = 3,
        CriticallyOffThePath = 4
    }
}
