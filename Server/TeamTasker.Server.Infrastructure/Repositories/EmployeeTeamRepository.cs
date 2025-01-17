using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;
using TeamTasker.Server.Domain.Interfaces;
using TeamTasker.Server.Infrastructure.Presistence;

namespace TeamTasker.Server.Infrastructure.Repositories
{
    public class EmployeeTeamRepository : IEmployeeTeamRepository
    {
        private readonly AppDbContext _appDbContext;

        public EmployeeTeamRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public EmployeeTeam? GetEmployeeTeam(int? employeeId, int? teamId)
        {
            return _appDbContext.EmployeeTeams.FirstOrDefault(e => e.EmployeeId == employeeId && e.TeamId == teamId);
        }
        public IEnumerable<EmployeeTeam> GetAllEmployeeTeams(int employeeId)
        {
            var allDbEmployeeTeams = _appDbContext.EmployeeTeams.Where(e=>e.EmployeeId==employeeId).ToList();

            return allDbEmployeeTeams;
        }
        public void AddEmployeeTeam(EmployeeTeam employeeTeam)
        {
            if (employeeTeam == null)
                throw new ArgumentNullException();

            _appDbContext.EmployeeTeams.Add(employeeTeam);
            _appDbContext.SaveChanges();
        }
        public void UpdateEmployeeTeam(EmployeeTeam employeeTeam)
        {
            if (employeeTeam == null)
                throw new ArgumentNullException();

            _appDbContext.EmployeeTeams.Update(employeeTeam);
            _appDbContext.SaveChanges();
        }
        public void DeleteEmployeeTeam(int? employeeId, int? teamId)
        {
            if (employeeId == null || teamId == null)
                throw new ArgumentNullException();

            var employeeTeamToDelete = _appDbContext.EmployeeTeams.FirstOrDefault(et => et.EmployeeId == employeeId && et.TeamId == teamId);
            if (employeeTeamToDelete != null)
            {
                _appDbContext.EmployeeTeams.Remove(employeeTeamToDelete);
                _appDbContext.SaveChanges();
            }
        }

    }
}
