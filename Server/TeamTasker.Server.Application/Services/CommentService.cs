using AutoMapper;
using TeamTasker.Server.Application.Dtos.Comments;
using TeamTasker.Server.Domain.Entities;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.Application.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly IIssueRepository _issueRepository;
        private readonly IMapper _mapper;

        public CommentService(ICommentRepository commentRepository,IEmployeeRepository employeeRepository,IProjectRepository projectRepository,IIssueRepository issueRepository, IMapper mapper)
        {
            _commentRepository = commentRepository;
            _employeeRepository = employeeRepository;
            _projectRepository = projectRepository;
            _issueRepository = issueRepository;
            _mapper = mapper;
        }
        /*public void CreateComment(CreateCommentDto commentDto)
        {
            if (commentDto == null)
                throw new ArgumentNullException(nameof(commentDto));

            var comment = _mapper.Map<Comment>(commentDto);

            _commentRepository.CreateComment(comment);
        }*/

        public IEnumerable<ReadCommentDto> GetAllComments()
        {
            var comments = _commentRepository.GetAllComments();
            var commentDtos = _mapper.Map<IEnumerable<ReadCommentDto>>(comments);

            return commentDtos;
        }

        public ReadCommentDto GetComment(int id)
        {
            var comment = _commentRepository.GetComment(id);

            if (comment == null)
                return null;

            var commentDto = _mapper.Map<ReadCommentDto>(comment);

            return commentDto;
        }

        public void AddCommentToIssue(AddCommentToIssueDto commentDto, string email)
        {
            var user = _employeeRepository.GetUserByEmail(email);
            if (user == null)
                throw new Exception("User not found!");
            if (commentDto == null)
                throw new ArgumentNullException(nameof(commentDto));

            var issue = _issueRepository.GetIssue(commentDto.IssueId);
            if (issue == null)
                throw new Exception("You are trying to add a comment to an issue that does not exist!");
            commentDto.UserId = user.Id;
            var comment = _mapper.Map<Comment>(commentDto);
            _commentRepository.CreateComment(comment);
        }

        public IEnumerable<ReadCommentDto> GetIssueComments(int IssueId)
        {
            var issue = _issueRepository.GetIssue(IssueId);
            if (issue == null)
                throw new Exception("Issue not found");

            var allComments = _commentRepository.GetAllComments();
            var issueComments = allComments.Where(c => c.IssueId == IssueId);
            var commentDtos = _mapper.Map<IEnumerable<ReadCommentDto>>(issueComments); 
            
            return commentDtos;
        }

        public void DeleteComment(int id)
        {
            var comment = _commentRepository.GetComment(id);

            if (comment == null)
                throw new Exception("Comment not found.");

            _commentRepository.DeleteComment(id);
        }
    }
}
