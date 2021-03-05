import axios from 'axios'
import { get, writable } from 'svelte/store'
import _unionBy from 'lodash/unionBy'

const OBDB_API_KEY = '9b09ed9e'

export const movies = writable([])
export const theMovie = writable({})
export const loading = writable(false)

export async function searchMovies(payload) {
    if (get(loading)) return
    loading.set(true)

    const { title, type, year, number } = payload

    const res = await axios.get(
        `http://www.omdbapi.com/?apikey=${OBDB_API_KEY}&s=${title}&type=${type}&y=${year}`
    )

    const { Search, totalResults } = res.data
    movies.set(Search)

    const pageLength = Math.ceil(totalResults / 10)

    if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page += 1) {
            if (page > number / 10) break
            const res = await axios.get(
                `http://www.omdbapi.com/?apikey=${OBDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
            )
            const { Search } = res.data
            movies.update(($movies) => {
                return _unionBy($movies, Search, 'imdbID') // 중복 제거
            })
        }
    }

    loading.set(false)
}

export async function searchMovieWithId(id) {
    if (get(loading)) return
    loading.set(true)

    const res = await axios.get(
        `http://www.omdbapi.com/?apikey=${OBDB_API_KEY}&i=${id}&plot=full`
    )

    theMovie.set(res.data)
    loading.set(false)
}
