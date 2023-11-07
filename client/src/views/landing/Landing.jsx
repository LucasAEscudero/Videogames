import { Link } from "react-router-dom";
import wallpaper from './assets/wallpaper.jpg'

//styles
import styles from './Landing.module.css'

function Landing() {
    return(
        <div className={styles.landing}>
            <img className={styles.wallpaper} src={wallpaper} alt="wallpaper" />
            <Link to='/home' className={styles.enter}><button>Start</button></Link>
        </div>
    )
}

export default Landing