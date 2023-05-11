import React from 'react'
import { MovieCard } from '@/components/MovieCard'
import { Movie } from './types'
import { useState, useEffect } from 'react'
import styles from '@/styles/favorites.module.css'
import Head from 'next/head'

export const LOCAL_STORAGE_FAVORITES_KEY = 'favorite.movies.from.tmdb.api'

const Favorites = () => {
    const [favorites, setFavorites] = useState<Array<Movie>>([])

    useEffect(() => {
        const getFavorites = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY)
        if (getFavorites) {
            setFavorites(JSON.parse(getFavorites))
        }
    }, [])

    const removeFromFavorites = (movieId: number) => {
        const updatedFavorites = favorites.filter(
            (movie: Movie) => movie.id !== movieId
        )
        setFavorites(updatedFavorites)
        localStorage.setItem(
            LOCAL_STORAGE_FAVORITES_KEY,
            JSON.stringify(updatedFavorites)
        )
    }

    return (
        <>
            <Head>
                <title>Favorite Movies</title>
            </Head>
            <div className={styles.favoriteMoviesContainer}>
                <h1>My Favorites</h1>
                <div className={styles.favoritesMoviesList}>
                    {favorites.map((movie: Movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            removeFromFavorites={removeFromFavorites}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Favorites
