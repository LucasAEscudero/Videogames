import { useState } from "react"
import { Link } from "react-router-dom"

//components
import SearchBar from '../searchbar/SearchBar'

function Nav({ maxApiPage, setPage }) {

    return(
        <div>
            {/* henry icon and title Henry videogames? */}
            <div>
                <Link to='/home'><button>Home</button></Link>
                <Link to='/create'><button>Create</button></Link>
            </div>

            <SearchBar maxApiPage={maxApiPage} setPage={setPage} />
        </div>
    )
}

export default Nav