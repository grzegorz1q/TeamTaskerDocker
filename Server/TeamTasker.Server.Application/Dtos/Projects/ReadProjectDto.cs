using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.Comments;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Application.Dtos.Projects
{
    public class ReadProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Deadline { get; set; }
        public bool IsComplete { get; set; }
        public int TeamId { get; set; }
        public string? Picture { get; set; } = string.Empty;
        public ICollection<ReadCommentDto> Comments { get; set; } = default!;
        //public virtual ICollection<Issue> Issues { get; set; } = default!;
    }
}
