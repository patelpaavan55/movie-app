import axios from 'axios'
import { ApiResponse, Movie } from '@/pages/types'
import { useEffect, useState } from 'react'
import { MovieCard } from '@/components/MovieCard'
import { API_KEY } from '@/pages/index'
import styles from '@/styles/PopularMovies.module.css'

const getPopulatedMovies = async () => {
    const response = await axios.get<ApiResponse>(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
    return response.data.results
}

export const PopularMovies = () => {
    const [movies, setMovies] = useState<Array<Movie>>([])

    useEffect(() => {
        getPopulatedMovies().then(setMovies)
    }, [])

    return (
        <div className={styles.popularMoviesContainer}>
            <h1>Popular Movies</h1>
            <div className={styles.popularMoviesList}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}
