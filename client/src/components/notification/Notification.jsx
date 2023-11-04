//styles
import styles from './Notification.module.css'

function Notification({ message, type }) {
// console.log(message, type)

    return(
        <div className={styles[type]}>
            <h4 className={styles.message}>{message}</h4>
        </div>
    )
}

export default Notification