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
            allVideogames: [...state.allVideogames].filter(game => game.origin === 'BD')
        }
    }
    else if(origin === 'API') {
        return {
            ...state,
            allVideogames: [...state.allVideogames].filter(game => game.origin === 'API')
        }
    }
}

export default originVideogames