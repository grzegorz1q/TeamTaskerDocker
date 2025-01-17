using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;
using TeamTasker.Server.Domain.Interfaces;
using TeamTasker.Server.Infrastructure.Presistence;

namespace TeamTasker.Server.Infrastructure.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly AppDbContext _appDbContext;

        //TODO: Fix issues with the database access

        public CommentRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public void CreateComment(Comment comment)
        {
            if (comment == null)
                throw new ArgumentNullException();

            _appDbContext.Comments.Add(comment);
            _appDbContext.SaveChanges();
        }
        public void UpdateComment(Comment comment)
        {
            if (comment == null)
                throw new ArgumentNullException();

            _appDbContext.Comments.Update(comment);
            _appDbContext.SaveChanges();
        }

        public IEnumerable<Comment> GetAllComments()
        {
            var allDbComments = _appDbContext.Comments.ToList();

            return allDbComments;
        }

        public Comment? GetComment(int? id)
        {
            return _appDbContext.Comments.FirstOrDefault(comment => comment.Id == id);
        }

        public void DeleteComment(int? id)
        {
            if (id == null)
                throw new ArgumentNullException();

            var commentToDelete = _appDbContext.Comments.FirstOrDefault(comment => comment.Id == id);
            if (commentToDelete != null)
            {
                _appDbContext.Comments.Remove(commentToDelete);
                _appDbContext.SaveChanges();
            }
        }
    }
}
