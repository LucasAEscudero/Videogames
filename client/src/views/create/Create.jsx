import { useState } from "react"
import axios from "axios";

import CheckboxList from "../../components/checkboxList/CheckboxList";

//styles
import styles from './Create.module.css'


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

        try{
            await axios.post(`http://localhost:3001/videogames`, toPost);
        }
        catch(error){
            throw Error(error.message);
        }
    }

    // console.log(input) - modularizar inputs
    return(
        <div>
            <form className={styles.form}>
                <label>Name: </label> <br />
                <input 
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={handleChange}
                    placeholder="The game name..."
                />
                {/*  */}
                <hr style={{ borderStyle: "none" }}/>

                <label>Image: </label>
                <input 
                    type="url"
                    name="image"
                    value={input.image}
                    onChange={handleChange}
                    placeholder="The image url..."
                 />
                {/*  */}
                <hr style={{ borderStyle: "none" }}/>

                <label>Description: </label>
                <textarea 
                    name="description" 
                    cols="80" 
                    rows="10"
                    value={input.description}
                    onChange={handleChange}
                    placeholder="The game description..."
                />
                {/*  */}
                <hr style={{ borderStyle: "none" }}/>

                <div className={styles.platforms}>
                    <label>Platforms: </label>
                    <CheckboxList 
                        type="platforms" 
                        names={platforms} 
                        handleChange={handleCheckbox}
                        input={input}
                    />
                    <hr style={{ borderStyle: "none" }}/>
                </div>

                <label>Released date: </label>
                <input 
                    type="date"
                    name="released"
                    onChange={handleChange}
                    placeholder="The released date..."
                />
                {/*  */}
                <hr style={{ borderStyle: "none" }}/>

                <label>Rating: </label>
                <input 
                    type="number"
                    name="rating"
                    step='0.1'
                    onChange={handleChange}
                    placeholder="The game rating..."
                />
                {/*  */}
                <hr style={{ borderStyle: "none" }}/>

                <div className={styles.genres}>
                    <label>Genres: </label>
                    <CheckboxList
                        type="genres" 
                        names={genres} 
                        handleChange={handleCheckbox}
                        input={input}
                    />
                    <hr style={{ borderStyle: "none" }}/>
                </div>

                <button
                    type="submit"
                    // disabled={true}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Create