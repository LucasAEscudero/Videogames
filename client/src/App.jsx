//react
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

//components
import Home from './components/home/Home'
import Landing from './components/landing/Landing'
import Nav from './components/nav/Nav'

//styles
import './App.css'

function App() {


  return (
    <div>
      { useLocation().pathname !== '/' && <Nav /> }
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='*' />
      </Routes>
    </div>
  )
}

export default App
