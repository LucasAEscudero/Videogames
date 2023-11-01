const nameVideogames = (state, videogames) => {
    if(typeof videogames === 'string') return { ...state, error: videogames, byName: true };

    return {
        ...state,
        allVideogames: [...videogames],
        copyAllVideogames: [...videogames],
        bdVideogames: [...videogames].filter(game => game.origin === 'BD'),
        apiVideogames: [...videogames].filter(game => game.origin === 'API'),
        byName: true
    };
}

export default nameVideogames;