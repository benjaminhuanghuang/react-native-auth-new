import { combineReducers } from 'redux'

import { LOG_IN_SENT, LOG_IN_FULFILLED, LOG_IN_REJECTED } from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

// Movie reducer
const contactReducer = (state = [], action) => {
    if (action.type === GET_MOVIES) return [...state, action.payload]
    return state
  }


// User reducer
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOG_IN_FULFILLED:
            return merge(state, { token: action.payload })
        case LOG_IN_REJECTED:
            return merge(state, { loginErr: action.payload })
        default:
            return state
    }
}


// All reducer
const allReducer = combineReducers({
    user: userReducer
})

export default allReducer;
