using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTasker.Server.Domain.Entities
{
    public class EmployeeTeam
    {
        public virtual Employee Employee { get; set; } = default!;
        public int EmployeeId { get; set; }
        public virtual Team Team { get; set; } = default!;
        public int TeamId { get; set; }
    }
}
