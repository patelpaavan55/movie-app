import { Movie } from '@/pages/types'
import { useState, FC, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/MovieCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

type MovieProps = {
    movie: Movie
    removeFromFavorites?: (movieId: number) => void
}

export const MovieCard: FC<MovieProps> = ({ movie, removeFromFavorites }) => {
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
            if (removeFromFavorites) {
                removeFromFavorites(movie.id)
            }
        } else {
            favorites.push(movie)
            localStorage.setItem('favorites', JSON.stringify(favorites))
        }
        setIsFavorite((prevFavorite) => !prevFavorite)
    }

    const BASE_IMG_URL = `https://image.tmdb.org/t/p/w500`

    return (
        <div className={styles.movieCard}>
            <Link href="/movie/[id]" as={`movie/${movie.id}`}>
                {movie.poster_path && (
                    <Image
                        src={`${BASE_IMG_URL}${movie.poster_path}`}
                        alt={`${movie.title} poster`}
                        width={200}
                        height={300}
                    />
                )}
                <div className={styles.titleContainer}>
                    <h3>{movie.title}</h3>
                </div>
            </Link>
            <div className={styles.bottomContainer}>
                <p>Release Date: {movie.release_date}</p>
                <button
                    className={`${styles.favoriteButton} ${
                        isFavorite ? styles.red : styles.gray
                    }`}
                    onClick={handleFavoriteClick}
                >
                    <FontAwesomeIcon icon={faHeart} />
                </button>
            </div>
        </div>
    )
}
