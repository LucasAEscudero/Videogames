
//styles
import styles from './Loading.module.css'

const Loading = () => {
    return(
        <div className={styles.container}>
            <div className={styles.loading}>
                <div className={styles.circle}></div>
                <h2>Loading...</h2>
            </div>
        </div> 
    )
}
// loading error 
export default Loading