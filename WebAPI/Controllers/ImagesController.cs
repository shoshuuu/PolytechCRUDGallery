using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebAPI.Models;
using System.Web.Http.Cors;

namespace WebAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ImagesController : ApiController
    {
        readonly AppDbContext imagesContext = new AppDbContext();
        [HttpGet]
        public IEnumerable<Image> GetAllImages()
        {
            return imagesContext.Images;
        }

        [HttpGet]
        public async Task<Image> GetImage(int id)
        {
            Image image =  await imagesContext.Images.FindAsync(id);
            return image;
        }

        [HttpPost]
        public async void AddImage([FromBody] Image image)
        {
            imagesContext.Images.Add(image);
            await imagesContext.SaveChangesAsync();
            //Здесь нужно сделать так, чтобы битовый массив
            //из json сохранялся в папку /App_Data/images
        }

        [HttpPatch]
        public async void EditImage(int id, [FromBody] Image image)
        {
            if (id == image.Id)
            {
                imagesContext.Entry(image).State = EntityState.Modified;
                await imagesContext.SaveChangesAsync();
            }
        }

        // DELETE api/<controller>/5
        [HttpDelete]
        public async void DeleteImage(int id)
        {
            Image image = await imagesContext.Images.FindAsync(id);
            if(image != null)
            {
                imagesContext.Images.Remove(image);
                await imagesContext.SaveChangesAsync();
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                imagesContext.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}