//react
import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { 
  getVideogames,
  getGenres,
  getPlatforms,
  genresFilter, 
  nameOrder, 
  originFilter, 
  ratingOrder, 
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
  // const [options, setOptions] = useState({
  //   genres: "",
  //   origin: "API+BD",
  //   name: "",
  //   rating: "",
  //   change: "",
  //   cChanges: 0
  // });
  
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
      await dispatch(getPlatforms());
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

  //handler source videogames (API / BD) - home
  // const handlerOptions = (event) => {
  //   setOptions({
  //     ...options,
  //     [event.target.name]: event.target.value,
  //     change: event.target.name,
  //     cChanges: options.cChanges + 1
  //   });
  // }

  // useEffect(() => {
  //   switch(options.change){
  //     case "genres": 
  //       dispatch(genresFilter(options.genres));
  //       dispatch(renderVideogames(1));
  //       setPage(1);
  //       break;
  //     case "origin":
  //       dispatch(originFilter(options.origin));
  //       dispatch(renderVideogames(1));
  //       setPage(1);
  //       break;
  //     case "name": 
  //       dispatch(nameOrder(options.name));
  //       dispatch(renderVideogames(1));
  //       setPage(1);
  //       break;
  //     case "rating": 
  //       dispatch(ratingOrder(options.rating));
  //       dispatch(renderVideogames(1));
  //       setPage(1);
  //       break;
  //   }

  // }, [options.cChanges]);

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
