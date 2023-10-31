import { useState } from "react"

import { useDispatch } from "react-redux";
import { renderVideogames, getVideogames, searchVideogamesName } from "../../redux/actions/actions";

import styles from './SearchBar.module.css'

function SearchBar({ maxApiPage, setPage }) {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const handleInput = (event) => {
        setInput(event.target.value);
    }

    const handleSubmit = async () => {
        await dispatch(searchVideogamesName(input, maxApiPage));
        dispatch(renderVideogames(1));
        setPage(1); 
    }

    const handleReset = async () => {
        await dispatch(getVideogames(maxApiPage));
        await dispatch(renderVideogames(1));

    }

    return(
        <div className={styles.search}>
            <input type="text" value={input} onChange={handleInput}/>
            <button onClick={handleSubmit}>Search</button>
            <button onClick={handleReset} className={styles.lastButton}>Reset</button>
        </div>
    )
}

export default SearchBar