using TeamTasker.Server.Application.Dtos.Issues;
using TeamTasker.Server.Application.Dtos.Projects;
using TeamTasker.Server.Application.Dtos.Users;

namespace TeamTasker.Server.Application.Interfaces
{
    public interface IProjectService
    {
        int CreateProject(CreateProjectDto projectDto);
        IEnumerable<ReadProjectDto> GetAllProjects();
        ReadProjectDto GetProject(int id);
      //  void UpdateProjectTeam(UpdateProjectTeamDto teamDto);
        void AddTeamToProject(AddTeamToProjectDto teamToProjectDto);
        GetProjectNameAndPictureDto GetProjectNameAndImagines(int id);
        void AddPictureToProject(AddPictureToProjectDto addPictureToProjectDto);
        IEnumerable<ReadEmployeeDto> GetEmployeesFromProject(int projectId);
        void UpdateProjectStatus(UpdateProjectStatusDto dto);
        void DeleteProject(int id);
    }
}
