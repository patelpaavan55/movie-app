import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { ApiResponse, Movie } from './types'
import { useEffect, useState } from 'react'
import { MovieCard } from '@/components/MovieCard'
import { MovieDetails } from '@/components/MovieDetails'
import { Favorites } from '@/components/Favorites'

const inter = Inter({ subsets: ['latin'] })

const API_KEY = '1b4464d6bc39c8ec20570825347f6cb0'

const getPopulatedMovies = async () => {
  const response = await axios.get<ApiResponse>(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  )
  return response.data.results
}

export default function Home() {
  const [movies, setMovies] = useState<Array<Movie>>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  useEffect(() => {
    getPopulatedMovies().then(setMovies)
  }, [])

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  return (
    <>
      <Head>
        <title>Movie App</title>
        <meta
          name='description'
          content='Popular Movies generated using NextJs and the MovieDB API'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <h1>Popular Movies</h1>
        <div className='movie-list'>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={handleMovieClick}
            />
          ))}
        </div>
        {selectedMovie && <MovieDetails movie={selectedMovie} />}
        <Favorites />
      </div>
    </>
  )
}
