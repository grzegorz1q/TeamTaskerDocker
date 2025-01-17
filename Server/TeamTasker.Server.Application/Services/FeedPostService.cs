using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.FeedPosts;
using TeamTasker.Server.Application.Dtos.Issues;
using TeamTasker.Server.Application.Interfaces;
using TeamTasker.Server.Domain.Entities;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.Application.Services
{
    public class FeedPostService : IFeedPostService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IIssueRepository _issueRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly IMapper _mapper;

        public FeedPostService(IEmployeeRepository employeeRepository, IIssueRepository issueRepository, IProjectRepository projectRepository,IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _issueRepository = issueRepository;
            _projectRepository = projectRepository;
            _mapper = mapper;
        }
        public void CreateFeedPost(CreateFeedPostDto postDto, string email)
        {
            var user = _employeeRepository.GetUserByEmail(email);
            if (user == null)
                throw new Exception("User not found!");
            if (postDto == null)
                throw new ArgumentNullException(nameof(postDto));

            var project = _projectRepository.GetProject(postDto.ProjectId);
            if (project == null)
                throw new Exception("You are trying to add a post to a project that does not exist!");

            var post = _mapper.Map<Issue>(postDto);

            var feedPostCount = project.Issues.Where(i => i.isFeedPost == true).Count();
            post.ProjectIssueId = feedPostCount + 1;

            post.EmployeeId = user.Id;
            post.isFeedPost = true;
            post.StartDate = DateTime.Now;
            _issueRepository.CreateIssue(post);
        }

        public IEnumerable<ReadFeedPostDto> GetAllFeedPostsFromProject(int projectId)
        {
            var project = _projectRepository.GetProject(projectId);
            if (project == null)
                throw new Exception("Project not found!");

            var posts = project.Issues.Where(p=>p.isFeedPost == true).ToList();
            var postDtos = _mapper.Map<IEnumerable<ReadFeedPostDto>>(posts);
            return postDtos;
        }
    }
}
