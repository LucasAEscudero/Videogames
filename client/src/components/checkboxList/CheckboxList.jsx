import BoxList from '../boxList/BoxList'

//styles
import styles from './CheckboxList.module.css'

function CheckboxList({ type, names, handleChange, input }) {
    return(
        <div className={styles.checkbox}>
            {
                names?.map(name => {
                    return <BoxList type={type} name={name} handleChange={handleChange} input={input}/>
                })
            }
        </div>
    )
}

export default CheckboxList