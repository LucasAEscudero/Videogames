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
  renderVideogames 
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
  const dispatch = useDispatch();
  const [page, setPage] = useState(1)
  const maxApiPage = 5;
  const [isLoading, SetIsLoading] = useState(false);

  const videogames = useSelector(state => state.videogames);
  const maxPage = useSelector(state => state.maxPage);
  const genres = useSelector(state => state.allGenres);
  const platforms = useSelector(state => state.allPlatforms);
  // const renderVid = videogames.slice(((page-1)*15), ((page-1)*15) + 15);
  // const renderVid = useSelector(state => state.renderVideogames)
  
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
      SetIsLoading(true);
      await dispatch(getVideogames(maxApiPage));
      await dispatch(renderVideogames(page));
      await dispatch(getGenres());
      await dispatch(getPlatforms());
      SetIsLoading(false);
    })();
  }, [])

  //pages handlers - home
  const handlePages = (event) => {
    // console.log(maxPage)
    if(event.target.value === 'previous' && page > 1) setPage(page - 1);
    if(event.target.value === 'next' && page < maxPage) setPage(page + 1);
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

  useEffect(() => {
    // dispatch(renderVideogames(page));
    switch(options.change){
      case "genres": 
        dispatch(genresFilter(options.genres));
        dispatch(renderVideogames(1));
        setPage(1);
        break;
      case "origin":
        dispatch(originFilter(options.origin));
        dispatch(renderVideogames(1));
        setPage(1);
        break;
      case "name": 
        dispatch(nameOrder(options.name));
        dispatch(renderVideogames(1));
        setPage(1);
        break;
      case "rating": 
        dispatch(ratingOrder(options.rating));
        dispatch(renderVideogames(1));
        setPage(1);
        break;
    }

  }, [options.cChanges]);

  return(
    <div>
      { 
        useLocation().pathname !== '/' && 
        <Nav maxApiPage={maxApiPage} setPage={setPage} setIsLoading={SetIsLoading} />
      }
      <Routes>
        <Route path='/' element={<Landing />}/>

        <Route path='/home' element={
        <Home 
          videogames={videogames} 
          handlePages={handlePages} 
          page={page}
          maxPage={maxPage}
          handlerOptions={handlerOptions}
          genres={genres}
          isLoading={isLoading}
        />
        }/>
        <Route path='/detail/:id' element={<Detail />}/>
        <Route path='/create' element={<Create genres={genres} platforms={platforms}/>}/>

        <Route path='*' element={<Error error="Error 404"/>}/>
      </Routes>
    </div>
  )
}

export default App
