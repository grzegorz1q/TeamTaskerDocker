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
    public class EmailRepository : IEmailRepository
    {
        private readonly AppDbContext _dbContext;

        public EmailRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void CreateEmailEntry(Email emailEntryToCreate)
        {
            if (emailEntryToCreate == null)
                throw new ArgumentNullException();

            _dbContext.Add(emailEntryToCreate);
            SaveChanges();
        }

        public bool DoesEmailExist(int emailId)
        {
            if (_dbContext.Emails.FirstOrDefault(email => email.Id == emailId) == null)
                return false;

            return true;
        }

        public IEnumerable<Email> GetAllEmailEntries()
        {
            var allDbEntryEmails = _dbContext.Emails.ToList();

            return allDbEntryEmails;
        }

        public Email? GetEmailEntry(int emailId)
        {
            return _dbContext.Emails.FirstOrDefault(email => email.Id == emailId);
        }

        public bool SaveChanges()
        {
            return _dbContext.SaveChanges() == 0 ? false : true;
        }



        //TODO: Implement following functions
        public IEnumerable<Email> GetAllEmailsByEmailAddress(string emailAddress)
        {
            throw new NotImplementedException();
        }

        public bool WasEmailAddressUsed(string emailAddress)
        {
            throw new NotImplementedException();
        }
    }
}
