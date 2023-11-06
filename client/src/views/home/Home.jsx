import { useState, useEffect } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux'
import { renderVideogames, reset, genresFilter, originFilter, nameOrder, ratingOrder } from '../../redux/actions/actions'

//components
import Videogame from '../../components/videogame/Videogame';
import Options from '../../components/options/Options';
import Loading from '../../components/loading/Loading';
import Error from '../error/Error';

//styles
import styles from './Home.module.css'

function Home({ page, setPage, handlerPages }) {
    //hooks
    const [options, setOptions] = useState({
        genres: "",
        origin: "API+BD",
        name: "",
        rating: "",
        change: "",
        cChanges: 0
    });

    //redux
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames);

    //aux
    const byName = useSelector(state => state.byName);
    const error = useSelector(state => state.error);
    const isLoading = useSelector(state => state.isLoading);

    const maxPage = useSelector(state => state.maxPage);
    const genres = useSelector(state => state.allGenres);

    //handler reset button
    const resetFilters = () => {        
        dispatch(reset());
        dispatch(renderVideogames(1));
    }

    //options
    const handlerOptions = (event) => {
        setOptions({
          ...options,
          [event.target.name]: event.target.value,
          change: event.target.name,
          cChanges: options.cChanges + 1
        });
    }

    useEffect(() => {
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

    if(isLoading) return(<div><Loading /></div>)
        
    //error search
    if(error) return(<div><Error error={error} /></div>)
    
    return(
        <div className={styles.home}>
            <div className={styles.options}>
                <div className={styles.types}>
                    <label htmlFor='types'>Type: </label>
                    <Options 
                        key="genres"
                        name="genres" 
                        values={genres} 
                        onChange={handlerOptions}
                    />
                    <Options 
                        key="origin"
                        name="origin" 
                        values={['API + BD', 'API', 'BD']} 
                        onChange={handlerOptions}
                    />
                </div>

                <div className={styles.types}>
                    <label htmlFor='order'>Order: </label>
                    <Options 
                        key="name"
                        name="name" 
                        values={['Ascendent', 'Descendent']} 
                        onChange={handlerOptions}
                    />
                    <Options 
                        key="rating"
                        name="rating" 
                        values={['Minor', 'Major']} 
                        onChange={handlerOptions}
                    />
                </div>

                <button onClick={resetFilters}>Reset</button>
            </div>
            
            <div className={styles.videogames}>
                {
                    videogames?.map(videogame => {
                        return <Videogame
                            key={videogame.id}
                            id={videogame.id}
                            name={videogame.name}
                            rating={videogame.rating}
                            released={videogame.released}
                            image={videogame.image}
                            platforms={videogame.platforms}
                            genres={videogame.genres}
                            tags={videogame.tags}
                            origin={videogame.origin}
                        />
                    })
                }
            </div>
        
            { 
                !byName ?
                <div className={styles.navigate}>
                    <button 
                        value="previous" 
                        onClick={handlerPages}
                        disabled={page === 1}
                    >Prev</button>
                    <label htmlFor='page'>Page {page}</label>
                    <button 
                        value="next" 
                        onClick={handlerPages}
                        disabled={page === maxPage || maxPage === 0}
                    >Next</button>
                </div> 
                :
                <div className={styles.space}></div>

            }
        </div>
    )
    
}

export default Home