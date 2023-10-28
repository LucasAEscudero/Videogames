//react
import { useState, useEffect } from 'react'
import axios from 'axios'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { getVideogames, renderVideogames, reset } from '../../redux/actions/actions'

//components
import Videogame from '../../components/videogame/Videogame';
import Options from '../../components/options/Options';

//styles
import styles from './Home.module.css'

function Home({ videogames, handlePages, page, handlerOptions, genres }) {
    const dispatch = useDispatch();

    const resetFilters = () => {        
        dispatch(reset());
        dispatch(renderVideogames(1))
    }
//genres para las options - generar componentes
    return(
        <div>
            <label htmlFor="">Type: </label>
            <Options name="genres" values={genres} onChange={handlerOptions}/>
            <Options name="origin" values={['API + BD', 'API', 'BD']} onChange={handlerOptions}/>

            <label htmlFor="">Order: </label>
            <Options name="name" values={['Ascendent', 'Descendent']} onChange={handlerOptions}/>
            <Options name="rating" values={['Minor', 'Major']} onChange={handlerOptions}/>

            <button onClick={resetFilters}>Reset</button>
            
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

            <button value="previous" onClick={handlePages}>Previous</button>
            <label htmlFor="">Page: {page}</label>
            <button value="next" onClick={handlePages}>Next</button>
        </div>
    )
}

export default Home