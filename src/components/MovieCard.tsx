import { Movie } from '@/pages/types'
import { useState, FC, useEffect, CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/MovieCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { LOCAL_STORAGE_FAVORITES_KEY } from '@/pages/favorites'

type MovieProps = {
    movie: Movie
    removeFromFavorites?: (movieId: number) => void
    style?: CSSProperties
}

export const MovieCard: FC<MovieProps> = ({
    movie,
    removeFromFavorites,
    style,
}) => {
    const BASE_IMG_URL = `https://image.tmdb.org/t/p/w500`

    const [isFavorite, setIsFavorite] = useState<boolean>(false)

    useEffect(() => {
        const storedFavorites = localStorage.getItem(
            LOCAL_STORAGE_FAVORITES_KEY
        )
        if (storedFavorites) {
            const favorites = JSON.parse(storedFavorites)
            if (Array.isArray(favorites)) {
                const isFav = favorites.some(
                    (favMovie: Movie) => favMovie.id === movie.id
                )
                setIsFavorite(isFav)
            }
        }
    }, [movie.id])

    const handleFavoriteClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        const storedFavorites =
            localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY) || '[]'
        const favorites = JSON.parse(storedFavorites)

        if (Array.isArray(favorites)) {
            if (isFavorite) {
                const updatedFavorites = favorites.filter(
                    (favMovie: Movie) => favMovie.id !== movie.id
                )
                localStorage.setItem(
                    LOCAL_STORAGE_FAVORITES_KEY,
                    JSON.stringify(updatedFavorites)
                )
                if (removeFromFavorites) {
                    removeFromFavorites(movie.id)
                }
            } else {
                favorites.push(movie)
                localStorage.setItem(
                    LOCAL_STORAGE_FAVORITES_KEY,
                    JSON.stringify(favorites)
                )
            }
        }
        setIsFavorite((prevFavorite) => !prevFavorite)
    }

    return (
        <div className={styles.movieCard} style={style}>
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
                <p>Release On: {movie.release_date}</p>
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
