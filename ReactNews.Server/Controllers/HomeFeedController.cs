﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NewsAPI;
using NewsAPI.Models;
using NewsAPI.Constants;
namespace ReactNews.Server.Controllers
{
    [ApiController]
    [Route("/api")]
    public class HomeFeedController : Controller
    {
        [HttpGet("Test")]
        public IEnumerable<int> GetArticle()
        {
            var yuh = new List<int>();
            return yuh;
        }

        [HttpGet("SearchedArticles")]
        public List<Article> SearchArticles(string query)
        {
            string API_KEY = "667cf68eaa6e48b0b06f3bf0a9590003";
            // API key
            //string API_KEY = "fbbc8a18e6934ad49468e2a21663801c";
            List<Article> ArtList = new List<Article>();
            var newsApiClient = new NewsApiClient(API_KEY);
            var articlesResponse = newsApiClient.GetEverything(new EverythingRequest
            {
                Q = query,
                SortBy = SortBys.Popularity,
                Language = Languages.EN,

            });
            if (articlesResponse.Status == Statuses.Ok)
            {
                foreach (var article in articlesResponse.Articles)
                {
                    //string trimmed = "";
                    if (article.Title != "[Removed]" && !string.IsNullOrEmpty(article.UrlToImage))
                    {

                        //if (article.Author.Contains(',')) { trimmed = article.Author.Trim(','); } else {  trimmed = article.Author; }

                        ArtList.Add(new Article(article.Title, article.Author, article.Description, article.PublishedAt.ToString(), article.Url, article.UrlToImage, article.Content));
                    }

                }
            }

            return ArtList;
        }


        [HttpGet("TopArticles")]
        public List<Article> GetTopArticles()
        {
            string API_KEY = "667cf68eaa6e48b0b06f3bf0a9590003";
            // API key
            //string API_KEY = "fbbc8a18e6934ad49468e2a21663801c";
            List<Article> ArtList = new List<Article>();
            var newsApiClient = new NewsApiClient(API_KEY);
            var articlesResponse = newsApiClient.GetTopHeadlines(new TopHeadlinesRequest
            {
                Q = "",
                Language = Languages.EN,

            });
            if (articlesResponse.Status == Statuses.Ok)
            {
                foreach (var article in articlesResponse.Articles)
                {
                    //string trimmed = "";
                    if (article.Title != "[Removed]" && !string.IsNullOrEmpty(article.UrlToImage))
                    {

                        //if (article.Author.Contains(',')) { trimmed = article.Author.Trim(','); } else {  trimmed = article.Author; }

                        ArtList.Add(new Article(article.Title, article.Author, article.Description, article.PublishedAt.ToString(), article.Url, article.UrlToImage, article.Content));
                    }

                }
            }

            return ArtList;
        }
    }


    public struct Article
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string DateTime { get; set; }
        public string Url { get; set; }
        public string ImagePath { get; set; }
        public string Source { get; set; }

        public Article(string title, string author, string description, string dateTime, string url, string imagepath, string source)
        {
            Title = title;
            Author = author;
            Description = description;
            DateTime = dateTime;
            Url = url;
            ImagePath = imagepath;
            Source = source;
        }

        public override string ToString()
        {
            return $"Title: {Title}\nAuthor: {Author}\nDescription: {Description}\nDate: {DateTime}\nURL: {Url}\nImage: {ImagePath}";
        }
    }
}