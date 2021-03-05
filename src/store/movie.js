import axios from 'axios'
import { get, writable } from 'svelte/store'
import _unionBy from 'lodash/unionBy'

export const movies = writable([])

export async function searchMovies(payload) {
    const { title, type, year, number } = payload

    const OBDB_API_KEY = '9b09ed9e'

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

    console.log(get(movies))
}
