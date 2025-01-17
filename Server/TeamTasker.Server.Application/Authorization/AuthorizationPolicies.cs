using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTasker.Server.Application.Authorization
{
    public static class AuthorizationPolicies
    {
        public const string AdminUserPolicy = "AdminUserPolicy";
        public const string LoggedInUserPolicy = "LoggedInUserPolicy";
        public const string BothUserPolicy = "BothUserPolicy";
    }
}
