import React from 'react'
import './App.css'

import { Outlet } from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import { ToastContainer } from 'react-toastify' // Container per notifiche

import 'react-toastify/dist/ReactToastify.css' // Importa gli stili di Toastify

function App() {
  return (
    <>
        {/* Contenitore per le notifiche */}
      <ToastContainer />
      {/* Componente di navigazione */}
      <Navigation />
      <main className='py-5'>
        {/* Outlet renderizza i componenti figli definiti nelle route */}
        <Outlet />
      </main>
    </>
  )
}

export default App
