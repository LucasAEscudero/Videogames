//actions
import { 
    GET_VIDEOGAMES,
    GET_GENRES,
    GET_PLATFORMS,
    RENDER_VIDEOGAMES, 
    NAME_VIDEOGAMES, 
    GENRES_VIDEOGAMES,
    ORIGIN_VIDEOGAMES,
    NAME_ORDER,
    RATING_ORDER,
    RESET,
    GET_DETAIL,
    CLEAN_DETAIL,
    IS_LOADING,
    IS_NOT_LOADING
} from '../actions/action-types';

//utils
import nameOrder from '../utils/nameOrder';
import ratingOrder from '../utils/ratingOrder';
import originVideogames from '../utils/originVideogames';
import nameVideogames from '../utils/nameVideogames';

const initialState = {
    //to render
    videogames: [],
    allVideogames: [],
    copyAllVideogames: [],

    resetAllVideogames: [], //only reset button / not api call

    detailVideogame: {},

    //aux handlers
    maxPage: 0,
    byName: false,
    error: '',
    isLoading: false,

    //aux info
    allGenres: [],
    allPlatforms: []
};

function reducer(state = initialState, action) {
    switch(action.type){
        //load BD and API videogames
        case GET_VIDEOGAMES: 
            return {
                ...state,
                allVideogames: [...action.payload],
                copyAllVideogames: [...action.payload],
                resetAllVideogames: [...action.payload],
       
                error: '',
                byName: false
            };

        //info api
        case GET_GENRES:
            return {
                ...state,
                allGenres: [...action.payload]
            };

        case GET_PLATFORMS:
            return {
                ...state,
                allPlatforms: [...action.payload]
            };

        //render 15 videogames
        case RENDER_VIDEOGAMES:
            return {
                ...state,
                videogames: [...state.allVideogames].slice(action.payload, action.payload + 15),
                maxPage: Math.ceil(state.allVideogames.length / 15)
            };

        case GET_DETAIL:
            return {
                ...state,
                detailVideogame: {...action.payload}
            }

        case GENRES_VIDEOGAMES: 
            return {
                ...state,
                allVideogames: [...state.allVideogames].filter(game => {
                    return game.genres?.find(genre => genre === action.payload);
                }),
                copyAllVideogames: [...state.allVideogames].filter(game => {
                    return game.genres?.find(genre => genre === action.payload);
                })
            };

            //load videogames with the name input
        case NAME_VIDEOGAMES: return nameVideogames(state, action.payload);

        case ORIGIN_VIDEOGAMES: return originVideogames(state, action.payload);

        //order videogames by name
        case NAME_ORDER: return nameOrder(state, action.payload);

        //order videogames by order
        case RATING_ORDER: return ratingOrder(state, action.payload);

        //reset to original videogames render
        case RESET:
            return{
                ...state,
                allVideogames: [...state.resetAllVideogames],
                copyAllVideogames: [...state.resetAllVideogames]
            };

        case CLEAN_DETAIL:
            return {
                ...state,
                detailVideogame: {}
            }

        case IS_LOADING:
            if(state.isLoading) return { ...state, isLoading: false }
            return { ...state, isLoading: true }

        default: return {...state};
    }
};

export default reducer;