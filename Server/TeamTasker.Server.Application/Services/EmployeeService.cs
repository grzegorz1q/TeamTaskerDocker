using AutoMapper;
using TeamTasker.Server.Application.Dtos.Emails;
using TeamTasker.Server.Application.Dtos.Projects;
using TeamTasker.Server.Application.Dtos.Teams;
using TeamTasker.Server.Application.Dtos.Users;
using TeamTasker.Server.Application.Interfaces;
using TeamTasker.Server.Domain.Entities;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.Application.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly ITasksService _tasksService;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IEmployeeTeamRepository _employeeTeamRepository;
        private readonly IMapper _mapper;

        public EmployeeService(ITasksService tasksService,IEmployeeRepository employeeRepository, IEmployeeTeamRepository employeeTeamRepository, IMapper mapper)
        {
            _tasksService = tasksService;
            _employeeRepository = employeeRepository;
            _employeeTeamRepository = employeeTeamRepository;
            _mapper = mapper;
        }

        public void CreateEmployee(CreateEmployeeDto employeeDto)
        {
            if (employeeDto == null)
                throw new ArgumentNullException(nameof(employeeDto));

            var employee = _mapper.Map<Employee>(employeeDto);
            employee.Password = new string(Enumerable.Repeat("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8)
            .Select(s => s[new Random().Next(s.Length)]).ToArray());

            _employeeRepository.CreateEmployee(employee);
            var emailNotification = new CreateEmailDto { TargetEmail = employee.Email, MessageSubject = "[TeamTasker]Welcome", MessageContent = $"Welcome to TeamTasker! Your temporary password is {employee.Password}" };
            _tasksService.CreateEmailEntry(emailNotification);
        }
        public void ChangePassword(ChangePasswordDto dto, string email)
        {
            var user = _employeeRepository.GetUserByEmail(email);
            if (user == null)
                throw new Exception("User not found!");
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));
            user.Password = dto.NewPassword;
            user.resetPassword = false;
            _employeeRepository.UpdateUser(user);
        }
        public IEnumerable<ReadEmployeeDto> GetAllEmployees()
        {
            var employees = _employeeRepository.GetAllEmployees();
            var employeeDtos = _mapper.Map<IEnumerable<ReadEmployeeDto>>(employees);

            return employeeDtos;
        }
        public IEnumerable<ReadUserDto> GetAllUsers()
        {
            var users = _employeeRepository.GetAllUsers();
            var userDtos = _mapper.Map<IEnumerable<ReadUserDto>>(users);

            return userDtos;
        }

        public ReadEmployeeDto GetEmployee(int id)
        {
            var employee = _employeeRepository.GetEmployee(id);

            if (employee == null)
                return null;

            var employeeDto = _mapper.Map<ReadEmployeeDto>(employee);

            return employeeDto;
        }

        public ReadUserDto GetUserByEmail(string email)
        {
            var user = _employeeRepository.GetUserByEmail(email);

            if (user == null)
                return null;

            var employeeDto = _mapper.Map<ReadUserDto>(user);

            return employeeDto;
        }

        public string GetUserPassword(int id)
        {
            var user = _employeeRepository.GetUser(id);

            var userDto = _mapper.Map<ReadUserDto>(user);
            return userDto.Password;
        }
        public ReadUserNameDto GetUserName(int id)
        {
            var user = _employeeRepository.GetUser(id);
            if (user == null)
                throw new Exception("User not found");

            var userDto = _mapper.Map<ReadUserNameDto>(user);
            return userDto;
        }
        public ReadUserNameAndEmailDto GetUserNameAndEmail(int id)
        {
            var user = _employeeRepository.GetUser(id);
            if (user == null)
                throw new Exception("User not found");

            var userDto = _mapper.Map<ReadUserNameAndEmailDto>(user);
            return userDto;
        }
        public void AddAvatarToUser(AddAvatarToUserDto dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            var user = _employeeRepository.GetUser(dto.Id);
            if (user == null)
                throw new Exception("User not found");

            user.Avatar = dto.Avatar;
            _employeeRepository.UpdateUser(user);
        }

        public IEnumerable<ReadProjectDto> GetUserProjects(int id)
        {
            var employee = _employeeRepository.GetEmployee(id);
            if (employee == null)
                throw new Exception("Employee not found!");

            // var employeeTeams = _employeeTeamRepository.GetAllEmployeeTeams(id);
            // var teams = employeeTeams.Select(t => t.Team).ToList();
            var teams = employee.EmployeeTeams.Select(t => t.Team).ToList();

            var userProjects = teams.Select(t => t.Project).ToList();
            var projectDtos = _mapper.Map<IEnumerable<ReadProjectDto>>(userProjects);
            return projectDtos;
        }

        public void DeleteEmployee(int id)
        {
            var employee = _employeeRepository.GetEmployee(id);

            if (employee == null)
                throw new Exception("Employee not found.");

            _employeeRepository.DeleteEmployee(id);
        }
    }
}
