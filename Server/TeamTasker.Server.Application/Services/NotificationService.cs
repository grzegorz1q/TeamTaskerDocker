using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.Noitifcations;
using TeamTasker.Server.Application.Dtos.Users;
using TeamTasker.Server.Application.Interfaces;
using TeamTasker.Server.Domain.Entities;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.Application.Services
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepo;
        private readonly IEmployeeRepository _employeeRepo;
        private readonly IUserNotificationRepository _userNotificationRepo;
        private readonly IMapper _mapper;

        public NotificationService(INotificationRepository notificationRepo, IEmployeeRepository employeeRepo, IUserNotificationRepository userNotificationRepo, IMapper mapper)
        {
            _notificationRepo = notificationRepo;
            _employeeRepo = employeeRepo;
            _userNotificationRepo = userNotificationRepo;
            _mapper = mapper;
        }
        public void AddNotificationToUser(AddNotificationToUserDto dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));
            
            var user = _employeeRepo.GetUser(dto.UserId);
            if (user == null)
                throw new Exception("User not found");

            var notification = _mapper.Map<Notification>(dto);
            _notificationRepo.CreateNotification(notification);

            var employeeNotification = new UserNotification { NotificationId = notification.Id, UserId=user.Id };
            _userNotificationRepo.AddUserNotification(employeeNotification);
        }
        public IEnumerable<ReadNotificationDto> GetUserNotifications(int userId)
        {
            var user = _employeeRepo.GetUser(userId);
            if (user == null)
                throw new Exception("User not found");

            var notifications = user.UserNotifications.Select(e => e.Notification).ToList();

            var notificationDtos = _mapper.Map<IEnumerable<ReadNotificationDto>>(notifications);
            return notificationDtos;
        }

        public void DeleteNotification(int id)
        {
            var notification = _notificationRepo.GetNotification(id);

            if (notification == null)
                throw new Exception("Notification not found.");

            _notificationRepo.DeleteNotification(id);
        }
    }
}
