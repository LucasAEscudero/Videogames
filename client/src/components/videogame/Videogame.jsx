import { Link } from "react-router-dom";

//styles
import styles from './Videogame.module.css'

function Videogame({ id, name, rating, released, image, platforms, genres, tags }) {

    
    return(
        <div className={styles.videogame}>
            <div className={styles.vidImg}><img src={image} alt={name} /></div>
            <div className={styles.vidInfo}>
                <Link to={`/detail/${id}`}><h2>{name}</h2></Link>
                <h2>{rating}</h2>
                <h2>{released}</h2>
                {
                    genres.map((genre, i) => {
                        if(i < 2) return <h5 key={genre}>{genre}</h5>
                    })
                }
            </div>
        </div>
    )
}

export default Videogame