using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Infrastructure.Presistence
{
    public class AppDbContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Team> Teams { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<Issue> Issues { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Notification> Notifications { get; set; }  
        public virtual DbSet<EmployeeTeam> EmployeeTeams { get; set; }
        public virtual DbSet<UserNotification> UserNotifications { get; set; }
        public virtual DbSet<Email> Emails { get; set; }
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseLazyLoadingProxies();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<User>()
                .ToTable("Users")
                .HasDiscriminator<int>("RoleId")
                .HasValue<User>(1)
                .HasValue<Employee>(2);

            modelBuilder.Entity<Team>()
                 .HasOne(t => t.Leader)
                 .WithMany(e => e.LeaderTeams)
                 .HasForeignKey(t => t.LeaderId)
                 .OnDelete(DeleteBehavior.Restrict);

            /*modelBuilder.Entity<Project>()
                .HasOne(p => p.Team)
                .WithOne(t => t.Project)
                .HasForeignKey<Team>(t => t.ProjectId);*/
                
            modelBuilder.Entity<Team>()
                .HasOne(t => t.Project)
                .WithOne(p => p.Team)
                .HasForeignKey<Project>(p => p.TeamId);

            modelBuilder.Entity<Issue>()
                .HasOne(i => i.Project)
                .WithMany(p => p.Issues)
                .HasForeignKey(i => i.ProjectId);

            modelBuilder.Entity<Issue>()
                .HasOne(i => i.Employee)
                .WithMany(e => e.Issues)
                .HasForeignKey(i => i.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);//aby działała relacja many to many comment user(raczej chwilowe rozwiązanie)

            /*modelBuilder.Entity<Team>()
                .HasMany(t => t.Employees)
                .WithMany(e => e.Teams);*/

/*            modelBuilder.Entity<Comment>()
                .HasMany(c => c.Users)
                .WithMany(u => u.Notifications)
                .UsingEntity(j => j.ToTable("UserNotification"));*/


            modelBuilder.Entity<UserNotification>()
                .HasKey(un => new { un.NotificationId, un.UserId });

            modelBuilder.Entity<UserNotification>()
                .HasOne(n => n.Notification)
                .WithMany(un => un.UserNotifications)
                .HasForeignKey(n => n.NotificationId);

            modelBuilder.Entity<UserNotification>()
                .HasOne(u => u.User)
                .WithMany(un => un.UserNotifications)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<EmployeeTeam>()
                .HasKey(et => new { et.TeamId, et.EmployeeId });

            modelBuilder.Entity<EmployeeTeam>()
                .HasOne(t => t.Team)
                .WithMany(et => et.EmployeeTeams)
                .HasForeignKey(t => t.TeamId);

            modelBuilder.Entity<EmployeeTeam>()
                .HasOne(e => e.Employee)
                .WithMany(et => et.EmployeeTeams)
                .HasForeignKey(e => e.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);
        }

    }
}
