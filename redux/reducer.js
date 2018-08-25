import { combineReducers } from 'redux'

import { LOG_IN_SENT, LOG_IN_SUCCESS, LOG_IN_REJECTED, GET_MOVIES } from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

// Movie reducer
const moviesReducer = (state = [], action) => {
    switch (action.type) {
        case GET_MOVIES:
            return [...action.payload];
        default:
            return state
    }
  }


// User reducer
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOG_IN_SUCCESS:
            return merge(state, { token: action.payload })
        case LOG_IN_REJECTED:
            return merge(state, { loginErr: action.payload })
        default:
            return state
    }
}


// All reducer
const allReducer = combineReducers({
    user: userReducer,
    movies: moviesReducer,
})

export default allReducer;
