using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


using WebApplication1.Data;
using WebApplication1.Models;


using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;



public class UserData
{
    public String email { get; set; }
    public String pwd { get; set; }

}
namespace WebApplication1.Controllers
    



{

    

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private GcmaucfjContext _context;
        private readonly IConfiguration _configuration;
        public AuthController(GcmaucfjContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<string>> Login(UserData user)
        {
            var listUsers = await _context.Responsabiles.ToListAsync();

            for (int i = 0; i < listUsers.Count; i++)
            {
                if (listUsers[i].Email.Equals(user.email))
                {
                    if (listUsers[i].Password.Equals(user.pwd))
                    {
                        string token = CreateToken(listUsers[i]);


                        return Ok(token);
                    }
                    return Forbid("Uncorrect password");
                }
            }
            return NotFound("Responsabile not found");
        }


        private string CreateToken(Responsabile responsabile)
        {

            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, responsabile.Email),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
               _configuration.GetSection("AppSettings:Token").Value));



            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(5),
                signingCredentials: cred
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }    
    }
}
