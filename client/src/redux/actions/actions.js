import { GET_VIDEOGAMES, RENDER_VIDEOGAMES } from './action-types';

import axios from 'axios';

export const getVideogames = (page) => {
    return async (dispatch) => {
        try{
            const { data } = await axios(`http://localhost:3001/videogames?page=${page}`);

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

