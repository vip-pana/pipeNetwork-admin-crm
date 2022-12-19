using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtenteController : ControllerBase
    {

        private GcmaucfjContext _context;

        public UtenteController(GcmaucfjContext context)
        {
            _context = context;
        }


        // GET: api/<UtenteController>
        [HttpGet]
        public async Task<ActionResult<List<Utente>>> Get()
        {
            return Ok(await _context.Utentes.ToListAsync());
        }

        // GET api/<UtenteController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Utente>> Get(long id)
        {
            var User = await _context.Utentes.FindAsync(id);
            if (User == null) { return NotFound("Utente not found"); }

            return Ok(User);
        }

        // POST api/<UtenteController>
        [HttpPost]
        public async Task<ActionResult<Utente>> Post(Utente utente)
        {
            _context.Utentes.Add(utente);
            await _context.SaveChangesAsync();
            return Ok(await _context.Utentes.ToListAsync());
        }

        // PUT api/<UtenteController>/5

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Utente>>> Put(Utente request)
        {
            var responsabile = await _context.Utentes.FindAsync(request.Id);
            if (responsabile == null) { return NotFound("Utente not found"); }
            responsabile.Nome = request.Nome;
            responsabile.Cognome = request.Cognome;
            responsabile.Email = request.Email;
            responsabile.Cellulare = request.Cellulare;
            responsabile.Indirizzo = request.Indirizzo;
            responsabile.CartaDebito = request.CartaDebito;
            responsabile.Iscrizione = request.Iscrizione;
            responsabile.Nascita = request.Nascita;

            await _context.SaveChangesAsync();
            return Ok(await _context.Utentes.ToListAsync());

        }



        // DELETE api/<UtenteController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Utente>>> Delete(long id)
        {
            var utente = await _context.Utentes.FindAsync(id);

            if (utente== null)
            {
                return NotFound("Utente not Found");
            }
            _context.Utentes.Remove(utente);
            await _context.SaveChangesAsync();
            return Ok(await _context.Utentes.ToListAsync());
        }
    }
}
