using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.Projects;
using TeamTasker.Server.Application.Dtos.Teams;
using TeamTasker.Server.Application.Dtos.Users;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.Application.Dtos.Validators
{
    public class CreateTeamDtoValidator : AbstractValidator<CreateTeamDto>
    {
        private readonly ITeamRepository _teamRepository;

        public CreateTeamDtoValidator(ITeamRepository teamRepository)
        {
            _teamRepository = teamRepository;

            RuleFor(x => x.Name)
                .NotEmpty()
                .Custom((value, context) =>
                {
                    var nameIsUsed = _teamRepository.GetAllTeams().Any(u => u.Name == value);
                    if (nameIsUsed)
                    {
                        context.AddFailure("Name", "That name of team is taken");
                    }
                });
        }
    }
}
