using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {

        private GcmaucfjContext _context;
        public MessageController(GcmaucfjContext context)
        {
            _context = context;
        }

        // GET: api/<MessageController>
        [HttpGet]
        public async Task<ActionResult<List<Message>>> Get()
        {
            return Ok(await _context.Messages.ToListAsync());
        }

        // GET api/<MessageController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> Get(long id)
        {
            var SingleMessage = await _context.Messages.FindAsync(id);
            if (SingleMessage == null) { return NotFound("Message not found"); }

            return Ok(SingleMessage);
        }

        // POST api/<MessageController>
        [HttpPost]
        public async Task<ActionResult<Message>> Post(Message message)
        {
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return Ok(await _context.Messages.ToListAsync());
        }



        // PUT api/<MessageController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Message>>> Put(Message request)
        {
            var SingleMessage = await _context.Messages.FindAsync(request.Id);
            if (SingleMessage == null) { return NotFound("Utente not found"); }
            SingleMessage.Contenuto = request.Contenuto;
            SingleMessage.Inviato = request.Inviato;
            SingleMessage.Role = request.Role;

            await _context.SaveChangesAsync();
            return Ok(await _context.Messages.ToListAsync());

        }

        // DELETE api/<MessageController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Message>>> Delete(long id)
        {
            var SingleMessage = await _context.Messages.FindAsync(id);

            if (SingleMessage == null)
            {
                return NotFound("SingleMessage not Found");
            }
            _context.Messages.Remove(SingleMessage);
            await _context.SaveChangesAsync();
            return Ok(await _context.Messages.ToListAsync());
        }
    }
}
