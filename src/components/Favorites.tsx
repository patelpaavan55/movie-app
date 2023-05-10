import { Movie } from '@/pages/types'
import { useState, useEffect } from 'react'

export const Favorites = () => {
  const [favorites, setFavorites] = useState<Array<Movie>>([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const removeFromFavorites = (movieId: number) => {
    const updatedFavorites = favorites.filter(
      (movie: Movie) => movie.id !== movieId
    )
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  return (
    <div className='favorites'>
      <h2>My Favorites</h2>
      {favorites.map((movie: Movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <button onClick={() => removeFromFavorites(movie.id)}>
            Remove from favorites
          </button>
        </div>
      ))}
    </div>
  )
}
