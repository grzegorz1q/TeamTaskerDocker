using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTasker.Server.Application.Dtos.Users
{
    public class ChangePasswordDto
    {
        public string NewPassword { get; set; } = string.Empty;
    }
}
