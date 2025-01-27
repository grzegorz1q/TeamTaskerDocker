using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Infrastructure.Presistence
{
    public class PrepDatabase
    {
        private readonly AppDbContext _appDbContext;

        public PrepDatabase(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public void Seed()
        {
            if (_appDbContext.Database.CanConnect())
            {
                if (!_appDbContext.Roles.Any())
                {
                    var roles = GetRoles();
                    _appDbContext.Roles.AddRange(roles);
                    _appDbContext.SaveChanges();
                }
            }
            if (_appDbContext.Database.CanConnect())
            {
                if (!_appDbContext.Users.Any())
                {
                    var users = GetUsers();
                    _appDbContext.Users.AddRange(users);
                    _appDbContext.SaveChanges();
                }
            }
            if (_appDbContext.Database.CanConnect())
            {
                if (!_appDbContext.Teams.Any())
                {
                    var teams = GetTeams();
                    _appDbContext.Teams.AddRange(teams);
                    _appDbContext.SaveChanges();
                }
            }
            if (_appDbContext.Database.CanConnect())
            {
                if (!_appDbContext.Projects.Any())
                {
                    var projects = GetProjects();
                    _appDbContext.Projects.AddRange(projects);
                    _appDbContext.SaveChanges();
                }
            }
            /*if (_appDbContext.Database.CanConnect())
            {
                if (!_appDbContext.Notifications.Any())
                {
                    var notifications = GetNotifications();
                    _appDbContext.Notifications.AddRange(notifications);
                    _appDbContext.SaveChanges();
                }
            }*/
            if (_appDbContext.Database.CanConnect())
            {
                if (!_appDbContext.EmployeeTeams.Any())
                {
                    var employeeTeams = GetEmployeeTeams();
                    _appDbContext.EmployeeTeams.AddRange(employeeTeams);
                    _appDbContext.SaveChanges();
                }
            }
            if (_appDbContext.Database.CanConnect())
            {
                if (!_appDbContext.Issues.Any())
                {
                    var issues = GetIssues();
                    _appDbContext.Issues.AddRange(issues);
                    _appDbContext.SaveChanges();
                }
            }
            if (_appDbContext.Database.CanConnect())
            {
                if (!_appDbContext.Comments.Any())
                {
                    var comments = GetComments();
                    _appDbContext.Comments.AddRange(comments);
                    _appDbContext.SaveChanges();
                }
            }
            /*if (_appDbContext.Database.CanConnect())
            {
                if (!_appDbContext.Issues.Any())
                {
                    var issues = GetIssues();
                    _appDbContext.Issues.AddRange(issues);
                    _appDbContext.SaveChanges();
                }
            }*/
        }
        private IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>()
            {
                new Role(){ Name = "Admin"},
                new Role(){ Name = "Employee"}
            };
            return roles;
        }
        private IEnumerable<User> GetUsers()
        {
            var users = new List<User>()
            {
                new User(){ FirstName = "Admin", Email="admin", Password="admin", Avatar = "https://t4.ftcdn.net/jpg/02/88/57/41/360_F_288574163_CnFR8zc2sPzwh24PnyODUmGdfA9jP9ZS.jpg"},

                new Employee(){FirstName = "Regular", LastName="User", 
                    Position="Software Developer", Email="user@test.pl", Password ="password", Avatar = "https://mui.com/static/images/avatar/1.jpg" },

                new Employee(){FirstName = "Leader", LastName="User", 
                    Position="Project Admin", Email="leader@test.pl", Password ="password", Avatar= "https://mui.com/static/images/avatar/2.jpg"},

                new Employee(){FirstName = "Employee", LastName = "No. 1", 
                    Position="Testing", Email="employee1@test.pl", Password ="password", Avatar = "https://mui.com/static/images/avatar/5.jpg"},

                new Employee(){FirstName = "Employee", LastName = "No. 2", 
                    Position="Testing", Email="employee2@test.pl", Password ="password"}
            };
            return users;
        }
        private IEnumerable<Team> GetTeams()
        {
            //var selectedUsers = _appDbContext.Users.Where(u => u.FirstName == "Employee2" || u.FirstName == "Employee3" || u.FirstName == "Employee4").Select(u => (Employee)u).ToList();

            var teams = new List<Team>()
            {
                //new Team(){ Name = "team1", LeaderId=2, Employees = selectedUsers},
                //new Team(){ Name = "team2", LeaderId=2, Employees = selectedUsers}
                new Team(){ Name = "Team 1", LeaderId = 2}
            };
            return teams;
        }
        private IEnumerable<Project> GetProjects()
        {
            var projects = new List<Project>()
            {
                new Project(){ Name="Project 1", Description = "This is an example project.", TeamId=1},
                new Project(){ Name="Project 2"}
            };
            return projects;
        }
        private IEnumerable<Notification> GetNotifications()
        {
            var notifications = new List<Notification>()
            {
                //new Notification() {Content="Mocked notification, that is already in the database."},
                //new Notification() {Content="Another notification."}
            };
            return notifications;
        }
        private IEnumerable<EmployeeTeam> GetEmployeeTeams() 
        {
            var employeeTeams = new List<EmployeeTeam>()
            {
                new EmployeeTeam() { EmployeeId = 3, TeamId = 1},
                new EmployeeTeam() { EmployeeId = 2, TeamId = 1},
                new EmployeeTeam() { EmployeeId = 4, TeamId = 1}
            };

            return employeeTeams;
        }
        private IEnumerable<Issue> GetIssues() 
        {
            var issues = new List<Issue>()
            {
                new Issue() { 
                    Id = 1,
                    Name = "Single Test Issue Title, Week 7", 
                    Description = "Single Test Issue Description, Week 7",
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(7),
                    Priority = IssuePriority.Medium,
                    Status = IssueStatus.InProgress,
                    EmployeeId = 3,
                    ProjectId = 1
                }
            };

            return issues;
        }
        private IEnumerable<Comment> GetComments()
        {
            var issues = new List<Comment>()
            {
                new Comment() { 
                    Created = DateTime.Now, 
                    Content = "This is a test comment, to show comment's display.",
                    Type = "",
                    IssueId = 1,
                    ProjectId = 1,
                    UserId = 4
                }
            };

            return issues;
        }
    }
}
