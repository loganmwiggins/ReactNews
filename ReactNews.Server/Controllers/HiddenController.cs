using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using ReactNews.Server.Data.Models;
using ReactNews.Server.Data;

namespace ReactNews.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class HiddenController(AppDbContext dbContext) : Controller
    {
        private readonly ILogger<FavoritesController> _logger;
        private readonly AppDbContext _db = dbContext;

        [HttpPost("Add")]
        public async Task<IActionResult> AddArticle([FromBody] HiddenArticle hiddenArticle)
        {
            var Newarticle = new ReactNews.Server.Data.Models.HiddenArticle
            {
                Title = hiddenArticle.Title,
                Url = hiddenArticle.Url,
                Description = hiddenArticle.Description,
                Author = hiddenArticle.Author,
                ImagePath = hiddenArticle.ImagePath,
                DateTime = hiddenArticle.DateTime,
                Source = hiddenArticle.Source
            };
            _db.HiddenArticles.Add(Newarticle);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("Remove")]
        public async Task<IActionResult> RemoveArticle([FromBody] string url)
        {
            var article = await _db.HiddenArticles.FirstOrDefaultAsync(a => a.Url == url);
#pragma warning disable CS8604 // Possible null reference argument.
            _db.HiddenArticles.Remove(article);
#pragma warning restore CS8604 // Possible null reference argument.
            await _db.SaveChangesAsync();
            return Ok();

        }

        [HttpGet("GetHiddenArticles")]
        public async Task<IActionResult> GetHiddenArticles()
        {

            var favorites = await _db.HiddenArticles.ToListAsync();
            return Ok(favorites);

        }




    }
}
