﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

//using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
namespace ReactNews.Server.Data.Models
{
    public class FavoriteArticle
    {
        public int FavoriteArticleId { get; set; }

        [Required]
        public string? Title { get; set; }

        [Required]
        public string? Description { get; set; }

        public string? Author { get; set; }

        public string? DateTime { get; set; }

        public string? Url { get; set; }

        [Required]
        public string? ImagePath { get; set; }

        public string?  Source { get; set; }
    }

    public class HiddenArticle
    {
        public int HiddenArticleId { get; set; }

        [Required]
        public string? Title { get; set; }

        [Required]
        public string? Description { get; set; }

        public string? Author { get; set; }

        public string? DateTime { get; set; }

        public string? Url { get; set; }

        [Required]
        public string? ImagePath { get; set; }

        public string? Source { get; set; }
    }
}