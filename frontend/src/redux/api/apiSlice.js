import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'

// Configura la base query con l'URL di base dell'API
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })

/**
 * Crea un'istanza di API slice
 * `tagTypes` definisce i tipi di tag usati per l'invalidazione della cache
 * `endpoints` è una funzione che ritorna un oggetto vuoto, in quanto gli endpoint saranno iniettati successivamente
 */
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({})
})
