using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTasker.Server.Application.Dtos.Users
{
    public class AddAvatarToUserDto
    {
        public int Id { get; set; }
        public string Avatar { get; set; } = string.Empty;
    }
}
