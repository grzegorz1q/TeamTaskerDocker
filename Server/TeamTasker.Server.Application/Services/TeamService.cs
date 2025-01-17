using AutoMapper;
using TeamTasker.Server.Application.Dtos.Emails;
using TeamTasker.Server.Application.Dtos.EmployeeTeam;
using TeamTasker.Server.Application.Dtos.Teams;
using TeamTasker.Server.Application.Dtos.Users;
using TeamTasker.Server.Application.Interfaces;
using TeamTasker.Server.Domain.Entities;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.Application.Services
{
    public class TeamService : ITeamService
    {
        private readonly ITasksService _tasksService;
        private readonly ITeamRepository _teamRepository;
        private readonly INotificationRepository _notificationRepository;
        private readonly IUserNotificationRepository _userNotificationRepository;
        private readonly IEmployeeTeamRepository _employeeTeamRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;

        public TeamService(ITasksService tasksService,ITeamRepository teamRepository,INotificationRepository notificationRepository,IUserNotificationRepository userNotificationRepository,IEmployeeTeamRepository employeeTeamRepository, IEmployeeRepository employeeRepository, IMapper mapper)
        {
            _tasksService = tasksService;
            _teamRepository = teamRepository;
            _notificationRepository = notificationRepository;
            _userNotificationRepository = userNotificationRepository;
            _employeeTeamRepository = employeeTeamRepository;
            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }

        public void CreateTeam(CreateTeamDto teamDto)
        {
            if (teamDto == null)
                throw new ArgumentNullException(nameof(teamDto));

            var team = _mapper.Map<Team>(teamDto);
            var employee = _employeeRepository.GetEmployee(teamDto.LeaderId);
            if (employee == null)
                throw new Exception("No employee found or admin can not be team leader!");

            _teamRepository.CreateTeam(team);
            var employeeTeamDto = new CreateEmployeeTeamDto { EmployeeId = team.LeaderId, TeamId = team.Id };
            var employeeTeam = _mapper.Map<EmployeeTeam>(employeeTeamDto);
            _employeeTeamRepository.AddEmployeeTeam(employeeTeam);

            var notification = new Notification { Content = $"You became the leader of a team '{team.Name}'." };
            _notificationRepository.CreateNotification(notification);
            var userNotifiaction = new UserNotification { UserId = employeeTeam.EmployeeId, NotificationId = notification.Id };
            _userNotificationRepository.AddUserNotification(userNotifiaction);
            var emailNotification = new CreateEmailDto { TargetEmail = employee.Email, MessageSubject = "[TeamTasker]New Position", MessageContent = $"You became the leader of a team '{team.Name}'." };
            _tasksService.CreateEmailEntry(emailNotification);
        }

        public IEnumerable<ReadTeamDto> GetAllTeams()
        {
            var teams = _teamRepository.GetAllTeams();
            var teamDtos = _mapper.Map<IEnumerable<ReadTeamDto>>(teams);

            return teamDtos;
        }

        public ReadTeamDto GetTeam(int id)
        {
            var team = _teamRepository.GetTeam(id);

            if (team == null)
                return null;

            var teamDto = _mapper.Map<ReadTeamDto>(team);

            return teamDto;
        }
        public void AddEmployeeToTeam(CreateEmployeeTeamDto dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            var team = _teamRepository.GetTeam(dto.TeamId);

            if (team == null)
                throw new Exception("Team not found");

            var employee = _employeeRepository.GetEmployee(dto.EmployeeId);

            if (employee == null)
                throw new Exception("Employee not found");

            var employeeTeam = _mapper.Map<EmployeeTeam>(dto);

            _employeeTeamRepository.AddEmployeeTeam(employeeTeam);
            var notification = new Notification { Content = $"You have been added to a new team '{team.Name}'." };
            _notificationRepository.CreateNotification(notification);
            var userNotifiaction = new UserNotification { UserId = employee.Id, NotificationId = notification.Id };
            _userNotificationRepository.AddUserNotification(userNotifiaction);
            var emailNotification = new CreateEmailDto { TargetEmail = employee.Email, MessageSubject = "[TeamTasker]New Team", MessageContent = $"You have been added to a new team '{team.Name}'." };
            _tasksService.CreateEmailEntry(emailNotification);
        }

        public void ChangeTeamLeader(ChangeTeamLeaderDto dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            var team = _teamRepository.GetTeam(dto.Id);

            if (team == null)
                throw new Exception("Team not exist");

            var employee = _employeeRepository.GetEmployee(dto.LeaderId);

            if (employee == null)
                throw new Exception("Employee not found");

            var isEmployeeTeam = _employeeTeamRepository.GetEmployeeTeam(employee.Id, team.Id);
            if (isEmployeeTeam == null)
            {
                var employeeTeamDto = new CreateEmployeeTeamDto
                {
                    EmployeeId = employee.Id,
                    TeamId = team.Id
                };
                var employeeTeam = _mapper.Map<EmployeeTeam>(employeeTeamDto);
                _employeeTeamRepository.AddEmployeeTeam(employeeTeam);
            }
            team.LeaderId = dto.LeaderId;

            _teamRepository.UpdateTeam(team);

            var notification = new Notification { Content = $"You became the leader of a team '{team.Name}'." };
            _notificationRepository.CreateNotification(notification);
            var userNotifiaction = new UserNotification { UserId = team.LeaderId, NotificationId = notification.Id };
            _userNotificationRepository.AddUserNotification(userNotifiaction);
            var emailNotification = new CreateEmailDto { TargetEmail = employee.Email, MessageSubject = "[TeamTasker]New Position", MessageContent = $"You became the leader of a team '{team.Name}'." };
            _tasksService.CreateEmailEntry(emailNotification);
        }
        public IEnumerable<ReadEmployeeDto> GetAllTeamEmployees(int id)
        {
            var team = _teamRepository.GetTeam(id);
            if (team == null)
                throw new Exception("Team not found");
              
            var employees = team.EmployeeTeams.Select(e => e.Employee).ToList();

            var employeeDtos = _mapper.Map<IEnumerable<ReadEmployeeDto>>(employees);
            return employeeDtos;
        }

        public void DeleteTeam(int id)
        {
            var team = _teamRepository.GetTeam(id);

            if (team == null)
                throw new Exception("Team not found.");

            _teamRepository.DeleteTeam(id);
        }
    }
}
