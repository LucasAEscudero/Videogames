import styles from './Options.module.css'

function Options({ name, values, onChange }) {
    return(
        <div>
            <select name={name} onChange={onChange} className={styles.select}>
                {
                    values?.map(value => {
                        return <option value={value}>{value}</option>
                    })
                }
            </select>
        </div>
    )
}

export default Options