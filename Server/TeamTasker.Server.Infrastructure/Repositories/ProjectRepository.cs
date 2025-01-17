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
    public class ProjectRepository : IProjectRepository
    {
        private readonly AppDbContext _appDbContext;

        //TODO: Fix issues with the database access

        public ProjectRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public void CreateProject(Project project)
        {
            if (project == null)
                throw new ArgumentNullException();

            _appDbContext.Projects.Add(project);
            _appDbContext.SaveChanges();
        }
        public void UpdateProject(Project project)
        {
            if (project == null)
                throw new ArgumentNullException();

            _appDbContext.Projects.Update(project);
            _appDbContext.SaveChanges();
        }

        public IEnumerable<Project> GetAllProjects()
        {
            var allDbProjects = _appDbContext.Projects.ToList();

            return allDbProjects;
        }

        public Project? GetProject(int? id)
        {
            return _appDbContext.Projects.FirstOrDefault(project => project.Id == id);
        }

        public void DeleteProject(int? id)
        {
            if (id == null)
                throw new ArgumentNullException();

            var projectToDelete = _appDbContext.Projects.FirstOrDefault(project => project.Id == id);
            if (projectToDelete != null)
            {
                _appDbContext.Projects.Remove(projectToDelete);
                _appDbContext.SaveChanges();
            }
        }
    }
}
