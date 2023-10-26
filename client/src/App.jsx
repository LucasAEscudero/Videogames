//react
import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import axios from 'axios'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { getVideogames, renderVideogames } from './redux/actions/actions'

//components

import Nav from './components/nav/Nav'
import Detail from './views/detail/Detail'

import Landing from './views/landing/Landing'
import Home from './views/home/Home'

import Error from './views/Error/Error'


//styles
import './App.css'

function App() {
  //hooks
  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogames);
  
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(2);

  //load first videogames - home
  useEffect(() => {
    (async () => {
      await dispatch(getVideogames(page));
      await dispatch(renderVideogames(page));
      await dispatch(getVideogames(maxPage));
    })();
  }, [])

  //pages handlers - home
  const handlePages = (event) => {
    if(event.target.value === 'previous' && page > 1) setPage(page - 1);
    if(event.target.value === 'next') setPage(page + 1);
  }

  //handler videogames load by pages - home
  useEffect(() => {
    if(page === maxPage){
      setMaxPage(maxPage + 1);
      dispatch(getVideogames(maxPage));
    }

    dispatch(renderVideogames(page)); 
  }, [page])

  return(
    <div>
      { useLocation().pathname !== '/' && <Nav /> }
      <Routes>
        <Route path='/' element={<Landing />}/>

        <Route path='/home' element={
        <Home 
          videogames={videogames} 
          handlePages={handlePages} 
          page={page}
        />
        }/>
        <Route path='/detail/:id' element={<Detail />}/>

        <Route path='*' element={<Error />}/>
      </Routes>
    </div>
  )
}

export default App
