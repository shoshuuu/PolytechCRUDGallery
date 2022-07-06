using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Image
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Path { get; set; }
        public string Description { get; set; }
        public byte[] ImageFile { get; set; }
    }
}