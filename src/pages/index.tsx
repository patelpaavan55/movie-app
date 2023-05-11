import Head from 'next/head'
import { PopularMovies } from '@/components/PopularMovies'

export const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export default function Home() {
    return (
        <>
            <Head>
                <title>Movie App</title>
                <meta
                    name="description"
                    content="Popular Movies generated using NextJs and the MovieDB API"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PopularMovies />
        </>
    )
}
