import { useState } from "react"

//components
import SearchBar from '../searchbar/SearchBar'

function Nav({ maxApiPage, setPage }) {

    return(
        <div>
            <SearchBar maxApiPage={maxApiPage} setPage={setPage} />
        </div>
    )
}

export default Nav