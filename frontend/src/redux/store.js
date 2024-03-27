import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import { persistReducer as persist } from 'redux-persist'; // Import as a different name

import storage from 'redux-persist/lib/storage'; // Assuming you have storage imported separately
import persistStore from 'redux-persist/es/persistStore.js';

const rootReducer = combineReducers({
    user: userReducer
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1
};

const persistedReducer = persist(persistConfig, rootReducer); // Use a different name for the constant

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store);
