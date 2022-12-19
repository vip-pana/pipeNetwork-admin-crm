using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class Message
{
    public long Id { get; set; }

    public string Contenuto { get; set; } = null!;

    public DateOnly Inviato { get; set; }

    public string Role { get; set; } = null!;

    public virtual ICollection<RelationTicketMessage> RelationTicketMessages { get; } = new List<RelationTicketMessage>();
}
