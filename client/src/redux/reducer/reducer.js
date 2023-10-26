import { GET_VIDEOGAMES, RENDER_VIDEOGAMES, NAME_VIDEOGAMES, RESET } from '../actions/action-types';

const initialState = {
    videogames: [],
    allVideogames: [],
    copyAllVideogames: [],
    maxPage: 0
};

function reducer(state = initialState, action) {
    switch(action.type){
        //load BD and API videogames
        case GET_VIDEOGAMES: 
            return {
                ...state,
                allVideogames: [...action.payload],
                copyAllVideogames: [...action.payload]
                // maxPage: Math.floor(state.allVideogames.length / 15)
            };
            //render 15 videogames
        case RENDER_VIDEOGAMES:
            return {
                ...state,
                videogames: [...state.allVideogames].slice(action.payload, action.payload + 15),
                maxPage: Math.floor(state.allVideogames.length / 15)
            };
            //load videogames with the name input
        case NAME_VIDEOGAMES:
            return {
                ...state,
                allVideogames: [...action.payload],
                copyAllVideogames: [...action.payload]
                // maxPage: Math.floor(state.allVideogames.length / 15)
            };

        

        case RESET:
            return{
                ...state,
                allVideogames: [...copyAllVideogames]
            } 

        default: return {...state};
    }
};

export default reducer;