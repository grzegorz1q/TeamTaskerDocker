using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;
using TeamTasker.Server.Domain.Interfaces;
using TeamTasker.Server.Infrastructure.Presistence;

namespace TeamTasker.Server.Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _appDbContext;

        //TODO: Fix issues with the database access

        public EmployeeRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public void CreateEmployee(Employee employee)
        {
            if (employee == null)
                throw new ArgumentNullException();

            _appDbContext.Users.Add(employee);
            _appDbContext.SaveChanges();
        }

        public void UpdateUser(User user)
        {
            if (user == null)
                throw new ArgumentNullException();

            _appDbContext.Users.Update(user);
            _appDbContext.SaveChanges();
        }

        public IEnumerable<Employee> GetAllEmployees()
        {
            var allDbEmployees = _appDbContext.Users.OfType<Employee>().ToList();

            return allDbEmployees;
        }
        public IEnumerable<User> GetAllUsers()
        {
            var allDbUsers = _appDbContext.Users.ToList();

            return allDbUsers;
        }

        public Employee? GetEmployee(int? id)
        {
            return _appDbContext.Users.OfType<Employee>().FirstOrDefault(employee => employee.Id == id);
        }

        public User? GetUserByEmail(string? email)
        {
            return _appDbContext.Users.FirstOrDefault(u => u.Email == email);
        }
        public User? GetUser(int? id)
        {
            return _appDbContext.Users.FirstOrDefault(employee => employee.Id == id);
        }

        public void DeleteEmployee(int? id)
        {
            if (id == null)
                throw new ArgumentNullException();

            var employeeToDelete = _appDbContext.Users.OfType<Employee>().FirstOrDefault(employee => employee.Id == id);
            if (employeeToDelete != null)
            {
                _appDbContext.Users.Remove(employeeToDelete);
                _appDbContext.SaveChanges();
            }
        }

    }
}
