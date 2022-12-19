using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class Responsabile
{
    public long Id { get; set; }

    public string? Nome { get; set; }

    public string? Cognome { get; set; }

    public string Email { get; set; } = null!;

    public string? Cellulare { get; set; }

    public string? Indirizzo { get; set; }

    public string Password { get; set; } = null!;

    public DateOnly? Nascita { get; set; }
}
