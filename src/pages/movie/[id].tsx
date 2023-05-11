import { useRouter } from 'next/router'
import { Movie } from '../types'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_KEY } from '..'
import { MovieDetails } from '@/components/MovieDetails'

const MovieDetailsPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    if (id) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        )
        .then((response) => {
          setMovie(response.data)
        })
        .catch((error) => console.error('Error fetching movie details:', error))
    }
  }, [id])

  if (!movie) {
    return <div>Loading...</div>
  }

  return <MovieDetails movie={movie} />
}
export default MovieDetailsPage
