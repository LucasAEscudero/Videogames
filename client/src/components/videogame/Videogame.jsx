import { Link } from "react-router-dom";

//styles
import styles from './Videogame.module.css'

function Videogame({ id, name, rating, released, image, platforms, genres, tags }) {

    return(
        <div className={styles.videogame}>
            <div className={styles.vidImg}>
                <img src={image} alt={name} />
            </div>
            
            <div className={styles.vidInfo}>
                <Link to={`/detail/${id}`}><h2 className={styles.link}>{name}</h2></Link>
                <span className={styles.id}>ID: {id}</span>
                <div className={styles.dates}>
                    <h2>{rating}</h2>
                    <h2>{released}</h2>
                </div>
                <div className={styles.genres}>
                {
                    genres?.map(genre => {
                        return <h4 key={genre}>{genre}</h4>
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default Videogame