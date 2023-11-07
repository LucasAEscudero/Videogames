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
        platforms: [],
        released: '',
        rating: '',
        genres: {},
        tags: {},
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
    const handlerChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const handlerSelect = (event) => {
        if(
            !input[event.target.name].find(date => {
                return date === event.target.value;
            }) && event.target.value
        ){
            setInput({
                ...input,
                [event.target.name]: [...input[event.target.name], event.target.value]
            })
        }   
    }

    const deleteLastOption = (event) => {
        setInput({
            ...input,
            [event.target.name]: 
            input[event.target.name].slice(0, input[event.target.name].length - 1)
        })
    }

    //checkbox handler
    const handlerCheckbox = (event) => {
        setInput({
            ...input,
            [event.target.name]: { 
                ...input[event.target.name],
                [event.target.value]: event.target.checked
            },  //Object.keys(myObj).length to know the length
            detectChanges: input.detectChanges + 1
        })
    }

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
            input.genres,
            input.tags
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
        for(let key in input.genres){
            if(!input.genres[key]) delete input.genres[key];
        }

        for(let key in input.tags){
            if(!input.tags[key]) delete input.tags[key];
        }

        setErrors(validations(input));
    }, [input])

    if(isLoading) return(<div><Loading /></div>)
    
    //to render
    return(
        <div className={styles.form}>
            <h2>Create your videogame</h2>
            <hr />
            <form>
                {/* name input */}
                <Inputs
                    name='name'
                    type='text'
                    input={input}
                    handleChange={handlerChange}
                    placeholder='The game name...'
                    errors={errors}
                />

                {/* image input */}
                <Inputs
                    name='image'
                    type='text'
                    input={input}
                    handleChange={handlerChange}
                    placeholder='The image url...'
                    errors={errors}
                />

                {/* description input */}
                <Inputs
                    name='description'
                    type='textarea'
                    input={input}
                    handleChange={handlerChange}
                    placeholder='The game description...'
                    errors={errors}
                />

                {/* platforms select */}
                <div className={styles.select}>
                    <label>Platforms: </label>
                    <Options 
                        name='platforms'
                        values={['', ...platforms]}
                        onChange={handlerSelect}
                        input={input.platforms}
                    />
                    <p><span>Selected:</span> {
                            input.platforms?.map((data, i) => {
                                if(input.platforms.length - 1 === i) return data;
                                return `${data}, `;
                            })
                        }
                    </p>
                    <button type='reset' name='platforms' onClick={deleteLastOption}>
                        Delete last platform
                    </button>
                    { errors.platforms != '' && <p className={styles.errors}>{errors.platforms}</p> }
                    <hr style={{ borderStyle: "none" }}/>
                </div>

                {/* released input */}
                <Inputs
                    name='released'
                    type='date'
                    input={input}
                    handleChange={handlerChange}
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
                    handleChange={handlerChange}
                    placeholder='The game rating...'
                    errors={errors}
                />

                {/* genres checkbox */}
                <CheckboxList
                    name="genres" 
                    array={genres} 
                    handleChange={handlerCheckbox}
                    input={input}
                    errors={errors}
                />

                <CheckboxList
                    name="tags" 
                    array={['First-Person', 'FPS', 'Online Co-Op', 'Tactical', 'stats', 'PvP', 'Realistic',
                    'Comedy', 'Singleplayer', 'Steam Achievements', 'Multiplayer', 'Open World', 'vr mod', 'Others'
                ]} 
                    handleChange={handlerCheckbox}
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