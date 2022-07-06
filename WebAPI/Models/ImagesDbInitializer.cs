using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class ImagesDbInitializer : DropCreateDatabaseAlways<AppDbContext>
    {
        protected override void Seed(AppDbContext context)
        {
            List<Image> images = new List<Image>();
            int i = 1;
            var rootPath = AppDomain.CurrentDomain.BaseDirectory;
            foreach(string file in Directory.GetFiles(rootPath + @"App_Data\images"))
            {
                context.Images.Add(new Image { Id = i, Description = "Default Description", Path = file, ImageFile =  File.ReadAllBytes(file)});
            }
            /*
            context.Images.Add(
                new Image
                {
                    Id = 1,
                    Path = "/App_Data/images/shoshuu3.png",
                    Description = "Default description"
                });
            context.Images.Add(
                new Image
                {
                    Id = 2,
                    Path = "/App_Data/images/лиzя и саш.png",
                    Description = "Default description"
                });
            context.Images.Add(
                new Image
                {
                    Id = 3,
                    Path = "/App_Data/images/лиzя и саш2.png",
                    Description = "Default description"
                });
            */
            base.Seed(context);
        }
    }
}