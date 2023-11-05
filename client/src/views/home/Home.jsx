//redux
import { useSelector, useDispatch } from 'react-redux'
import { getVideogames, renderVideogames, reset } from '../../redux/actions/actions'

//components
import Videogame from '../../components/videogame/Videogame';
import Options from '../../components/options/Options';
import Loading from '../../components/loading/Loading';
import Error from '../error/Error';

//styles
import styles from './Home.module.css'

function Home({ handlePages, page, maxPage, handlerOptions, genres, isLoading }) {
    //redux
    const dispatch = useDispatch();
    const byName = useSelector(state => state.byName);
    const error = useSelector(state => state.error);
    const videogames = useSelector(state => state.videogames)

    const resetFilters = () => {        
        dispatch(reset());
        dispatch(renderVideogames(1));
    }

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
                        onClick={handlePages}
                        disabled={page === 1}
                    >Prev</button>
                    <label htmlFor='page'>Page {page}</label>
                    <button 
                        value="next" 
                        onClick={handlePages}
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