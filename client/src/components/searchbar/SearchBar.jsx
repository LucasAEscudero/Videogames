import { useState } from "react"

import { useDispatch } from "react-redux";
import { renderVideogames, reset, searchVideogamesName } from "../../redux/actions/actions";

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

    return(
        <div>
            <input type="text" value={input} onChange={handleInput}/>
            <button onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default SearchBar