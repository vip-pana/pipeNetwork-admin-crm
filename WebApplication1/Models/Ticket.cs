using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class Ticket
{
    public long Id { get; set; }

    public string Status { get; set; } = null!;

    public string? MainObject { get; set; }

    public long? Utente { get; set; }

    public virtual ICollection<RelationTicketMessage> RelationTicketMessages { get; } = new List<RelationTicketMessage>();

    public virtual Utente? UtenteNavigation { get; set; }
}
