//components

//styles
import styles from './Library.module.css'

function Library({ videogames, handlePages, page, handlerOptions, genres, isLoading }) {
    const dispatch = useDispatch();
    const byName = useSelector(state => state.byName);
    const error = useSelector(state => state.error);

    const resetFilters = () => {        
        dispatch(reset());
        dispatch(renderVideogames(1))
    }

    if(isLoading) return(<div><Loading /></div>)
    
    return(
        <div className={styles.home}>
            <div className={styles.options}>
                <div className={styles.types}>
                    <label>Type: </label>
                    <Options 
                        name="genres" 
                        values={genres} 
                        onChange={handlerOptions}
                    />
                    <Options 
                        name="origin" 
                        values={['API + BD', 'API', 'BD']} 
                        onChange={handlerOptions}
                    />
                </div>

                <div className={styles.types}>
                    <label>Order: </label>
                    <Options 
                        name="name" 
                        values={['Ascendent', 'Descendent']} 
                        onChange={handlerOptions}
                    />
                    <Options 
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
                        />
                    })
                }
            </div>
        
            { 
                !byName &&
                <div className={styles.navigate}>
                    <button value="previous" onClick={handlePages}>Previous</button>
                    <label htmlFor="">Page {page}</label>
                    <button value="next" onClick={handlePages}>Next</button>
                </div>
            }
        </div>
    )
    
}

export default Library