import { useState } from "react"
import { Link } from "react-router-dom"

//components
import SearchBar from '../searchbar/SearchBar'

//styles
import styles from './NavBar.module.css'

function Nav({ maxApiPage, setPage }) {

    return(
        // <div className={styles.navContainer}>
            <div className={styles.navBar}>
                <div className={styles.links}>
                    <Link to='/home'><button className={styles.firstButton}>Home</button></Link>
                    <Link to='/create'><button className={styles.link}>Create</button></Link>
                </div>

                <div className={styles.search}>
                    <SearchBar maxApiPage={maxApiPage} setPage={setPage} />
                </div>
            </div>
        // </div>
    )
}

export default Nav