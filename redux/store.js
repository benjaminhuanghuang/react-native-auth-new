import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// https://github.com/rt2zz/redux-persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

//
import allReducer from './reducer'
import { addContact } from './actions'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, allReducer)

export const store = createStore(allReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
