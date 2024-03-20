import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine reducers
const rootReducer = combineReducers({ user: userReducer });

// Redux persist configuration with storage key, storage engine, storage schema version
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Persisted reducer, Root reducer with persistence and disabled serializable check for Redux persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor for persisting store state
export const persistor = persistStore(store);
