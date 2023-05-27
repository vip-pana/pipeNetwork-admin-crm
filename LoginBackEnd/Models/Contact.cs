using System;
using System.Collections.Generic;

namespace LoginBackEnd.Models;

public partial class Contact
{
    public string? Name { get; set; }

    public string? Surname { get; set; }

    public string? Email { get; set; }

    public string? Status { get; set; }

    public long Id { get; set; }
}
