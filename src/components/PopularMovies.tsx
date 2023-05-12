import { FixedSizeGrid as Grid } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import AutoSizer from 'react-virtualized-auto-sizer'
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
    const [page, setPage] = useState<number>(1)
    const [movies, setMovies] = useState<Array<Movie>>([])

    useEffect(() => {
        getPopulatedMovies(page).then((newMovies) =>
            setMovies((prevMovies) => [
                ...prevMovies,
                ...newMovies.filter(Boolean),
            ])
        )
    }, [page])

    const isItemLoaded = (index: number) => !!movies[index]
    const loadMoreItems = () => setPage((p) => p + 1)

    const itemCount = movies.length + 1

    return (
        <div className={styles.popularMoviesContainer}>
            <AutoSizer>
                {({ height, width }) => {
                    if (height === undefined || width === undefined) {
                        return <></>
                    }
                    console.log('Height', height)
                    const columnWidth = 240
                    const rowHeight = 450
                    const desiredColumnCount = Math.floor(width / columnWidth)
                    const columnCount =
                        desiredColumnCount > 0 ? desiredColumnCount : 1
                    return (
                        <InfiniteLoader
                            isItemLoaded={isItemLoaded}
                            itemCount={itemCount}
                            loadMoreItems={loadMoreItems}
                        >
                            {({ onItemsRendered, ref }) => (
                                <Grid
                                    className={styles.popularMoviesList}
                                    columnCount={columnCount}
                                    columnWidth={columnWidth}
                                    height={height}
                                    rowCount={Math.ceil(
                                        itemCount / columnCount
                                    )}
                                    rowHeight={rowHeight}
                                    width={width}
                                    ref={ref}
                                    onItemsRendered={({
                                        visibleRowStartIndex,
                                        visibleRowStopIndex,
                                        overscanRowStartIndex,
                                        overscanRowStopIndex,
                                    }) => {
                                        onItemsRendered({
                                            overscanStartIndex:
                                                overscanRowStartIndex *
                                                columnCount,
                                            overscanStopIndex:
                                                overscanRowStopIndex *
                                                columnCount,
                                            visibleStartIndex:
                                                visibleRowStartIndex *
                                                columnCount,
                                            visibleStopIndex:
                                                visibleRowStopIndex *
                                                columnCount,
                                        })
                                    }}
                                >
                                    {({ columnIndex, rowIndex, style }) => {
                                        const index =
                                            rowIndex * columnCount + columnIndex
                                        const movie = movies[index]
                                        return movie ? (
                                            <MovieCard
                                                movie={movies[index]}
                                                style={style}
                                            />
                                        ) : null
                                    }}
                                </Grid>
                            )}
                        </InfiniteLoader>
                    )
                }}
            </AutoSizer>
        </div>
    )
}
