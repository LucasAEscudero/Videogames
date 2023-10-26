//react
import { useState, useEffect } from 'react'
import axios from 'axios'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { getVideogames, renderVideogames } from '../../redux/actions/actions'

//components
import Videogame from '../../components/videogame/Videogame';

//styles
import styles from './Home.module.css'

function Home({ videogames, handlePages, page }) {
    

    return(
        <div>
            <select name="genres" id="genres">
                <option value="">gen1</option>
                <option value="">gen2</option>
                <option value="">gen3</option>
                <option value="">gen4</option>
            </select>
            <select name="origin" id="origin">
                <option value="API">API</option>
                <option value="BD">BD</option>
            </select>

            <label htmlFor="">Order: </label>
            <select name="name" id="name">
                <option value="Ascendent">A-Z</option>
                <option value="Descendent">Z-A</option>
            </select>
            <select name="rating" id="rating">
                <option value="minor">Minor</option>
                <option value="major">Major</option>
            </select>
            
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
                            genres={videogame.tags}
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