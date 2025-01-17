using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.Emails;
using TeamTasker.Server.Application.Interfaces;
using TeamTasker.Server.Domain.Entities;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.Application.Services
{
    public class TasksService : ITasksService
    {
        private readonly IMapper _mapper;
        private readonly IEmailRepository _repo;
        private readonly IGmailServiceClient _gmailClient;

        public TasksService(IMapper mapper, IEmailRepository repo, IGmailServiceClient gmailClient)
        {
            _mapper = mapper;
            _repo = repo;
            _gmailClient = gmailClient;
        }

        public async Task<ReadEmailDto> CreateEmailEntry(CreateEmailDto emailEntryToCreate)
        {
            if (emailEntryToCreate == null)
                throw new ArgumentNullException();

            var dbEntryEmail = _mapper.Map<Email>(emailEntryToCreate);

            //Caution: At the moment of development, the only information about delievery is "WasSuccessfullySent" field
            bool isSendSuccess;
            try
            {
                await _gmailClient.SendEmailAsync(dbEntryEmail.TargetEmail, dbEntryEmail.MessageSubject, dbEntryEmail.MessageContent);

                isSendSuccess = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error! The message wasn't delivered because \"{ex.Message}\"");
                isSendSuccess = false;
            }

            //TODO: Add catch statements for "FileNotFound" and "FileLoad" Exceptions

            //Change needed fields
            dbEntryEmail.WhenSubmitted = DateTime.Now.ToUniversalTime();
            dbEntryEmail.WasSuccessfullySent = isSendSuccess;

            //Caution: DbUpdateException is catched in the Controller
            _repo.CreateEmailEntry(dbEntryEmail);

            return _mapper.Map<ReadEmailDto>(dbEntryEmail);
        }

        public IEnumerable<ReadEmailDto> GetAllEmailEntries()
        {
            var readEmailEntriesDto = _repo.GetAllEmailEntries();

            if (readEmailEntriesDto == null)
                throw new ArgumentNullException();

            if (!readEmailEntriesDto.Any())
                throw new KeyNotFoundException();

            var dBEmailEntries = _mapper.Map<IEnumerable<ReadEmailDto>>(readEmailEntriesDto);

            return dBEmailEntries;
        }

        public ReadEmailDto GetEmailEntry(int emailId)
        {
            if (emailId < 0)
                throw new ArgumentOutOfRangeException();

            if (_repo.GetEmailEntry(emailId) == null)
                throw new KeyNotFoundException();

            var readEmailEntryDto = _mapper.Map<ReadEmailDto>(_repo.GetEmailEntry(emailId));

            return readEmailEntryDto;
        }
    }
}
