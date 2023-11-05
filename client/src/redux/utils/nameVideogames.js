const nameVideogames = (state, videogames) => {
    if(typeof videogames === 'string') return { ...state, error: videogames, byName: true };

    return {
        ...state,
        allVideogames: [...videogames],
        copyAllVideogames: [...videogames],
        resetAllVideogames: [...videogames],
        
        byName: true
    };
}

export default nameVideogames;