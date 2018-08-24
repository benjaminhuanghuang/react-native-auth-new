import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
//
import allReducer from './reducer'
import { addContact } from './actions'


export const store = createStore(allReducer, applyMiddleware(thunk))

