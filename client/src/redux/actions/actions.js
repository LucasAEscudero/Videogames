import { GET_VIDEOGAMES, NAME_VIDEOGAMES, RENDER_VIDEOGAMES, RESET } from './action-types';

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

export const reset = () => {
    return (dispatch) => {
        return dispatch({
            type: RESET
        })
    }
}