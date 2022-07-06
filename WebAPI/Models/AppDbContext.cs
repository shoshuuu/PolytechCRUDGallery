using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Image> Images { get; set; }
    }
}