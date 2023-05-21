using System;
using System.Collections.Generic;

namespace LoginBackEnd.Models;

public partial class User
{
    public long Id { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;
}
