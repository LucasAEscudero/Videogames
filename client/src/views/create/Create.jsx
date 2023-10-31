import { useEffect, useState } from 'react';
import axios from 'axios';

import Inputs from '../../components/inputs/Inputs';
import CheckboxList from '../../components/checkboxList/CheckboxList';
import validations from './validations';

//styles
import styles from './Create.module.css';


function Create({ genres, platforms }) {
    const [input, setInput] = useState({
        name: '',
        image: '',
        description: '',
        platforms: {},
        released: '',
        rating: 0,
        genres: {}
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const handleCheckbox = (event) => {
        setInput({
            ...input,
            [event.target.name]: { 
                ...input[event.target.name],
                [event.target.value]: event.target.checked
            }  //Object.keys(myObj).length to know the length
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const toPost = { //create the model to post
            name: input.name,
            image: input.image,
            description: input.description,
            platforms: [],
            released: input.released,
            rating: Number(input.rating), //it is a float
            genresName: []
        }

        for(let key in input.platforms){ //add platforms
            if(input.platforms[key]) toPost.platforms.push(key);
        }

        for(let key in input.genres){ //add genres
            if(input.genres[key]) toPost.genresName.push(key);
        }

        //post request
        try{
            await axios.post(`http://localhost:3001/videogames`, toPost);
        }
        catch(error){
            throw Error(error.message);
        }
    }

    useEffect(() => {
        setErrors(validations(input));
    }, [input])

    // console.log(errors)
    // console.log(input) - modularizar inputs
    return(
        <div>
            <form className={styles.form}>
                {/* name input */}
                <Inputs
                    name='name'
                    type='text'
                    input={input}
                    handleChange={handleChange}
                    placeholder='The game name...'
                    errors={errors}
                />

                {/* image input */}
                <Inputs
                    name='image'
                    type='text'
                    input={input}
                    handleChange={handleChange}
                    placeholder='The image url...'
                    errors={errors}
                />

                {/* description input */}
                <Inputs
                    name='description'
                    type='textarea'
                    input={input}
                    handleChange={handleChange}
                    placeholder='The game description...'
                    errors={errors}
                />

                {/* platforms checkbox */}
                <CheckboxList 
                    name="platforms" 
                    array={platforms} 
                    handleChange={handleCheckbox}
                    input={input}
                    errors={errors}
                />

                {/* released input */}
                <Inputs
                    name='released'
                    type='date'
                    input={input}
                    handleChange={handleChange}
                    placeholder='The released date...'
                    errors={errors}
                    labelAux='released date'
                />

                {/* rating input */}
                <Inputs
                    name='rating'
                    type='number'
                    input={input}
                    handleChange={handleChange}
                    placeholder='The game rating...'
                    errors={errors}
                    step={0.1}
                />

                {/* genres checkbox */}
                <CheckboxList
                    name="genres" 
                    array={genres} 
                    handleChange={handleCheckbox}
                    input={input}
                    errors={errors}
                />

                <button
                    type="submit"
                    disabled={
                        !input.name || !input.image || !input.description || !input.platforms
                        || !input.released || !input.rating || !input.genres || errors.name 
                        || errors.image || errors.description || errors.platforms || 
                        errors.released || errors.rating || errors.genres
                    }
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Create