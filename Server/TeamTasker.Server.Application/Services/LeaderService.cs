using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.Emails;
using TeamTasker.Server.Application.Dtos.Issues;
using TeamTasker.Server.Application.Interfaces;
using TeamTasker.Server.Domain.Entities;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.Application.Services
{
    public class LeaderService : ILeaderService
    {
        private readonly ITasksService _tasksService;
        private readonly IIssueRepository _issueRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly INotificationRepository _notificationRepository;
        private readonly IUserNotificationRepository _userNotificationRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IMapper _mapper;

        public LeaderService(ITasksService tasksService,IIssueRepository issueRepository, IEmployeeRepository employeeRepository,INotificationRepository notificationRepository, IUserNotificationRepository userNotificationRepository, IProjectRepository projectRepository, ITeamRepository teamRepository, IMapper mapper) {
            _tasksService = tasksService;
            _issueRepository = issueRepository;
            _employeeRepository = employeeRepository;
            _notificationRepository = notificationRepository;
            _userNotificationRepository = userNotificationRepository;
            _projectRepository = projectRepository;
            _teamRepository = teamRepository;
            _mapper = mapper;
        }
        public void CreateIssue(CreateIssueDto issueDto, string email)
        {
            var employee = _employeeRepository.GetUserByEmail(email);

            if (issueDto == null)
                throw new ArgumentNullException(nameof(issueDto));

            var issue = _mapper.Map<Issue>(issueDto);
            var project = _projectRepository.GetProject(issue.ProjectId);
            if (project == null)
                throw new Exception("You are trying to add an issue to a project that does not exist!");

            var issueCount = project.Issues.Where(i=>i.isFeedPost==false).Count();
            issue.ProjectIssueId = issueCount + 1;

            var team = _teamRepository.GetTeam(project.TeamId);
            if (team == null)
                throw new Exception("Your team is not in this project!");
            if (employee.Id != team.LeaderId)
                throw new Exception("You can't create an issue! You are not team leader!");

            var teamEmployees = team.EmployeeTeams.Select(e => e.Employee).ToList();
            if (!teamEmployees.Any(e => e.Id == issue.EmployeeId))
                throw new Exception("You can't assign issue to employee that is not assigned to this project!");

            var notification = new Notification { Content = $"You have been assigned new issue in project '{project.Name}'." };
            _notificationRepository.CreateNotification(notification);
            var userNotifiaction = new UserNotification { UserId = issue.EmployeeId, NotificationId = notification.Id };
            _userNotificationRepository.AddUserNotification(userNotifiaction);

            var destEmployee = _employeeRepository.GetEmployee(issue.EmployeeId);
            if (destEmployee == null)
            {
                throw new Exception("No employee found!");
            }
            var emailNotification = new CreateEmailDto { TargetEmail = destEmployee.Email, MessageSubject = "[TeamTasker]New Issue", MessageContent = $"{project.Name}: You have been assigned new issue ({issue.Name})." };
            _tasksService.CreateEmailEntry(emailNotification);
            _issueRepository.CreateIssue(issue);
        }
    }
}
