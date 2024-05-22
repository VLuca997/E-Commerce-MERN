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

    
    
    
    
    
    //CRUD USER-----------------------------------------------------------------------



    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data
      }),
    }),
    


    getUser: builder.query({
      query: () =>({
        url: USERS_URL,
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),



    deleteUser: builder.mutation({
      query: userId=>({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE"
      }),
    }),



    getUserDetails: builder.query({
      query: () =>({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),




    updateUser: builder.mutation({
      query: data =>({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body:data
      }),
      invalidatesTags: ['User']
    })




    //CRUD USER-----------------------------------------------------------------------

    
    
  })
})

// Esporta l'hook per utilizzare la mutazione di login/logout
export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
    useProfileMutation,
    useGetUserQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation
  } = userApiSlice;
