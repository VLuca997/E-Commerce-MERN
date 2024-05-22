import { createSlice } from "@reduxjs/toolkit";

/**
 * Stato iniziale del slice di autenticazione
 * Controlla se `userInfo` è presente nel localStorage, altrimenti lo imposta a null
 */
const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

/**
 * Crea un slice di Redux per la gestione dell'autenticazione
 * Contiene azioni e riduttori (reducers) per gestire lo stato dell'autenticazione
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** 
     * Azione per impostare le credenziali dell'utente
     * Salva `userInfo` nello stato e nel localStorage
     */
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem('expirationTime', expirationTime)
    },
    /** 
     * Azione per effettuare il logout dell'utente
     * Resetta `userInfo` nello stato e cancella il localStorage
     */
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    }
  }
});

// Esporta le azioni generate automaticamente
export const { setCredentials, logout } = authSlice.actions;

// Esporta il reducer
export default authSlice.reducer;
