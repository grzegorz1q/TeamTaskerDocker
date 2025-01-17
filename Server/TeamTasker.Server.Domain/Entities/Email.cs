using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTasker.Server.Domain.Entities
{
    public class Email
    {
        public int Id { get; set; }
        public bool WasSuccessfullySent { get; set; }
        public DateTime WhenSubmitted { get; set; }
        public string TargetEmail { get; set; } = string.Empty;
        public string MessageSubject { get; set; } = string.Empty;
        public string MessageContent { get; set; } = string.Empty;
    }
}
