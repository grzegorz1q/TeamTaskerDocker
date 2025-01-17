using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Domain.Interfaces
{
    public interface IEmployeeTeamRepository
    {
        EmployeeTeam? GetEmployeeTeam(int? employeeId, int? teamId);
        IEnumerable<EmployeeTeam> GetAllEmployeeTeams(int employeeId);
        void AddEmployeeTeam(EmployeeTeam employeeTeam);
        void UpdateEmployeeTeam(EmployeeTeam employeeTeam);
        void DeleteEmployeeTeam(int? employeeId, int? teamId);
    }
}
