using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Domain.Interfaces
{
    public interface IProjectRepository
    {
        void CreateProject(Project project);
        void UpdateProject(Project project);
        IEnumerable<Project> GetAllProjects();
        Project? GetProject(int? id);
        public void DeleteProject(int? id);
    }
}
