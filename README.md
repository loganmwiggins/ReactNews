# ReactNews App

A modern news aggregator app built with React and .NET Core, featuring the ability to favorite, hide, and share articles. This project also integrates with a PostgreSQL database to manage user interactions such as saved favorites and hidden articles.

## Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Setup Instructions](#setup-instructions)
4. [Technology Stack](#technology-stack)

---

## Project Overview

**ReactNews** is a web application designed to help users browse, favorite, hide, and share news articles seamlessly. The app offers a clean UI for effortless navigation and supports personalization through user-defined interactions.

---

## Features

- **Browse News**: Explore a curated list of articles with title, author, description, and source information.
- **Favorite Articles**: Save articles for future reading by favoriting them.
- **Hide Articles**: Remove articles from view by hiding them.
- **Share Articles**: Share articles via email using the built-in `mailto:` feature.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## Setup Instructions

Follow these steps to set up and run the project locally:

### Clone the Repository

1. Open your terminal or command prompt.
2. Run the following command to clone the repository:
   ```bash
   git clone https://github.com/your-username/react-news.git
   cd react-news
   ```

### Database Setup

1. Ensure PostgreSQL is installed on your system
2. Open a terminal and create a new PostgreSQL database named 'reactnews':
   ```bash
   createdb reactnews
   ```

### Run EF Migrations

1. Open the Package Manager Console in Visual Studio or use your terminal.
2. Run the following command to apply Entity Framework migrations and update the database schema:
   ```bash
   update-database
   ```
   Alternatively, if you're using the command line, you can run:
   ```bash
   dotnet ef database update
   ```

### Run the Project

1. Start the backend server:
   - Navigate to the project directory containing the .NET API and run:
     ```bash
     dotnet run
     ```
2. Start the frontend React application:
   - Navigate to the client directory and run:
     ```bash
     npm install
     npm start
     ```

---

## Technology Stack

- **Frontend**: React, CSS
- **Backend**: ASP.NET Core Web API
- **Database**: PostgreSQL
- **Other Tools**: Entity Framework Core, Fetch API
