using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Domain.Interfaces
{
    public interface ICommentRepository
    {
        void CreateComment(Comment comment);
        void UpdateComment(Comment comment);
        IEnumerable<Comment> GetAllComments();
        Comment? GetComment(int? id);
        void DeleteComment(int? id);
    }
}
