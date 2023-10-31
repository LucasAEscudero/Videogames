//styles
import styles from './BoxList.module.css'

function BoxList({ type, name, handleChange, input }) {

    return(
        <div className={styles.input}>
            <input 
                type="checkbox" 
                key={name} 
                name={type} 
                value={name} 
                onChange={handleChange}
            />
            <label for={name}>{name}</label>
            
        </div>
    )
}

export default BoxList