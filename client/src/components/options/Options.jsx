function Options({ name, values, onChange }) {
    return(
        <div>
            <select name={name} onChange={onChange}>
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