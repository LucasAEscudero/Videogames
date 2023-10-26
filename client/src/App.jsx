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
  const [page, setPage] = useState(1)
  const maxApiPage = 5;

  const videogames = useSelector(state => state.videogames);
  // const renderVid = videogames.slice(((page-1)*15), ((page-1)*15) + 15);
  // const renderVid = useSelector(state => state.renderVideogames)
  const maxPage = useSelector(state => state.maxPage);
  
  //handlerOptions
  const [options, setOptions] = useState({
    genres: "",
    origin: "API+BD",
    name: "",
    rating: "",
    change: "",
    cChanges: 0
  });

  //load first videogames - home
  useEffect(() => {
    (async () => {
      await dispatch(getVideogames(maxApiPage));
      await dispatch(renderVideogames(page));
    })();
  }, [])

  //pages handlers - home
  const handlePages = (event) => {
    if(event.target.value === 'previous' && page > 1) setPage(page - 1);
    if(event.target.value === 'next' && page < maxPage + 1) setPage(page + 1);
  }

  //handler videogames load by pages - home
  useEffect(() => {
    dispatch(renderVideogames(page)); 
  }, [page])


  //handler source videogames (API / BD) - home
  const handlerOptions = (event) => {
    setOptions({
      ...options,
      [event.target.name]: event.target.value,
      change: event.target.name,
      cChanges: options.cChanges + 1
    });
  }

  // console.log(options)

  useEffect(() => {
    // dispatch(renderVideogames(page));
    switch(options.change){
      case "genres": return console.log('genres');
      case "origin": return console.log('origin');
      case "name": return console.log('name');
      case "rating": return console.log('order');
    }

  }, [options.cChanges]);


  //SEARCH - home
  console.log(options)


  return(
    <div>
      { useLocation().pathname !== '/' && <Nav maxApiPage={maxApiPage} setPage={setPage} /> }
      <Routes>
        <Route path='/' element={<Landing />}/>

        <Route path='/home' element={
        <Home 
          videogames={videogames} 
          handlePages={handlePages} 
          page={page}
          handlerOptions={handlerOptions}
        />
        }/>
        <Route path='/detail/:id' element={<Detail />}/>

        <Route path='*' element={<Error />}/>
      </Routes>
    </div>
  )
}

export default App
