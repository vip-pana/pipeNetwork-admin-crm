using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class RelationTicketMessage
{
    public long TicketId { get; set; }

    public long MessageId { get; set; }

    public long Id { get; set; }

    public virtual Message Message { get; set; } = null!;

    public virtual Ticket Ticket { get; set; } = null!;
}
