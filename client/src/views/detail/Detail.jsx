import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from './Detail.module.css';


function Detail() {
    const { id } = useParams();
    const [videogame, setVideogame] = useState({});
    const description = videogame.description?.split('\n\n');
    const [color, setColor] = useState({
        // ratingColor: function() {
        //     if(videogame?.rating >= 75) setColor({ "--rating-color": "#00c041" });
        //     if(videogame?.rating < 75 && videogame.rating >= 50) setColor({ "--rating-color": "#c06500" });
        //     if(videogame?.rating < 50) setColor({ "--rating-color": "#ff0000" });
        //     console.log(videogame?.rating)
        // }
        "--color-rating": "rgb(0,192,65)"
    });

    useEffect(() => {
        ( async () => {
            try{
                const response = await axios(`http://localhost:3001/videogames/${id}`);

                setVideogame({ ...response.data });
                // await color.ratingColor();
            }
            catch(error){
                throw Error(error.message)
            }
        })();
    }, []);

    return(
        <div className={styles.videogameDetail}>
            <div className={styles.front}>
                <div>
                    <div className={styles.data}>
                        <h2 className={styles.released}>{videogame.released}</h2>
                        <h2 className={styles.rating}>{videogame.rating}</h2>
                    </div>
                    <h2 className={styles.name}>{videogame.name}</h2>
                    <span className={styles.id}>ID: {videogame.id}</span>
                </div>
                
                <div className={styles.videogameImg}>
                    <img src={videogame.image} alt={videogame.name} />
                </div>
            </div>

            <div className={styles.info}>
                <div>
                    <div className={styles.about}>
                        <h2>About</h2>
                        {
                            description?.map((sentence, i) => {
                                return <p key={i}>{sentence}</p>
                            })
                        }
                    </div>
                </div>

                <div className={styles.arrays}>
                    <div className={styles.platforms}>
                        <p className={styles.title}>Platforms</p>
                        <p className={styles.dataArrays}>
                            {
                                videogame.platforms?.map((platform, i) => {
                                    if(videogame.platforms?.length - 1 === i) return platform;
                                    return `${platform}, `;
                                })
                            }
                        </p>
                    </div>
                    <div className={styles.genres}>
                        <p className={styles.title}>Genres</p>
                        <p className={styles.dataArrays}>
                            {
                                videogame.genres?.map((genres, i) => {
                                    if(videogame.genres?.length - 1 === i) return genres;
                                    return `${genres}, `;
                                })
                            }
                        </p>
                    </div>
                    <div className={styles.tags}>
                        <p className={styles.title}>Tags</p>
                        <p className={styles.dataArrays}>
                            {
                                videogame.tags?.map((tag, i) => {
                                    if(videogame.tags?.length - 1 === i) return tag;
                                    return `${tag}, `;
                                })
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail