import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import { Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Register from './pages/register'
import Navbar from './components/navbar'
import './App.css'

function App() {
  

  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
