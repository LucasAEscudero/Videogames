//styles
import styles from './Inputs.module.css'

function Inputs({ name, type, input, handleChange, placeholder, errors, labelAux, step }) {
    const firstLetter = labelAux ? labelAux.charAt(0).toUpperCase() : name.charAt(0).toUpperCase();
    const restWord = labelAux ? labelAux.slice(1) : name.slice(1);

    return(
        <div className={styles.input}>
            <label>{`${firstLetter}${restWord}`}: </label>
            {/* text */}
            {   type === 'text' &&
                <input 
                    type={type} 
                    name={name}
                    value={input[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                />
            }
            {/* textarea */}
            {
                type === 'textarea' &&
                <textarea 
                    name={name}  
                    cols="50" 
                    rows="10"   
                    value={input[name]} 
                    onChange={handleChange}
                    placeholder={placeholder}
                />
            } 
            {/* dates */}
            {
                type === 'date' &&
                <input 
                    type={type}
                    name={name}
                    onChange={handleChange}
                    placeholder={placeholder}
                />
            }
            {/* number */}
            {
                type === 'number' &&
                <input
                type={type}
                name={name}
                step={step}
                onChange={handleChange}
                placeholder={placeholder}
                />
            }
            { errors[name] != '' && <p className={styles.errors}>{errors[name]}</p> }
            <hr style={{ borderStyle: "none" }}/>
        </div>
    )
}

export default Inputs