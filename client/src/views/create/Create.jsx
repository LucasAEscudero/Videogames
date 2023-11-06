import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames, renderVideogames, loading } from '../../redux/actions/actions';
import axios from 'axios';

//components
import Inputs from '../../components/inputs/Inputs';
import Options from '../../components/options/Options';
import CheckboxList from '../../components/checkboxList/CheckboxList';
import Notification from '../../components/notification/Notification';
import Loading from '../../components/loading/Loading';

//aux
import validations from './utils/validations';
import modelToPost from './utils/modelToPost';
import cleanInput from './utils/cleanInput';

//styles
import styles from './Create.module.css';


function Create({ maxApiPage }) {
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

    //redux
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.isLoading);
    const genres = useSelector(state => state.allGenres);
    const platforms = useSelector(state => state.allPlatforms);

    //inputs handler
    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    //checkbox handler
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

    // const handleSelect = (event) => {

    // }

    //submit handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const toPost = modelToPost(
            input.name, 
            input.image,
            input.description,
            input.platforms,
            input.released,
            input.rating,
            input.genres
        );
    
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
                dispatch(loading());
                
                cleanInput(setInput);
                await dispatch(getVideogames(maxApiPage));
                await dispatch(renderVideogames(1));
                
                dispatch(loading());

                setNotification({ 
                    state: true, 
                    message: data,
                    type: "possitive"
                });
                setTimeout(() => setNotification({ state: false }), 5000);
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

    //delete false desclicks in checkbox
    useEffect(() => {
        if(input.chan)
        for(let key in input.platforms){
            if(!input.platforms[key]) delete input.platforms[key];
        }
        
        for(let key in input.genres){
            if(!input.genres[key]) delete input.genres[key];
        }

        setErrors(validations(input));
    }, [input])

    if(isLoading) return(<div><Loading /></div>)
    
    //to render
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
                    min='1958-10-18'
                />

                {/* rating input */}
                <Inputs
                    name='rating'
                    type='number'
                    step={0.1}
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