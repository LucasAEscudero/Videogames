//react
import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { 
  getVideogames,
  getGenres,
  renderVideogames,
  loading
} from './redux/actions/actions'

//components
import Home from './views/home/Home'
import Detail from './views/detail/Detail'
import Landing from './views/landing/Landing'

import Nav from './components/navbar/NavBar'
import Error from './views/error/Error'


//styles
import './App.css'
import Create from './views/create/Create'

function App() {
  //hooks
  const [page, setPage] = useState(1)
  const maxApiPage = 5;
  
  //redux
  const dispatch = useDispatch();
  const maxPage = useSelector(state => state.maxPage);
  
  //load data
  useEffect(() => {
    (async () => {
      dispatch(loading());
      await dispatch(getVideogames(maxApiPage));
      await dispatch(renderVideogames(page));
      await dispatch(getGenres());
      dispatch(loading());
    })();
  }, [])

  const handlerPages = (event) => {
    if(event.target.value === 'previous' && page > 1) setPage(page - 1);
    if(event.target.value === 'next' && page < maxPage) setPage(page + 1);
  }

  //handler videogames load by pages - home
  useEffect(() => {
    dispatch(renderVideogames(page)); 
  }, [page])

  return(
    <div>
      { 
        useLocation().pathname !== '/' && 
        <Nav maxApiPage={maxApiPage} setPage={setPage} />
      }
      <Routes>
        <Route path='/' element={<Landing />}/>

        <Route path='/home' element={
          <Home 
            page={page}
            setPage={setPage}
            handlerPages={handlerPages} 
          />
        }/>
        <Route path='/detail/:id' element={<Detail />}/>
        <Route path='/create' element={<Create maxApiPage={maxApiPage} />}/>

        <Route path='*' element={<Error error="Error 404"/>}/>
      </Routes>
    </div>
  )
}

export default App
