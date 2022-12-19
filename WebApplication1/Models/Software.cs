using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class Software
{
    public string ProductKey { get; set; } = null!;

    public string Nome { get; set; } = null!;

    public virtual ICollection<Licenza> Licenzas { get; } = new List<Licenza>();
}
