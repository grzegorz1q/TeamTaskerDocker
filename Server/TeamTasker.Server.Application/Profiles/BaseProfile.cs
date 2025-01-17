using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.Comments;
using TeamTasker.Server.Application.Dtos.EmployeeTeam;
using TeamTasker.Server.Application.Dtos.Issues;
using TeamTasker.Server.Application.Dtos.Projects;
using TeamTasker.Server.Application.Dtos.Teams;
using TeamTasker.Server.Application.Dtos.Users;
using TeamTasker.Server.Domain.Entities;
using Microsoft.Extensions.DependencyInjection;
using TeamTasker.Server.Application.Dtos.Noitifcations;
using TeamTasker.Server.Application.Dtos.Emails;
using TeamTasker.Server.Application.Dtos.FeedPosts;

namespace TeamTasker.Server.Application.Profiles
{
    public class BaseProfile : Profile
    {
        public BaseProfile()
        {
            CreateMap<Comment, ReadCommentDto>();

            CreateMap<CreateProjectDto, Project>();
            CreateMap<Project, CreateProjectDto>();

            CreateMap<CreateIssueDto, Issue>();
            CreateMap<Issue, ReadIssueDto>();
            CreateMap<GetIssueAssignedToEmployeeDto, Issue>();
            CreateMap<Issue, GetIssueAssignedToEmployeeDto>();
            CreateMap<GetIssueByPriorityDto, Issue>();
            CreateMap<Issue, GetIssueByPriorityDto>();
            CreateMap<Issue, GetScheduleDto>();
            CreateMap<CreateFeedPostDto, Issue>();
            CreateMap<Issue, ReadFeedPostDto>()
                .ForMember(desc => desc.Created, x => x.MapFrom(src => src.StartDate));

            CreateMap<Project, AddTeamToProjectDto>(); 
            CreateMap<AddTeamToProjectDto, Project>(); 

            CreateMap<Project, GetProjectNameAndPictureDto>();
            CreateMap<GetProjectNameAndPictureDto, Project>();

            CreateMap<Comment, AddCommentToIssueDto>();
            CreateMap<AddCommentToIssueDto, Comment>();

            CreateMap<Project, ReadProjectDto>()
                .ForMember(desc => desc.Comments, x => x.MapFrom(src => src.Comments));

            CreateMap<CreateTeamDto, Team>();
            CreateMap<Team, ReadTeamDto>();

            CreateMap<Team, ReadTeamDto>()
                .ForMember(dest => dest.Employees, opt => opt.MapFrom(src => src.EmployeeTeams.Select(et => et.Employee)));
            CreateMap<ReadTeamDto, Team>();
            CreateMap<ChangeTeamLeaderDto, Team>();


            CreateMap<User, ReadUserDto>();
            CreateMap<User, ReadUserNameDto>();
            CreateMap<User, ReadUserNameAndEmailDto>();
            CreateMap<AddAvatarToUserDto, User>();
            CreateMap<CreateEmployeeDto, Employee>();
            CreateMap<Employee, ReadEmployeeDto>();
               // .ForMember(dest => dest.Teams, opt => opt.MapFrom(src => src.EmployeeTeams.Select(et => et.Team)));
            CreateMap<ReadEmployeeDto, Employee>();
            CreateMap<Employee, ReadUserDto>();

            CreateMap<EmployeeTeam, CreateEmployeeTeamDto>();
            CreateMap<CreateEmployeeTeamDto, EmployeeTeam>();

            CreateMap<Notification, ReadNotificationDto>();
            CreateMap<AddNotificationToUserDto, Notification>();

            CreateMap<CreateEmailDto, Email>();
            CreateMap<Email, ReadEmailDto>();
        }
    }
}
