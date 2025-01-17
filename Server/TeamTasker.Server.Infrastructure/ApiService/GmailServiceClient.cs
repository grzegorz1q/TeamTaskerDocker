using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TeamTasker.Server.Domain.Interfaces;

namespace TeamTasker.Server.Infrastructure.ApiService
{
    public class GmailServiceClient : IGmailServiceClient
    {
        public Task SendEmailAsync(string targetEmail, string messageSubject, string messageContent)
        {
            var smtpCredentials = ReadCredentialsFromConfig();

            var smtpGmailClient = new SmtpClient("smtp.gmail.com", 587)
            {
                EnableSsl = true,
                Credentials = smtpCredentials
            };

            return smtpGmailClient.SendMailAsync(
                new MailMessage(from: smtpCredentials.UserName,
                                to: targetEmail,
                                messageSubject,
                                messageContent
                                ));
        }
        private NetworkCredential ReadCredentialsFromConfig()
        {
            var userName = "teamtasker545@gmail.com";
            var appPassword = "ttkj vaqd zckx wcti";

            return new NetworkCredential(userName, appPassword);
        }
    }
}
