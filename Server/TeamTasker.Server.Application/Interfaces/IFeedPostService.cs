using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.FeedPosts;
using TeamTasker.Server.Application.Dtos.Issues;

namespace TeamTasker.Server.Application.Interfaces
{
    public interface IFeedPostService
    {
        void CreateFeedPost(CreateFeedPostDto postDto, string email);
        IEnumerable<ReadFeedPostDto> GetAllFeedPostsFromProject(int projectId);
    }
}
