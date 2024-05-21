import { apiSlice } from "./apiSlice.js";
import { USERS_URL } from '../constants.js';

/**
 * Crea un endpoint API per il login dell'utente
 * `builder.mutation` è usato per creare una mutazione per il login
 * `query` definisce i dettagli della richiesta HTTP
 */
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data
      })
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),


    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data
      }),
    }),
    
  })
})

// Esporta l'hook per utilizzare la mutazione di login/logout
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = userApiSlice;
