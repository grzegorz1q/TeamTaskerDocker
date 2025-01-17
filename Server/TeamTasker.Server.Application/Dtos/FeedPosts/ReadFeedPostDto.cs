using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.Comments;

namespace TeamTasker.Server.Application.Dtos.FeedPosts
{
    public class ReadFeedPostDto
    {
        public int Id { get; set; }
        public int ProjectIssueId { get; set; }
        public DateTime Created { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int EmployeeId { get; set; }
        public int ProjectId { get; set; }
        public virtual ICollection<ReadCommentDto> Comments { get; set; }
    }
}
