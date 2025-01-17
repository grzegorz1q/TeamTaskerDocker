using AutoMapper;
using TeamTasker.Server.Application.Dtos.Issues;
using TeamTasker.Server.Application.Interfaces.Authorization;
using TeamTasker.Server.Domain.Entities;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.Application.Services
{
    public class IssueService : IIssueService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IIssueRepository _issueRepository;
        private readonly IMapper _mapper;

        public IssueService(IIssueRepository issueRepository, IEmployeeRepository employeeRepository, IProjectRepository projectRepository,ITeamRepository teamRepository, IMapper mapper)
        {
            _issueRepository = issueRepository;
            _employeeRepository = employeeRepository;
            _projectRepository = projectRepository;
            _teamRepository = teamRepository;
            _mapper = mapper;
        }

        public IEnumerable<ReadIssueDto> GetAllIssues()
        {
            var issues = _issueRepository.GetAllIssues();
            var issueDtos = _mapper.Map<IEnumerable<ReadIssueDto>>(issues);

            return issueDtos;
        }

        public ReadIssueDto GetIssue(int id)
        {
            var issue = _issueRepository.GetIssue(id);

            if (issue == null)
                return null;

            var issueDto = _mapper.Map<ReadIssueDto>(issue);
            return issueDto;
        }

        public IEnumerable<GetIssueAssignedToEmployeeDto> GetIssueAssignedToEmployee(int employeeId)
        {
            var issue = _issueRepository.GetAllIssues().Where(issue => issue.EmployeeId == employeeId);

            var issueDtos = _mapper.Map<IEnumerable<GetIssueAssignedToEmployeeDto>>(issue);
            return issueDtos;

        }

        public IEnumerable<GetIssueByPriorityDto> GetIssueByPriority(IssuePriority prioroty)
        {
            var issue = _issueRepository.GetAllIssues().Where(issue => issue.Priority == prioroty);

            var issueDtos = _mapper.Map<IEnumerable<GetIssueByPriorityDto>>(issue);
            return issueDtos;
        }

        public IEnumerable<ReadIssueDto> GetAllIssuesFromProject(int projectId)
        {
            var project = _projectRepository.GetProject(projectId);
            if (project == null)
                throw new Exception("Project not found!");

            var issues = project.Issues.Where(i=>i.isFeedPost==false).ToList();
            var issueDtos = _mapper.Map<IEnumerable<ReadIssueDto>>(issues);
            return issueDtos;
        }
        public IEnumerable<ReadIssueDto> GetEmployeeIssuesFromProject(int employeeId, int projectId)
        {
            var employee =_employeeRepository.GetEmployee(employeeId);
            if (employee == null)
                throw new Exception("Employee not found!");
            var employeeTeams = employee.EmployeeTeams.Select(t => t.Team).ToList();
            var project = employeeTeams.Select(p=>p.Project).FirstOrDefault(p=>p.Id==projectId);
            if (employee == null || project == null)
                throw new Exception("Wrong employee or project id!");
            var issues = project.Issues.Where(i => i.EmployeeId == employeeId);
            var issueDtos = _mapper.Map<IEnumerable<ReadIssueDto>>(issues);
            return issueDtos;
        }
        public void UpdateIssueName(UpdateIssueNameDto dto) { 
            if(dto == null)
                throw new ArgumentNullException(nameof(dto));
            var issue = _issueRepository.GetIssue(dto.Id);
            if (issue == null)
                throw new Exception("Issue not found!");
            issue.Name = dto.Name;
            _issueRepository.UpdateIssue(issue);
        }
        public void UpdateIssueDescription(UpdateIssueDescriptionDto dto) {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));
            var issue = _issueRepository.GetIssue(dto.Id);
            if (issue == null)
                throw new Exception("Issue not found!");
            issue.Description = dto.Description;
            _issueRepository.UpdateIssue(issue);
        }
        public void UpdateIssueStatus(UpdateIssueStatusDto dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));
            var issue = _issueRepository.GetIssue(dto.Id);
            if (issue == null)
                throw new Exception("Issue not found!");
            issue.Status = dto.Status;
            _issueRepository.UpdateIssue(issue);
        }
        public void UpdateIssuePriority(UpdateIssuePriorityDto dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));
            var issue = _issueRepository.GetIssue(dto.Id);
            if (issue == null)
                throw new Exception("Issue not found!");
            issue.Priority = dto.Priority;
            _issueRepository.UpdateIssue(issue);
        }
        public void UpdateIssueEmployee(UpdateIssueEmployeeDto dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));
            var issue = _issueRepository.GetIssue(dto.Id);
            if (issue == null)
                throw new Exception("Issue not found!");
            var project = _projectRepository.GetProject(issue.ProjectId);
            if (project == null)
                throw new Exception("Issue have not project assigned!");
            var team = _teamRepository.GetTeam(project.TeamId);
            if (team == null)
                throw new Exception("No team assigned in issue's project!");
            var employees = team.EmployeeTeams.Select(e => e.Employee).ToList();
            if (!employees.Any(e => e.Id == dto.EmployeeId))
                throw new Exception("Employee is not in this project");
            issue.EmployeeId = dto.EmployeeId;
            _issueRepository.UpdateIssue(issue);
        }
        public IEnumerable<ReadIssueDto> GetNewIssues(int projectId)
        {
            var project = _projectRepository.GetProject(projectId);
            if (project == null)
                throw new Exception("Project not found!");

            var newIssues = project.Issues.Where(issue => issue.Status == IssueStatus.NewIssue);
            var newIssueDtos = _mapper.Map<IEnumerable<ReadIssueDto>>(newIssues);
            return newIssueDtos;
        }
        
        public IEnumerable<ReadIssueDto> GetInProgressIssues(int projectId)
        {
            var project = _projectRepository.GetProject(projectId);
            if (project == null)
                throw new Exception("Project not found!");

            var inProgressIssues = project.Issues.Where(issue => issue.Status == IssueStatus.InProgress);
            var inProgressIssueDtos = _mapper.Map<IEnumerable<ReadIssueDto>>(inProgressIssues);
            return inProgressIssueDtos;
        }

        public IEnumerable<ReadIssueDto> GetOnHoldIssues(int projectId)
        {
            var project = _projectRepository.GetProject(projectId);
            if (project == null)
                throw new Exception("Project not found!");

            var onHoldIssues = project.Issues.Where(issue => issue.Status == IssueStatus.OnHold);
            var onHoldIssueDtos = _mapper.Map<IEnumerable<ReadIssueDto>>(onHoldIssues);
            return onHoldIssueDtos;
        }

        public IEnumerable<ReadIssueDto> GetDoneIssues(int projectId)
        {
            var project = _projectRepository.GetProject(projectId);
            if (project == null)
                throw new Exception("Project not found!");

            var doneIssues = project.Issues.Where(issue => issue.Status == IssueStatus.IssueDone);
            var doneIssueDtos = _mapper.Map<IEnumerable<ReadIssueDto>>(doneIssues);
            return doneIssueDtos;
        }

        public IEnumerable<GetScheduleDto> GetScheduleTime(int projectId)
        {
            var project = _projectRepository.GetProject(projectId);
            if (project == null)
                throw new Exception("Project not found!");
            var issues = project.Issues.ToList();

            var issueDtos = _mapper.Map<IEnumerable<GetScheduleDto>>(issues);
            foreach (var i in issueDtos)
            {
                var duration = i.EndDate.Subtract(i.StartDate);
                i.Duration = duration.TotalDays;
            }

            return issueDtos;
        }
        public GetCountOfAllAndDoneIssuesDto GetCountOfAllAndDoneIssues(int projectId)
        {
            var allIssues = GetAllIssuesFromProject(projectId).ToList();
            var allIssuesCount = allIssues.Count();
            var doneIssues = GetDoneIssues(projectId).ToList();
            var doneIssuesCount = doneIssues.Count();
            
            var dto = new GetCountOfAllAndDoneIssuesDto{ AllIssues = allIssuesCount, DoneIssues = doneIssuesCount };
            return dto;
        }

        public void UpdateIssueEndDate(UpdateIssueEndDateDto issueDto)
        {
            if (issueDto == null)
                throw new ArgumentNullException(nameof(issueDto));

            var issue = _issueRepository.GetIssue(issueDto.Id);
            if (issue == null)
                throw new Exception("Issue not found!");

            issue.EndDate = issueDto.EndDate;
            _issueRepository.UpdateIssue(issue);
        }

        public void UpdateIssueStartDate(UpdateIssueStartDateDto issueDto)
        {
            if (issueDto == null)
                throw new ArgumentNullException(nameof(issueDto));

            var issue = _issueRepository.GetIssue(issueDto.Id);
            if (issue == null)
                throw new Exception("Issue not found!");

            issue.StartDate = issueDto.StartDate;
            _issueRepository.UpdateIssue(issue);

        }

        public void DeleteIssue(int id)
        {
            var issue = _issueRepository.GetIssue(id);

            if (issue == null)
                throw new Exception("Issue not found.");

            _issueRepository.DeleteIssue(id);
        }
    }
}
