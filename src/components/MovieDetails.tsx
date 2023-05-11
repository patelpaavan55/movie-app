import { FC } from 'react'
import { Movie } from '@/pages/types'
import Image from 'next/image'
type MovieDetailsProps = {
  movie: Movie
}
export const MovieDetails: FC<MovieDetailsProps> = ({ movie }) => {
  const { title, release_date, overview, vote_average } = movie
  const BASE_IMG_URL = `https://image.tmdb.org/t/p/w500`

  return (
    <div className='movie-details'>
      <h1>{title}</h1>
      <p>{release_date}</p>
      <p>{overview}</p>
      <p>Rating: {vote_average}</p>
      <Image
        src={`${BASE_IMG_URL}${movie.backdrop_path}`}
        alt={`${movie.title} poster`}
        width={300}
        height={450}
      />
    </div>
  )
}
