using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class Licenza
{
    public long Id { get; set; }

    public string TipoLicenza { get; set; } = null!;

    public DateOnly DataAttivazione { get; set; }

    public DateOnly? DataScadenza { get; set; }

    public string Software { get; set; } = null!;

    public virtual ICollection<Acquisto> Acquistos { get; } = new List<Acquisto>();

    public virtual Software SoftwareNavigation { get; set; } = null!;
}
