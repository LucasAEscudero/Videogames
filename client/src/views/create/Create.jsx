import { useEffect, useState } from 'react';
import axios from 'axios';

import Inputs from '../../components/inputs/Inputs';
import CheckboxList from '../../components/checkboxList/CheckboxList';
import validations from './validations';

//styles
import styles from './Create.module.css';
import Notification from '../../components/notification/Notification';


function Create({ genres, platforms }) {
    const [input, setInput] = useState({
        name: '',
        image: '',
        description: '',
        platforms: {},
        released: '',
        rating: '',
        genres: {},
        detectChanges: 0
    });

    const [errors, setErrors] = useState({});

    const [notification, setNotification] = useState({
        state: false,
        message: "",
        type: ""
    });

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
            },  //Object.keys(myObj).length to know the length
            detectChanges: input.detectChanges + 1
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
            const { data } = await axios.post(`http://localhost:3001/videogames`, toPost);
            
            if(
                data === "This game already exists (the name has already been used)"
            ){
                setNotification({ 
                    state: true, 
                    message: data,
                    type: "error"
                });

                setTimeout(() => setNotification({ state: false }), 5000);
            }
            else {
                setNotification({ 
                    state: true, 
                    message: data,
                    type: "possitive"
                });

                setTimeout(() => setNotification({ state: false }), 5000);
    
                setInput({
                    name: '',
                    image: '',
                    description: '',
                    platforms: {},
                    released: '',
                    rating: '',
                    genres: {}
                });
            }
        }
        catch(error){
            // window.alert("I can't create the video game, check that the fields are with the correct information");
            setNotification({ 
                state: true, 
                message: error.message,
                type: "error"
            });
            
            setTimeout(() => setNotification({ state: false }), 5000);

            throw Error(error.message);
        }
    }

    useEffect(() => {
        for(let key in input.platforms){
            if(!input.platforms[key]) delete input.platforms[key];
        }
        
        for(let key in input.genres){
            if(!input.genres[key]) delete input.genres[key];
        }

        setErrors(validations(input));
    }, [input])
    
    return(
        <div className={styles.form}>
            <h2>Create your videogame</h2>
            <form>
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
                    type='text'
                    input={input}
                    handleChange={handleChange}
                    placeholder='The game rating...'
                    errors={errors}   
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

                {
                    notification.state &&
                    <Notification message={notification.message} type={notification.type} />
                }
            </form>
        </div>
    )
}

export default Create