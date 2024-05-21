import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice.js';

/**
 * Configura il Redux store
 * `reducer` combina i reducer di `apiSlice` e `auth`
 * `middleware` aggiunge il middleware di `apiSlice` alla lista dei middleware di default
 * `devTools` abilita Redux DevTools per il debugging
 */
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

// Imposta i listener per le query di `apiSlice`
setupListeners(store.dispatch)

// Esporta lo store
export default store;
