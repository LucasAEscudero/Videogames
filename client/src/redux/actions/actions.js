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
    RESET 
} from './action-types';
import axios from 'axios';

export const getVideogames = (maxPage) => {
    return async (dispatch) => {
        try{
            const { data } = await axios(`http://localhost:3001/videogames?maxPage=${maxPage}`);

            return dispatch({
                type: GET_VIDEOGAMES,
                payload: data
            })
        }
        catch(error){
            throw Error(error.message)
        }
    }
}

export const getGenres = () => {
    return async (dispatch) => {
        try{
            const { data } = await axios(`http://localhost:3001/genres`);

            return dispatch({
                type: GET_GENRES,
                payload: data
            })
        }
        catch(error){
            throw Error(error.message)
        }
    }
}

export const getPlatforms = () => {
    return async (dispatch) => {
        try{
            const { data } = await axios(`http://localhost:3001/platforms`);

            return dispatch({
                type: GET_PLATFORMS,
                payload: data
            })
        }
        catch(error){
            throw Error(error.message)
        }
    }
}

export const renderVideogames = (page) => {
    return (dispatch) => {
        return dispatch({
            type: RENDER_VIDEOGAMES,
            payload: ((page-1)*15)
        })
    }
}

export const searchVideogamesName = (name, maxPage) => {
    return async (dispatch) => {
        try{
            const { data } = await axios(`http://localhost:3001/videogames/name?name=${name}&maxPage=${maxPage}`);

            return dispatch({
                type: NAME_VIDEOGAMES,
                payload: data 
            }); 
        }
        catch(error){
            throw Error(error.message)
        }
    }
}

export const genresFilter = (genre) => {
    return (dispatch) => {
        return dispatch({
            type: GENRES_VIDEOGAMES,
            payload: genre
        });
    };
}

export const originFilter = (origin) => {
    return (dispatch) => {
        return dispatch({
            type: ORIGIN_VIDEOGAMES,
            payload: origin
        });
    };
}

export const nameOrder = (order) => {
    return (dispatch) => {
        return dispatch({
            type: NAME_ORDER,
            payload: order
        })
    }
}

export const ratingOrder = (order) => {
    return (dispatch) => {
        return dispatch({
            type: RATING_ORDER,
            payload: order
        })
    }
}

export const reset = () => {
    return (dispatch) => {
        return dispatch({
            type: RESET
        })
    }
}