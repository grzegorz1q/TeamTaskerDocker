using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Authorization;
using TeamTasker.Server.Application.Dtos.Users;
using TeamTasker.Server.Application.Interfaces.Authorization;
using TeamTasker.Server.Domain.Interfaces;
using TeamTasker.Server.Application.Services;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Application.Services.Authorization
{
    public class JwtAuthorizationService : IJwtAuthorizationService
    {
        private readonly IEmployeeRepository _employeeRepo;
        private readonly IProjectRepository _projectRepo;
        private readonly ITeamRepository _teamRepo;
        private readonly IEmployeeService _employeeService;

        public JwtAuthorizationService(IEmployeeRepository employeeRepo, IProjectRepository projectRepo, ITeamRepository teamRepo, IEmployeeService employeeService)
        {
            _employeeRepo = employeeRepo;
            _projectRepo = projectRepo;
            _teamRepo = teamRepo;
            _employeeService = employeeService;
        }

        public void GetUserToken(LoginDto loginUserDto, HttpResponse httpResponse)
        {
            var userReadDto = _employeeService.GetUserByEmail(loginUserDto.Email) ?? throw new KeyNotFoundException();

           if(_employeeService.GetUserPassword(userReadDto.Id) != loginUserDto.Password)
                throw new KeyNotFoundException();

            var jwtToken = JwtHelperClass.GenerateToken(userReadDto);

            httpResponse.Cookies.Append("JwtToken", jwtToken, new CookieOptions 
            { 
                //HttpOnly = false,
                Domain="localhost",
                Path = "/",
                Expires = DateTimeOffset.Now.AddDays(7),
                IsEssential = true,
                MaxAge = TimeSpan.MaxValue,
                SameSite = SameSiteMode.None,
                Secure = true
            });
        }

        public void CheckIfHasAdminPermission(string? authorizationHeader)
        {
            var jwtToken = TrimHeaderToken(authorizationHeader);

            var roleId = GetUserRoleFromToken(jwtToken);

            if (roleId != 1)
                throw new UnauthorizedAccessException();
        }

        public void CheckIfHasLoggedInUserPermission(string? authorizationHeader)
        {
            if (authorizationHeader == null)
                throw new UnauthorizedAccessException();

            var stringifiedToken = TrimHeaderToken(authorizationHeader);
            var roleId = GetUserRoleFromToken(stringifiedToken);

            if(roleId != 2)
                throw new UnauthorizedAccessException();
        }

        public void CheckIfLeaderOfTheProject(string? authorizationHeader)
        {
            if (authorizationHeader == null)
                throw new UnauthorizedAccessException();

            var stringifiedToken = TrimHeaderToken(authorizationHeader);
            var verifiedToken = VerifyPassedToken(stringifiedToken);
            
            if(verifiedToken.Issuer.ToString() != "leader@test.pl")
                throw new UnauthorizedAccessException();
        }

        public JwtSecurityToken VerifyPassedToken(string stringifiedToken)
        {
            var verifiedToken = JwtHelperClass.VerifyToken(stringifiedToken);

            return verifiedToken;
        }

        public int GetUserRoleFromToken(string stringifiedToken)
        {
            var verifiedToken = VerifyPassedToken(stringifiedToken);

            if(verifiedToken.Payload["roleId"]?.ToString() == null)
                throw new UnauthorizedAccessException();

            var roleId = int.Parse(verifiedToken.Payload["roleId"]?.ToString()!);

            return roleId;
        }

        public string TrimHeaderToken(string? authorizationHeader)
        {
            if (string.IsNullOrEmpty(authorizationHeader))
                throw new UnauthorizedAccessException();

            if(!authorizationHeader.StartsWith("Bearer "))
                throw new UnauthorizedAccessException();

            string jwtToken = authorizationHeader.Substring("Bearer ".Length).Trim();

            return jwtToken;
        }

        public string GetEmailFromToken(string? authorizationHeader)
        {
            if (authorizationHeader == null)
                throw new UnauthorizedAccessException();

            var stringifiedToken = TrimHeaderToken(authorizationHeader);
            var verifiedToken = VerifyPassedToken(stringifiedToken);

            if (verifiedToken.Issuer == null)
                throw new UnauthorizedAccessException();

            return verifiedToken.Issuer;
        }
        public bool IsLeader(string email, int projectId)
        {
            var user = _employeeRepo.GetUserByEmail(email);
            if (user == null)
                throw new Exception("Employee not found!");

            var employee = (Employee)user;

            var project = _projectRepo.GetProject(projectId);
            if (project == null)
                throw new Exception("Project not found!");

            var team = _teamRepo.GetTeam(project.TeamId);
            if (team == null)
                throw new Exception("Your team is not in this project!");

            if (employee.Id != team.LeaderId)
                return false;
            return true;
        }
    }
}
