import { Movie } from '@/pages/types'
import { useState, FC, useEffect, EventHandler } from 'react'

type MovieProps = {
  movie: Movie
  onMovieClick: Function
}

export const MovieCard: FC<MovieProps> = ({ movie, onMovieClick }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites)
      const isFav = favorites.some(
        (favMovie: Movie) => favMovie.id === movie.id
      )
      setIsFavorite(isFav)
    }
  }, [movie.id])

  const handleFavoriteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const storedFavorites = localStorage.getItem('favorites') || '[]'
    const favorites = JSON.parse(storedFavorites)

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (favMovie: Movie) => favMovie.id !== movie.id
      )
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    } else {
      favorites.push(movie)
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
    setIsFavorite((prevFavorite) => !prevFavorite)
  }

  const BASE_IMG_URL = `https://image.tmdb.org/t/p/w500`

  return (
    <div className='movie-card' onClick={() => onMovieClick(movie)}>
      <img
        src={`${BASE_IMG_URL}${movie.poster_path}`}
        alt={`${movie.title} poster`}
        width={200}
        height={300}
      />
      <h2>{movie.title}</h2>
      <p>Release Date: {movie.release_date}</p>
      <button onClick={handleFavoriteClick}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  )
}
