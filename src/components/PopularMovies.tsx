import axios from 'axios'
import { ApiResponse, Movie } from '@/pages/types'
import { useEffect, useState } from 'react'
import { MovieCard } from '@/components/MovieCard'
import { API_KEY } from '@/pages/index'
import styles from '@/styles/PopularMovies.module.css'

const getPopulatedMovies = async (pageNum: number) => {
    const response = await axios.get<ApiResponse>(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`
    )
    return response.data.results
}

export const PopularMovies = () => {
    const [page, setPage] = useState(1)
    const [movies, setMovies] = useState<Array<Movie>>([])

    useEffect(() => {
        getPopulatedMovies(page).then((newMovies) =>
            setMovies((prevMovies) => [...prevMovies, ...newMovies])
        )
    }, [page])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop
            const scrollHeight =
                document.documentElement.scrollHeight ||
                document.body.scrollHeight

            if (scrollTop + window.innerHeight >= scrollHeight - 200) {
                setPage((prevPage) => prevPage + 1)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
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
