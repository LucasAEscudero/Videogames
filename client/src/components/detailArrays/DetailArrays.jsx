//styles
import styles from './DetailArrays.module.css'

function DetailArrays({ name, array }) {
    return(
        <div className={styles[name]}>
            <p className={styles.title}>{`${name[0].toUpperCase()}${name.slice(1)}`}</p>
            <p className={styles.dataArrays}>
                {
                    array?.length ?
                    array?.map((data, i) => {
                        if(array.length - 1 === i) return data;
                        return `${data}, `;
                    })
                    : '-'
                }
            </p>
        </div>
    )
}

export default DetailArrays