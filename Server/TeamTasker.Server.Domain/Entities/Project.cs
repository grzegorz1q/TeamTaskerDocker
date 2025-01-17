using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTasker.Server.Domain.Entities
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime Deadline { get; set; }
        public ProjectStatus Status { get; set; } = ProjectStatus.OnTheRightPath;
        public string Description { get; set; } = string.Empty;
        public bool IsComplete { get; set; } = false;
        public virtual Team Team { get; set; } = default!;
        public int? TeamId { get; set; }  
        public virtual ICollection<Issue> Issues { get; set; } = default!;
        public virtual ICollection<Comment> Comments { get; set; } = default!;
        public string Picture { get; set; } = string.Empty;

    }
}
