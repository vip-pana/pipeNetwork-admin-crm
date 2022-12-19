using WebApplication1.Data;
using WebApplication1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private GcmaucfjContext _context;

        public TicketController (GcmaucfjContext context)
        {
            _context = context;
        }

        // GET: api/<TicketController>
        [HttpGet]
        public async Task<ActionResult<List<Ticket>>> Get()
        {
            return Ok(await _context.Tickets.ToListAsync());
        }

        // GET api/<TicketController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> Get(long id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null) { return NotFound("Ticket not found"); }
            return Ok(ticket);
        }

        // GET api/<TicketController>/5
        [HttpGet("byUser/{id}")]
        public async Task<ActionResult<List<Ticket>>> GetByUser(long id)
        {
            //var tickets = from tick in _context.Tickets
            //              join user in _context.Utentes on tick.Utente equals id  
            //              select tick;

            var ticketList = await _context.Tickets.ToListAsync();
            var tickedSelected = new List<Ticket>();

            for (int i = 0; i < ticketList.Count; i++)
            {
                var ticket = ticketList[i];
                if (ticket.Utente == id) { tickedSelected.Add(ticket); }
            }

            //if (tickets.Count<Ticket>() == 0) { return NotFound("not found tickets");}
            //return Ok(tickets);

            if (tickedSelected.Count == 0) 
            {
                return NotFound("Not Found tickets");
            }
            return Ok(tickedSelected);
        }

        // POST api/<TicketController>
        [HttpPost]
        public async Task<ActionResult<Ticket>> Post(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
            return Ok(await _context.Tickets.ToListAsync());
        }

        // PUT api/<TicketController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Ticket>>> Put(Ticket request)
        {
            var ticket = await _context.Tickets.FindAsync(request.Id);
            if (ticket == null) { return NotFound("Ticket not found"); }
    
            ticket.Status = request.Status;
            ticket.MainObject = request.MainObject;
                    
            await _context.SaveChangesAsync();
            return Ok(await _context.Tickets.ToListAsync());
        }

        // DELETE api/<TicketController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Ticket>>> Delete(long id)
        {
            var dbTicket= await _context.Tickets.FindAsync(id);
            if (dbTicket == null)
            { return NotFound("Ticket not Found");}

            _context.Tickets.Remove(dbTicket);
            await _context.SaveChangesAsync();
            return Ok(await _context.Tickets.ToListAsync());
        }
    }
}
