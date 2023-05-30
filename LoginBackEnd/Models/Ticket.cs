using System;
using System.Collections.Generic;

namespace LoginBackEnd.Models;

public partial class Ticket
{
    public string? Heading { get; set; }

    public string? Status { get; set; }

    public long Id { get; set; }

    public DateOnly? Date { get; set; }

    public long? ByContact { get; set; }

    public string? Content { get; set; }

    public virtual Contact? ByContactNavigation { get; set; }
}
