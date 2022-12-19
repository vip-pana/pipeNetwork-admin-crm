using WebApplication1.Data;
using WebApplication1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class LeadController : ControllerBase
    {

        private GcmaucfjContext _context;

        public LeadController(GcmaucfjContext context)
        {
            _context = context;
        }


        // GET: api/<LeadController>
        [HttpGet]
        public async Task<ActionResult<List<Lead>>> Get()
        {
            return Ok(await _context.Leads.ToListAsync());
        }

        // GET api/<LeadController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lead>> Get(long id)
        {
            var lead = await _context.Leads.FindAsync(id);
            if (lead == null) { return NotFound("Lead not found"); }

            return Ok(lead);
        }

        // POST api/<LeadController>
        [HttpPost]
        public async Task<ActionResult<Lead>> Post(Lead lead)
        {
            _context.Leads.Add(lead);
            await _context.SaveChangesAsync();
            return Ok(await _context.Leads.ToListAsync());
        }

        // PUT api/<LeadController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Lead>>> Put(Lead request)
        {
            var lead = await _context.Leads.FindAsync(request.Id);
            if (lead == null) { return NotFound("Lead not found"); }

            lead.Nome = request.Nome;
            lead.Cognome = request.Cognome;
            lead.Email = request.Email;
            lead.Cellulare = request.Cellulare;
            lead.Indirizzo = request.Indirizzo;
            lead.Nascita = request.Nascita;
            lead.ArrivoLead= request.ArrivoLead;
            lead.InNewsLetter = request.InNewsLetter;
            lead.IsCalled= request.IsCalled;
            lead.InFreeTrial= request.InFreeTrial;
            lead.Stage= request.Stage;

            await _context.SaveChangesAsync();
            return Ok(await _context.Leads.ToListAsync());
        }

        // DELETE api/<LeadController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Lead>>> Delete(long id)
        {
            var dbLead = await _context.Leads.FindAsync(id);
            if (dbLead== null)
            {
                return NotFound("Ticket not Found");
            }
            _context.Leads.Remove(dbLead);
            await _context.SaveChangesAsync();
            return Ok(await _context.Leads.ToListAsync());
        }
    }
}
