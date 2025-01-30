﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TeamTasker.Server.Infrastructure.Presistence;

#nullable disable

namespace TeamTasker.Server.Infrastructure.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250130090602_modifyUserModel")]
    partial class modifyUserModel
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true);

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<int>("IssueId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("ProjectId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("IssueId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Email", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("MessageContent")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("MessageSubject")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("TargetEmail")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("WasSuccessfullySent")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("WhenSubmitted")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Emails");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.EmployeeTeam", b =>
                {
                    b.Property<int>("TeamId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("INTEGER");

                    b.HasKey("TeamId", "EmployeeId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("EmployeeTeams");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Issue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("CompleteTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Priority")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProjectId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProjectIssueId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("Status")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("isFeedPost")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("ProjectId");

                    b.ToTable("Issues");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Notification", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<int?>("TeamId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("TeamId");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsComplete")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Picture")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Status")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("TeamId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("TeamId")
                        .IsUnique();

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("LeaderId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("LeaderId");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Avatar")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsArchived")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Position")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("resetPassword")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users", (string)null);

                    b.HasDiscriminator<int>("RoleId").HasValue(1);

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.UserNotification", b =>
                {
                    b.Property<int>("NotificationId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("NotificationId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserNotifications");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Employee", b =>
                {
                    b.HasBaseType("TeamTasker.Server.Domain.Entities.User");

                    b.HasDiscriminator().HasValue(2);
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Comment", b =>
                {
                    b.HasOne("TeamTasker.Server.Domain.Entities.Issue", "Issue")
                        .WithMany("Comments")
                        .HasForeignKey("IssueId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TeamTasker.Server.Domain.Entities.Project", "Project")
                        .WithMany("Comments")
                        .HasForeignKey("ProjectId");

                    b.HasOne("TeamTasker.Server.Domain.Entities.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Issue");

                    b.Navigation("Project");

                    b.Navigation("User");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.EmployeeTeam", b =>
                {
                    b.HasOne("TeamTasker.Server.Domain.Entities.Employee", "Employee")
                        .WithMany("EmployeeTeams")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("TeamTasker.Server.Domain.Entities.Team", "Team")
                        .WithMany("EmployeeTeams")
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Issue", b =>
                {
                    b.HasOne("TeamTasker.Server.Domain.Entities.Employee", "Employee")
                        .WithMany("Issues")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("TeamTasker.Server.Domain.Entities.Project", "Project")
                        .WithMany("Issues")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");

                    b.Navigation("Project");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Notification", b =>
                {
                    b.HasOne("TeamTasker.Server.Domain.Entities.Team", null)
                        .WithMany("Notifications")
                        .HasForeignKey("TeamId");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Project", b =>
                {
                    b.HasOne("TeamTasker.Server.Domain.Entities.Team", "Team")
                        .WithOne("Project")
                        .HasForeignKey("TeamTasker.Server.Domain.Entities.Project", "TeamId");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Team", b =>
                {
                    b.HasOne("TeamTasker.Server.Domain.Entities.Employee", "Leader")
                        .WithMany("LeaderTeams")
                        .HasForeignKey("LeaderId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Leader");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.User", b =>
                {
                    b.HasOne("TeamTasker.Server.Domain.Entities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.UserNotification", b =>
                {
                    b.HasOne("TeamTasker.Server.Domain.Entities.Notification", "Notification")
                        .WithMany("UserNotifications")
                        .HasForeignKey("NotificationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TeamTasker.Server.Domain.Entities.User", "User")
                        .WithMany("UserNotifications")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Notification");

                    b.Navigation("User");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Issue", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Notification", b =>
                {
                    b.Navigation("UserNotifications");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Project", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Issues");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Team", b =>
                {
                    b.Navigation("EmployeeTeams");

                    b.Navigation("Notifications");

                    b.Navigation("Project")
                        .IsRequired();
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.User", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("UserNotifications");
                });

            modelBuilder.Entity("TeamTasker.Server.Domain.Entities.Employee", b =>
                {
                    b.Navigation("EmployeeTeams");

                    b.Navigation("Issues");

                    b.Navigation("LeaderTeams");
                });
#pragma warning restore 612, 618
        }
    }
}
