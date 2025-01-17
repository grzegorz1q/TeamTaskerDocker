using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Entities;

namespace TeamTasker.Server.Domain.Interfaces
{
    public interface IEmailRepository
    {
        bool SaveChanges();

        void CreateEmailEntry(Email emailEntryToCreate);
        IEnumerable<Email> GetAllEmailEntries();
        Email? GetEmailEntry(int emailId);
        bool DoesEmailExist(int emailId);


        //TODO: Implement Additional Functions
        IEnumerable<Email> GetAllEmailsByEmailAddress(string emailAddress);
        bool WasEmailAddressUsed(string emailAddress);
    }
}
