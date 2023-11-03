//styles
import styles from './Error.module.css'

function Error({ error }) {
    return(
        <div className={styles.errorDiv}>
            <div className={styles.errorContainer}>
                <h2>{error}</h2>
            </div>
        </div>
    )
}

export default Error