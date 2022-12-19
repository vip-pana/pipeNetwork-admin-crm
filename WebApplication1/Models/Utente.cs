using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class Utente
{
    public long Id { get; set; }

    public string Nome { get; set; } = null!;

    public string Cognome { get; set; } = null!;

    public DateOnly? Nascita { get; set; }

    public string Email { get; set; } = null!;

    public string? Cellulare { get; set; }

    public string? Indirizzo { get; set; }

    public string? CartaDebito { get; set; }

    public DateOnly? Iscrizione { get; set; }

    public string? Paese { get; set; }

    public virtual CartaDebito? CartaDebitoNavigation { get; set; }

    public virtual ICollection<Ticket> Tickets { get; } = new List<Ticket>();
}
