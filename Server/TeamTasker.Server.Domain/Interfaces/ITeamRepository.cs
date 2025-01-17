using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Domain.Interfaces
{
    public interface ITeamRepository
    {
        void CreateTeam(Team team);
        void UpdateTeam(Team team);
        IEnumerable<Team> GetAllTeams();
        Team? GetTeam(int? id);
        void DeleteTeam(int? id);
    }
}
