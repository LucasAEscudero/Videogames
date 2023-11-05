import { useState } from "react"

import { useDispatch } from "react-redux";
import { renderVideogames, getVideogames, searchVideogamesName } from "../../redux/actions/actions";

import rechargeIcon from './assets/rechargeIcon.png'
import styles from './SearchBar.module.css'

function SearchBar({ maxApiPage, setPage, setIsLoading }) {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const handleInput = (event) => {
        setInput(event.target.value);
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        await dispatch(searchVideogamesName(input));
        dispatch(renderVideogames(1));
        setPage(1);
        setIsLoading(false);
    }

    const handleReset = async () => {
        setIsLoading(true);
        setInput("");
        await dispatch(getVideogames(maxApiPage));
        await dispatch(renderVideogames(1));
        setIsLoading(false);
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