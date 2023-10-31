import BoxList from '../boxList/BoxList'

//styles
import styles from './CheckboxList.module.css'

function CheckboxList({ name, array, handleChange, input, errors }) {
    const firstLetter = name.charAt(0).toUpperCase();
    const restWord = name.slice(1);

    return(
        <div className={styles.checkbox}>
            <label>{`${firstLetter}${restWord}`}: </label>
            {
                array?.map(data => {
                    return <BoxList type={name} name={data} handleChange={handleChange} input={input}/>
                })
            }
            { errors[name] != '' && <p className={styles.errors}>{errors[name]}</p> }
            <hr style={{ borderStyle: "none" }}/>
        </div>
    )
}

export default CheckboxList