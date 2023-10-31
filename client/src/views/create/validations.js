function validations(input) {
    let errors = {};

    //name validation
    if(input.name.length < 2) errors.name = '*Must contain more than two characters';
    if(input.name.length > 50) errors.name = '*Must contain less than fifty characters';
    
    

    //image validation
    if(!input.image.includes('https://')) errors.image = '*Must be a URL';
    

    //description validation
    if(input.description.length < 2) 
    errors.description = '*Must contain more than two characters';
    

    //platforms validation
    if(Object.keys(input.platforms).length < 1) 
    errors.platforms = '*One platform must be selected as a minimum';


    //released date validation
    if(input.released === '') errors.released = '*Must contain a released date';

    //rating validation
    if(input.rating === '') errors.rating = '*Must contain a rating (number)';
    if(Number(input.rating) < 0) errors.rating = '*Must be more than 0';
    if(Number(input.rating) > 5) errors.rating = '*Must be less than 5';


    //genres validation
    if(Object.keys(input.genres).length < 1) 
    errors.genres = '*One gender must be selected as a minimum';

    return errors;
};

export default validations;