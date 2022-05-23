import { createStore } from 'redux';
import rootReducer from './reducers';
import InitialState from "./InitialState";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, InitialState);

export const persistor = persistStore(store);
export default store;