import { fetchDoubanMovies, login } from '../api'


// action types
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'

export const LOG_IN_SENT = 'user:log_in_sent'
export const LOG_IN_SUCCESS = 'user:log_in_success'
export const LOG_IN_REJECTED = 'user:log_in_rejected'

export const GET_MOVIES = 'movie:get_movies'
export const GET_MOVIES_LOADING = 'movie:get_movies_loading'

// action creators
export const updateUser = update => ({
    type: UPDATE_USER,
    payload: update,
})

export const addContact = newContact => ({
    type: UPDATE_CONTACT,
    payload: newContact,
})

// async action creator
export const getMovies = () => async dispatch => {
    dispatch({ type: GET_MOVIES_LOADING })
    try {
        const movies = await fetchDoubanMovies();
        dispatch({ type: GET_MOVIES, payload: movies })
    } catch (err) {
        dispatch({ type: GET_MOVIES, payload: err.message })
    }
}

export const logInUser = (username, password) => async dispatch => {
    dispatch({ type: LOG_IN_SENT })
    try {
        const token = await login(username, password)
        dispatch({ type: LOG_IN_SUCCESS, payload: token })
    } catch (err) {
        dispatch({ type: LOG_IN_REJECTED, payload: err.message })
    }
}