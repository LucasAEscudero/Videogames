import { GET_VIDEOGAMES, RENDER_VIDEOGAMES } from '../actions/action-types';

const initialState = {
    videogames: [],
    allVideogames: []
};

function reducer(state = initialState, action) {
    switch(action.type){
        case GET_VIDEOGAMES: 
            return {
                ...state,
                allVideogames: [...state.allVideogames, ...action.payload]
            };
        case RENDER_VIDEOGAMES:
            return {
                ...state,
                videogames: [...state.allVideogames].slice(action.payload, action.payload + 15)
            };

        default: return {...state};
    }
};

export default reducer;