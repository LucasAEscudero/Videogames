import { useState } from "react"

import { useDispatch } from "react-redux";
import { renderVideogames, getVideogames, searchVideogamesName, loading  } from "../../redux/actions/actions";

import rechargeIcon from './assets/rechargeIcon.png'
import styles from './SearchBar.module.css'

function SearchBar({ maxApiPage, setPage }) {
    const [input, setInput] = useState("");

    const dispatch = useDispatch();

    const handleInput = (event) => {
        setInput(event.target.value);
    }

    const handleSubmit = async () => {
        dispatch(loading());
        await dispatch(searchVideogamesName(input));
        dispatch(renderVideogames(1));
        setPage(1);
        dispatch(loading());
    }

    const handleReset = async () => {
        dispatch(loading());
        setInput("");
        await dispatch(getVideogames(maxApiPage));
        await dispatch(renderVideogames(1));
        dispatch(loading());
    }

    return(
        <div className={styles.search}>
            <input type="text" value={input} onChange={handleInput}/>
            <button onClick={handleSubmit}>Search</button>
            <button onClick={handleReset} className={styles.lastButton}>
                <img src={rechargeIcon} alt="rechargeIcon" />
            </button>
        </div>
    )
}

export default SearchBar