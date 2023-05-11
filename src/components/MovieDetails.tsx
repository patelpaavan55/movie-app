import { FC } from 'react'
import { Movie } from '@/pages/types'
import Image from 'next/image'
import styles from '@/styles/MovieDetails.module.css'

type MovieDetailsProps = {
    movie: Movie
}
export const MovieDetails: FC<MovieDetailsProps> = ({ movie }) => {
    const { title, release_date, overview, vote_average } = movie
    const BASE_IMG_URL = `https://image.tmdb.org/t/p/w500`

    return (
        <div className={styles['movie-details']}>
            <Image
                className={styles['img']}
                src={`${BASE_IMG_URL}${movie.backdrop_path}`}
                alt={`${movie.title} poster`}
                width={300}
                height={450}
            />
            <div className={styles['content']}>
                <h1 className={styles['h1']}>{title}</h1>
                <p className={styles['italic']}>{release_date}</p>
                <p>{overview}</p>
                <p className={styles['bold']}>Rating: {vote_average}</p>
            </div>
        </div>
    )
}
