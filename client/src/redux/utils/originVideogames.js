const originVideogames = (state, origin) => {
    if(origin === 'API + BD'){
        return {
            ...state,
            allVideogames: [...state.copyAllVideogames]
        }
    }
    else if(origin === 'BD'){ 
        return {
            ...state,
            allVideogames: [...state.bdVideogames]
        }
    }
    else {
        return {
            ...state,
            allVideogames: [...state.apiVideogames]
        }
    }
}

export default originVideogames