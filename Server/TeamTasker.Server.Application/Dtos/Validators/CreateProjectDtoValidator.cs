using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.Projects;
using TeamTasker.Server.Application.Dtos.Users;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.Application.Dtos.Validators
{
    public class CreateProjectDtoValidator : AbstractValidator<CreateProjectDto>
    {
        private readonly IProjectRepository _projectRepository;

        public CreateProjectDtoValidator(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;

            RuleFor(x => x.Name)
                .NotEmpty()
                .Custom((value, context) =>
                {
                    var nameIsUsed = _projectRepository.GetAllProjects().Any(u => u.Name == value);
                     if (nameIsUsed)
                     {
                         context.AddFailure("Name", "That name of project is taken");
                     }
                 });
        }
    }
}
