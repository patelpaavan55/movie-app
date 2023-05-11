import React from 'react'
import { MovieCard } from '@/components/MovieCard'
import { Movie } from './types'
import { useState, useEffect } from 'react'
import styles from '@/styles/favorites.module.css'
import Head from 'next/head'

const Favorites = () => {
    const [favorites, setFavorites] = useState<Array<Movie>>([])

    useEffect(() => {
        const getFavorites = localStorage.getItem('favorites')
        if (getFavorites) {
            setFavorites(JSON.parse(getFavorites))
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
        <>
            <Head>
                <title>Favorite Movies</title>
            </Head>
            <div className={styles.favoriteMoviesContainer}>
                <h1>My Favorites</h1>
                <div className="movie-list">
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
