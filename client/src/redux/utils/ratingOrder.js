const ratingOrder = (state, order) => {
    if(order === 'Minor'){
        return {
            ...state,
            allVideogames: [...state.allVideogames].sort((a, b) => {
                if(a.rating < b.rating) return -1;
                if(a.rating > b.rating ) return 1;
                return 0;
            })
        }
    }
    else if(order === 'Major'){ 
        return {
            ...state,
            allVideogames: [...state.allVideogames].sort((a, b) => {
                if(a.rating > b.rating ) return -1;
                if(a.rating < b.rating ) return 1;
                return 0;
            })
        }
    }
}

export default ratingOrder;