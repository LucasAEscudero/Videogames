import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function Detail() {
    const { id } = useParams();
    const [videogame, setVideogame] = useState({});


    useEffect(() => {
        ( async () => {
            try{
                const response = await axios(`http://localhost:3001/videogames/${id}`);

                setVideogame({ ...response.data });
            }
            catch(error){
                throw Error(error.message)
            }
        })();
    }, [])


    return(
        <div>
            <img src={videogame.background_image} alt={videogame.name} />
            <h2>{videogame.name}</h2>
            <h2>{videogame.rating}</h2>
            <h2>{videogame.released}</h2>
        </div>
    )
}

export default Detail