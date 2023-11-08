const nameOrder = (state, order) => {
    if(order === 'A-Z'){
        return {
            ...state,
            allVideogames: [...state.allVideogames].sort((a, b) => {
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            })
        }
    }
    else if(order === 'Z-A'){ 
        return {
            ...state,
            allVideogames: [...state.allVideogames].sort((a, b) => {
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                return 0;
            })
        }
    }
}

export default nameOrder;