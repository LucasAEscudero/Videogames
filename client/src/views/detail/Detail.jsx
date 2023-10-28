import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from './Detail.module.css';


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
        <div className={styles.videogameDetail}>
            <div className={styles.videogameImg}>
                <img src={videogame.image} alt={videogame.name} />
            </div>

            <div className={styles.info}>
                <div>
                    <div>
                        <h2>ID:{videogame.id}</h2>
                        <h2>{videogame.name}</h2>
                        <h2>{videogame.rating}</h2>
                        <h2>{videogame.released}</h2>
                    </div>
                </div>

                <div className={styles.arrays}>
                    <div className={styles.platforms}>
                        <label htmlFor="">Platforms</label>
                        <h2>
                            {
                                videogame.platforms?.map((platform, i) => {
                                    if(videogame.platforms?.length - 1 === i) return platform;
                                    return `${platform}, `;
                                })
                            }
                        </h2>
                    </div>
                    <div className={styles.genres}>
                        <label htmlFor="">Genres</label>
                        <h2>
                            {
                                videogame.genres?.map((genres, i) => {
                                    if(videogame.genres?.length - 1 === i) return genres;
                                    return `${genres}, `;
                                })
                            }
                        </h2>
                    </div>
                    <div className={styles.tags}>
                        <label htmlFor="">Tags</label>
                        <h5>
                            {
                                videogame.tags?.map((tag, i) => {
                                    if(videogame.tags?.length - 1 === i) return tag;
                                    return `${tag}, `;
                                })
                            }
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail