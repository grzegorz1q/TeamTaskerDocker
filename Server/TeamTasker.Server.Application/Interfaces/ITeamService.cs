using TeamTasker.Server.Application.Dtos;
using TeamTasker.Server.Application.Dtos.EmployeeTeam;
using TeamTasker.Server.Application.Dtos.Teams;
using TeamTasker.Server.Application.Dtos.Users;

namespace TeamTasker.Server.Domain.Interfaces
{
    public interface ITeamService
    {
        void CreateTeam(CreateTeamDto teamDto);
        IEnumerable<ReadTeamDto> GetAllTeams();
        ReadTeamDto GetTeam(int id);
        void AddEmployeeToTeam(CreateEmployeeTeamDto dto);
        void ChangeTeamLeader(ChangeTeamLeaderDto dto);
        IEnumerable<ReadEmployeeDto> GetAllTeamEmployees(int id);
        void DeleteTeam(int id);
    }
}
