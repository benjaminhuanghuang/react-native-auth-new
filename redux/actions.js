// action types
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const LOG_IN_SENT = 'LOG_IN_SENT'
export const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED'
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED'

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
    const response = await fetch("https://api.douban.com/v2/movie/in_theaters");
    const data = await response.json();
    dispatch({ type: GET_MOVIES, payload: data.subjects })
}

export const logInUser = (username, password) => async dispatch => {
    dispatch({ type: LOG_IN_SENT })
    try {
        const token = await login(username, password)
        dispatch({ type: LOG_IN_FULFILLED, payload: token })
    } catch (err) {
        dispatch({ type: LOG_IN_REJECTED, payload: err.message })
    }
}