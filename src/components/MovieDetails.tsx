import { FC } from 'react'
import { Movie } from '@/pages/types'
type MovieDetailsProps = {
  movie: Movie
}
export const MovieDetails: FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <div className='movie-details'>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Average Rating: {movie.vote_average}</p>
    </div>
  )
}
