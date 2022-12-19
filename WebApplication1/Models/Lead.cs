using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class Lead
{
    public long Id { get; set; }

    public string Nome { get; set; } = null!;

    public string Cognome { get; set; } = null!;

    public DateOnly? Nascita { get; set; }

    public string Email { get; set; } = null!;

    public string? Cellulare { get; set; }

    public string? Indirizzo { get; set; }

    public DateOnly? ArrivoLead { get; set; }

    public bool? InNewsLetter { get; set; }

    public bool? IsCalled { get; set; }

    public bool? InFreeTrial { get; set; }

    public long Stage { get; set; }
}
