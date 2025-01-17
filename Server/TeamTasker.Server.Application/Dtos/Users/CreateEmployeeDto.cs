using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTasker.Server.Application.Dtos.Users
{
    public class CreateEmployeeDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public int RoleId { get; set; } = 2;
        public string Email { get; set; } = string.Empty;
       // public string Password { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
    }
}
