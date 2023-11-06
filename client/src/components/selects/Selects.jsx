function Selects({ name, array}) {
    return(
        <div>
            <select name={name}>
                {
                    array?.map(data => {
                        return <option key={data} value=""></option>
                    })
                }
            </select>
        </div>
    )
}

export default Selects