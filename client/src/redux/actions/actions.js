import { 
    GET_VIDEOGAMES,
    GET_GENRES,
    RENDER_VIDEOGAMES,
    GET_DETAIL, 
    NAME_VIDEOGAMES, 
    GENRES_VIDEOGAMES,
    ORIGIN_VIDEOGAMES,
    NAME_ORDER,
    RATING_ORDER,
    RESET,
    CLEAN_DETAIL,
    IS_LOADING
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

export const renderVideogames = (page) => {
    return (dispatch) => {
        return dispatch({
            type: RENDER_VIDEOGAMES,
            payload: ((page-1)*15)
        })
    }
}

export const getDetail = (id) => {
    return async (dispatch) => {
        try{
            const { data } = await axios(`http://localhost:3001/videogames/${id}`);

            return dispatch({
                type: GET_DETAIL,
                payload: data 
            })
        }
        catch(error){
            throw Error(error.message)
        }
    }
}

export const searchVideogamesName = (name) => {
    return async (dispatch) => {
        try{
            const { data } = await axios(`http://localhost:3001/videogames/name?name=${name}`);
        
            return dispatch({
                type: NAME_VIDEOGAMES,
                payload: data,
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

export const cleanDetail = () => {
    return (dispatch) => {
        return dispatch({
            type: CLEAN_DETAIL
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

export const loading = () => {
    return (dispatch) => {
        return dispatch({
            type: IS_LOADING
        })
    }
}
