using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Domain.Interfaces
{
    public interface IEmployeeRepository
    {
        void CreateEmployee(Employee employee);
        void UpdateUser(User user);
        IEnumerable<Employee> GetAllEmployees();
        IEnumerable<User> GetAllUsers();
        Employee? GetEmployee(int? id);
        User? GetUserByEmail(string? email);
        User? GetUser(int? id);
        void DeleteEmployee(int? id);
    }
}
