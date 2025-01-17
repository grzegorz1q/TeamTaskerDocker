using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;
using TeamTasker.Server.Application.Dtos.Users;

namespace TeamTasker.Server.Application.Dtos.Comments
{
    public class ReadCommentDto
    {
        public int Id { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Content { get; set; } = string.Empty;
        public int IssueId { get; set; }
        public int UserId { get; set;}
        
        //public int? ProjectId { get; set; }   Maybe usable to forum functionality

        //public virtual ICollection<ReadUserDto> Users { get; set; } = default!;
    }
}
