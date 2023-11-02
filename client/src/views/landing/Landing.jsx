import { Link } from "react-router-dom";
import wallpaper from './assets/wallpaper.jpg'

//styles
import styles from './Landing.module.css'

function Landing({ handleEntry }) {

    return(
        <div className={styles.landing}>

            <img className={styles.wallpaper} src={wallpaper} alt="wallpaper" />
            <div className={styles.content}>
                <h2 className={styles.title}>Henry Videogames</h2>
                <Link to='/home' className={styles.enter}><button>Enter</button></Link>
            </div>
        </div>
    )
}

export default Landing