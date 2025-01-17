using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.Users;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.Application.Dtos.Validators
{
    public class CreateEmployeeDtoValidator : AbstractValidator<CreateEmployeeDto>
    {
        private readonly IEmployeeRepository _employeeRepository;

        public CreateEmployeeDtoValidator(IEmployeeRepository employeeRepository) 
        {
            _employeeRepository = employeeRepository;

            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress()
                .Custom((value, context) =>
                {

                    var emailInUser = _employeeRepository.GetAllUsers().Any(u => u.Email == value);
                    if (emailInUser)
                    {
                        context.AddFailure("Email", "That email is taken");
                    }
                });

            RuleFor(x => x.FirstName)
                .NotEmpty();

            RuleFor(x => x.LastName)
                .NotEmpty();

            RuleFor(x => x.Position)
                .NotEmpty();


            RuleFor(x => x.RoleId)
                .Must(x => x == 1 || x == 2)
                .WithMessage("RoleId must be either 1 or 2.");
        }
    }
}
