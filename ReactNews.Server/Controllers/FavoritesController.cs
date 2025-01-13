using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using ReactNews.Server.Data.Models;
using ReactNews.Server.Data;

namespace ReactNews.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class FavoritesController(AppDbContext dbContext) : Controller
    {
        private readonly ILogger<FavoritesController> _logger;
        private readonly AppDbContext _db = dbContext;


        [HttpPost("Add")]
        public async Task<IActionResult> AddArticle([FromBody] FavoriteArticle favoriteArticle)
        {
            var Newarticle = new ReactNews.Server.Data.Models.FavoriteArticle
            {
                Title = favoriteArticle.Title,
                Url = favoriteArticle.Url,
                Description = favoriteArticle.Description,
                Author = favoriteArticle.Author,
                ImagePath = favoriteArticle.ImagePath,
                DateTime = favoriteArticle.DateTime,
                Source = favoriteArticle.Source
            };
            _db.FavoriteArticles.Add(Newarticle);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("Remove")]
        public async Task<IActionResult> RemoveArticle([FromBody] string url)
        {
            var article = await _db.FavoriteArticles.FirstOrDefaultAsync(a => a.Url == url);
#pragma warning disable CS8604 // Possible null reference argument.
            _db.FavoriteArticles.Remove(article);
#pragma warning restore CS8604 // Possible null reference argument.
            await _db.SaveChangesAsync();
            return Ok();

        }

        [HttpGet("GetFavorites")]
        public async Task<IActionResult> GetFavorites()
        {

            var favorites = await _db.FavoriteArticles.ToListAsync();
            return Ok(favorites);

        }
    }
}
