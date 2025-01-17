using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.Emails;

namespace TeamTasker.Server.Application.Interfaces
{
    public interface ITasksService
    {
        IEnumerable<ReadEmailDto> GetAllEmailEntries();
        ReadEmailDto GetEmailEntry(int emailId);
        Task<ReadEmailDto> CreateEmailEntry(CreateEmailDto emailEntryToCreate);
    }
}
