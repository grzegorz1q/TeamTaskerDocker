using TeamTasker.Server.Application.Dtos.Projects;
using TeamTasker.Server.Application.Dtos.Teams;
using TeamTasker.Server.Application.Dtos.Users;

namespace TeamTasker.Server.Domain.Interfaces
{
    public interface IEmployeeService
    {
        void CreateEmployee(CreateEmployeeDto userDto);
        void ChangePassword(ChangePasswordDto dto, string email);
        IEnumerable<ReadEmployeeDto> GetAllEmployees();
        IEnumerable<ReadUserDto> GetAllUsers();
        ReadEmployeeDto GetEmployee(int id);
        ReadUserDto GetUserByEmail(string email);
        string GetUserPassword(int id);
        ReadUserNameDto GetUserName(int id);
        ReadUserNameAndEmailDto GetUserNameAndEmail(int id);
        void AddAvatarToUser(AddAvatarToUserDto dto);
        IEnumerable<ReadProjectDto> GetUserProjects(int id);
        void DeleteEmployee(int id);
    }
}
