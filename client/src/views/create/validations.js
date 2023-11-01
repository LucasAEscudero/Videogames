function validations(input) {
    let errors = {};

    //name validation
    if(input.name){
        if(input.name.length < 2) errors.name = '*Must contain more than two characters';
        if(input.name.length > 50) errors.name = '*Must contain less than fifty characters';
    }

    //image validation
    if(input.image){
        if(!input.image.includes('https://')) errors.image = '*Must be a URL';

        //before validations
        if(input.name === '') errors.name = '*The field cannot be empty';
    }

    //description validation
    if(input.description){
        if(input.description.length < 2) 
        errors.description = '*Must contain more than two characters';

        //before validations
        if(input.name === '') errors.name = '*The field cannot be empty';
        if(input.image === '') errors.image = '*The field cannot be empty';
    } 

    //platforms validation
    if(Object.keys(input.platforms).length){
        if(Object.keys(input.platforms).length < 1) 
        errors.platforms = '*One platform must be selected as a minimum';

        //before validations
        if(input.name === '') errors.name = '*The field cannot be empty';
        if(input.image === '') errors.image = '*The field cannot be empty';
        if(input.description === '') errors.description = '*The field cannot be empty';
    }

    //released date validation
    if(input.released){
        if(input.released === '') errors.released = '*Must contain a released date';

        //before validations
        if(input.name === '') errors.name = '*The field cannot be empty';
        if(input.image === '') errors.image = '*The field cannot be empty';
        if(input.description === '') errors.description = '*The field cannot be empty';
        if(!Object.keys(input.platforms).length) errors.platforms = '*The field cannot be empty';
    }

    //rating validation
    if(input.rating){
        if(Number(input.rating) < 0) errors.rating = '*Must be more than 0';
        if(Number(input.rating) > 5) errors.rating = '*Must be less than 5';
        if(!Number(input.rating)) errors.rating = '*Must be a number';
     
        //before validations
        if(input.name === '') errors.name = '*The field cannot be empty';
        if(input.image === '') errors.image = '*The field cannot be empty';
        if(input.description === '') errors.description = '*The field cannot be empty';
        if(input.platforms.length === 0) errors.platforms = '*The field cannot be empty';
        if(input.released === '') errors.released= '*The field cannot be empty';
    }

    //genres validation
    if(Object.keys(input.genres).length){
        if(Object.keys(input.genres).length < 1) 
        errors.genres = '*One gender must be selected as a minimum';
        
        //before validations
        if(input.name === '') errors.name = '*The field cannot be empty';
        if(input.image === '') errors.image = '*The field cannot be empty';
        if(input.description === '') errors.description = '*The field cannot be empty';
        if(!Object.keys(input.platforms).length) errors.platforms = '*The field cannot be empty';
        if(input.released === '') errors.released= '*The field cannot be empty';
        if(input.rating === '') errors.rating = '*The field cannot be empty';
    }

    //case not genres
    if(
        input.name && input.image && input.description && Object.keys(input.platforms).length 
        && input.released && input.rating
    ){
        if(!Object.keys(input.genres).length) errors.genres = '*The field cannot be empty';
    }

    return errors;
};

export default validations;