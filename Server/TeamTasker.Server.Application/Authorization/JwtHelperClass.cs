using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamTasker.Server.Application.Dtos.Users;

namespace TeamTasker.Server.Application.Authorization
{
    static public class JwtHelperClass
    {
        public static readonly string developmentSecureKey = "This is a temp secure key, definitely NOT for Production";

        public static string GenerateToken(ReadUserDto readUserDto)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(developmentSecureKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);

            var payload = new JwtPayload
            {
                { "email", readUserDto.Email },
                { "roleId", readUserDto.RoleId.ToString() },
                { JwtRegisteredClaimNames.Exp, new DateTimeOffset(DateTime.Now.AddMinutes(10))}
            };

            var payload2 = new JwtPayload(readUserDto.Email, null, null, null, DateTime.Now.AddMinutes(60))
            {
                { "roleId", readUserDto.RoleId.ToString() }
            }; //10 minutes

            var securityToken = new JwtSecurityToken(header, payload2);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        public static JwtSecurityToken VerifyToken(string stringifiedToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var encodingKey = Encoding.ASCII.GetBytes(developmentSecureKey);

            tokenHandler.ValidateToken(stringifiedToken, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(encodingKey),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);

            return (JwtSecurityToken)validatedToken;
        }
    }
}
