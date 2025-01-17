using Microsoft.Extensions.Logging;
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
    public class TeamRepository : ITeamRepository
    {
        private readonly AppDbContext _appDbContext;

        //TODO: Fix issues with the database access

        public TeamRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public void CreateTeam(Team team)
        {
            if (team == null)
                throw new ArgumentNullException();

            _appDbContext.Teams.Add(team);
            _appDbContext.SaveChanges();
        }
        public void UpdateTeam(Team team)
        {
            if (team == null)
                throw new ArgumentNullException();

            _appDbContext.Teams.Update(team);
            _appDbContext.SaveChanges();
        }

        public IEnumerable<Team> GetAllTeams()
        {
            var allDbTeams = _appDbContext.Teams.ToList();

            return allDbTeams;
        }

        public Team? GetTeam(int? id)
        {
            return _appDbContext.Teams.FirstOrDefault(team => team.Id == id);
        }

        public void DeleteTeam(int? id)
        {
            if (id == null)
                throw new ArgumentNullException();

            var teamToDelete = _appDbContext.Teams.FirstOrDefault(team => team.Id == id);
            if (teamToDelete != null)
            {
                _appDbContext.Teams.Remove(teamToDelete);
                _appDbContext.SaveChanges();
            }
        }
    }
}
