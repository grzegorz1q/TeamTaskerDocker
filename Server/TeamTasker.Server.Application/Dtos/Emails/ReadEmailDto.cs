using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTasker.Server.Application.Dtos.Emails
{
    public class ReadEmailDto
    {
        public int Id { get; set; }
        public bool WasSuccessfullySent { get; set; }
        public string WhenSubmitted { get; set; } = null!;
        public string TargetEmail { get; set; } = null!;
        public string MessageSubject { get; set; } = null!;
        public string MessageContent { get; set; } = null!;
    }
}
