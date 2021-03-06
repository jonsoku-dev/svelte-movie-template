import axios from 'axios'
import { get, writable } from 'svelte/store'
import _unionBy from 'lodash/unionBy'

const OBDB_API_KEY = '9b09ed9e'

export const movies = writable([])
export const theMovie = writable({})
export const loading = writable(false)
export const message = writable('Search for the movie title!')

export async function searchMovies(payload) {
    if (get(loading)) return
    loading.set(true)

    const { title, type, year, number } = payload

    let total = 0

    try {
        const res = await _fetchMovie({
            ...payload,
            page: 1,
        })
        const { Search, totalResults } = res.data
        movies.set(Search)
        total = totalResults
    } catch (msg) {
        movies.set([])
        message.set(msg)
        loading.set(false)
        return
    }

    const pageLength = Math.ceil(total / 10)

    if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page += 1) {
            if (page > number / 10) break
            const res = await _fetchMovie({
                ...payload,
                page,
            })
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

    try {
        const res = await _fetchMovie({ id })
        theMovie.set(res.data)
        console.log(res.data)
        loading.set(false)
    } catch (msg) {
        movies.set([])
        message.set(msg)
        loading.set(false)
    }
}

function _fetchMovie(payload) {
    const { title, type, year, page, id } = payload
    const url = id
        ? `http://www.omdbapi.com/?apikey=${OBDB_API_KEY}&i=${id}&plot=full`
        : `http://www.omdbapi.com/?apikey=${OBDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(url)
            console.log(res.data)
            if (res.data.Error) {
                reject(res.data.Error)
            }
            resolve(res)
        } catch (e) {
            console.log(e.response.status)
            reject(error.message)
        }
    })
}
