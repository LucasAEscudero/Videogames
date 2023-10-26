import { useState } from "react"

function SearchBar() {
    const [input, setInput] = useState();

    const handleInput = (event) => {

    }

    const handleSubmit = () => {
        
    }

    return(
        <div>
            <input type="text" value={input} />
            <button onClick={handleSubmit} >Search</button>
        </div>
    )
}