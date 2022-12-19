using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    // UserData is for login
    public class UserData
    {
        public String email { get; set; }
        public String pwd { get; set; }

    }


    [Route("api/[controller]")]
    [ApiController]
    public class ResponsabileController : ControllerBase
    {

        private GcmaucfjContext _context;

        public ResponsabileController(GcmaucfjContext context)
        {
            _context = context;
        }


        // GET All
        [HttpGet]
        public async Task<ActionResult<List<Responsabile>>> Get()
        {
            return Ok(await _context.Responsabiles.ToListAsync());
        }

        // GET one
        [HttpGet("{id}")]
        public async Task<ActionResult<Responsabile>> Get(long id)
        {
            var User = await _context.Responsabiles.FindAsync(id);
            if (User == null) { return NotFound("Responsabile not found"); }

            return Ok(User);
        }

        // POST
        [HttpPost]
        public async Task<ActionResult<Responsabile>> Post(Responsabile responsabile)
        {
            _context.Responsabiles.Add(responsabile);
            await _context.SaveChangesAsync();
            return Ok(await _context.Responsabiles.ToListAsync());
        }

        // POST api/<ResponsabileController>/login, NON ANCORA PROVATO
        [HttpPost("login")]
        public async Task<ActionResult<List<Responsabile>>> Login(UserData user)
        {
            var listUsers = await _context.Responsabiles.ToListAsync();

            for (int i = 0; i < listUsers.Count; i++)
            {
                if (listUsers[i].Email.Equals(user.email))
                {
                    if (listUsers[i].Password.Equals(user.pwd))
                    {
                        return Ok(listUsers[i]);
                    }
                    return Forbid("Uncorrect password");
                }
            }
            return NotFound("Responsabile not found");
        }

        // PUT 
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Responsabile>>> Put(Responsabile request)
        {
            var responsabile = await _context.Responsabiles.FindAsync(request.Id);
            if (responsabile == null) { return NotFound("Responsabile not found"); }

            responsabile.Nome = request.Nome;
            responsabile.Cognome = request.Cognome;
            responsabile.Email = request.Email;
            responsabile.Cellulare = request.Cellulare;
            responsabile.Indirizzo = request.Indirizzo;
            responsabile.Password = request.Password;
            responsabile.Nascita = request.Nascita;


            await _context.SaveChangesAsync();
            return Ok(await _context.Responsabiles.ToListAsync());

        }

        // DELETE 
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Responsabile>>> Delete(long id)
        {
            var dbResponsabile = await _context.Responsabiles.FindAsync(id);
            if (dbResponsabile == null)
            {
                return NotFound("Responsabile not Found");
            }
            _context.Responsabiles.Remove(dbResponsabile);
            await _context.SaveChangesAsync();
            return Ok(await _context.Responsabiles.ToListAsync());
        }
    }
}
