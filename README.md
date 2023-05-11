# Movie App

This Movie App is a simple web application built with Next.js that allows users to browse popular movies, view movie details, and manage their favorite movies list. The application fetches data from [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api).

## Features

-   Browse popular movies
-   View movie details, including title, release date, overview, and rating
-   Add movies to favorites
-   Remove movies from favorites
-   Responsive design

## Prerequisites

-   Node.js v12 or higher

## Installation

1. Clone the repository:

```bash
git clone https://github.com/patelpaavan55/movie-app.git
```

2. Change the working directory to the project folder:

```bash
cd movie-app
```

3. Install the dependencies:

```bash
npm install
```

4. Create a .env.local file in the root folder and add your TMDb API key into `NEXT_PUBLIC_API_KEY`:

```bash
echo 'NEXT_PUBLIC_API_KEY=your_tmdb_api_key' > .env.local
```

## Running the Application

Start the development server:

```bash
npm run dev
```

## Building for Production

To build the application for production, run:

```bash
npm run build
```

This command will generate a .next folder containing the optimized production build.
