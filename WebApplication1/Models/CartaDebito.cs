using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class CartaDebito
{
    public string Numero { get; set; } = null!;

    public string Titolare { get; set; } = null!;

    public DateOnly DataScadenza { get; set; }

    public virtual ICollection<Acquisto> Acquistos { get; } = new List<Acquisto>();

    public virtual ICollection<Utente> Utentes { get; } = new List<Utente>();
}
