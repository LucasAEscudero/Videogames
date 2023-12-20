//styles
import styles from './Inputs.module.css'

function Inputs({ name, type, input, handleChange, placeholder, errors, labelAux, step, min }) {
    const firstLetter = labelAux ? labelAux.charAt(0).toUpperCase() : name.charAt(0).toUpperCase();
    const restWord = labelAux ? labelAux.slice(1) : name.slice(1);

    return(
        <div className={styles.input}>
            <label htmlFor={`${name}Label`}>{`${firstLetter}${restWord}`}: </label>
            {/* text */}
            {   type === 'text' &&
                <input
                    key={name} 
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
                    key={name} 
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
                    key={name} 
                    type={type}
                    name={name}
                    value={input[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    min={min}
                />
            }
            {/* number */}
            {
                type === 'number' &&
                <input
                    key={name} 
                    type={type}
                    name={name}
                    step={step}
                    value={input[name]}
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