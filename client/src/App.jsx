import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  useNavigate('/home')
  const handleEntry = () => {
    useNavigate('/home');
  }

  return (
    <div className="App">
      <div>
        <h1>Henry Videogames</h1>
      </div>
      <div onClick={handleEntry}>
        <button>Entry</button>
      </div>

      <Routes>
        <Route path='/'/>
        <Route path='/home'/>
        <Route path='/detail/:id'/>
        <Route path='/landing'/>
      </Routes>
    </div>
  )
}

export default App
