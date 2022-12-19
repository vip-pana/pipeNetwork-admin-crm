using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class Acquisto
{
    public long TxId { get; set; }

    public string CartaDebito { get; set; } = null!;

    public long Licenza { get; set; }

    public bool StatoPagamento { get; set; }

    public double Importo { get; set; }

    public virtual CartaDebito CartaDebitoNavigation { get; set; } = null!;

    public virtual Licenza LicenzaNavigation { get; set; } = null!;
}
