using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LoginBackEnd.Models;

namespace LoginBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly PostgresContext _context;

        public ContactsController(PostgresContext context)
        {
            _context = context;
        }

        // GET: api/Contacts3
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
          if (_context.Contacts == null)
          {
              return NotFound();
          }
            return await _context.Contacts.ToListAsync();
        }

        // GET: api/Contacts/filter
        [HttpGet("filter/{filter}")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetOrderByContacts(string filter)
        {
            if (_context.Contacts == null)
            {
                return NotFound();
            }

            IQueryable<Contact> query = _context.Contacts;

            switch (filter)
            {
                case "name":
                    query = query.OrderBy(x => x.Name);
                    break;
                case "surname":
                    query = query.OrderBy(x => x.Surname);
                    break;
                case "email":
                    query = query.OrderBy(x => x.Email);
                    break;
                case "status":
                    query = query.OrderBy(x => x.Status);
                    break;
                // Aggiungi altri casi per altri campi di ordinamento se necessario
                default:
                    // Campo di ordinamento non valido, restituisci un errore o un messaggio di avviso
                    return BadRequest("Campo di ordinamento non valido.");
            }

            return await query.ToListAsync(); 
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(long id)
        {
          if (_context.Contacts == null)
          {
              return NotFound();
          }
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        // PUT: api/Contacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(long id, Contact contact)
        {
            if (id != contact.Id)
            {
                return BadRequest();
            }

            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Contacts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
          if (_context.Contacts == null)
          {
              return Problem("Entity set 'PostgresContext.Contacts'  is null.");
          }
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContact", new { id = contact.Id }, contact);
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(long id)
        {
            if (_context.Contacts == null)
            {
                return NotFound();
            }
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactExists(long id)
        {
            return (_context.Contacts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
