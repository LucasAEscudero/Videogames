const axios = require('axios');
const { Videogame } = require('../../db');

const obtVideogameDetails = async (id) => {
    if(Number(id)){
        const { data } = await axios(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`);

        // const description = data.description.replace( /(<([^>]+)>)/ig, ''); //replace html objects
        
        const videogame = {
            id: data.id,
            name: data.name,
            image: data.background_image,
            rating: data.rating,
            released: data.released,
            description: data.description_raw,
            platforms: data.platforms?.map(platform => platform.platform.name),
            genres: data.genres?.map(genre => genre.name),
            tags: data.tags?.map(tag => tag.name),
            origin: 'API'
        }

        return videogame;
    }
    else{
        const data = await Videogame.findByPk(id);

        const videogame = {
            id: data.id,
            name: data.name,
            image: data.image,
            rating: data.rating,
            released: data.launch_date,
            description: data.description,
            platforms: [...data.platforms],
            genres: [...data.genresName],
            tags: [...data.tags],
            origin: 'API'
        }

        return videogame;
    }
    
}

// const filterDescription = (description) => {
//     let filterHTML = description.split('\n').join().split('<p>').join().split('</p>')
//                     .join().split('<br >').join().split(',');
                    
//     let filterErrors = filterHTML.filter(sentence => sentence != '').join(' ').split(' ');
//     console.log(filterErrors)
//         filterErrors.forEach((word, i) => {
//             if(word !== '' && filterErrors[i + 1] !== '' && i !== filterErrors.length - 1) 
//             filterErrors.splice(i, 1, `${word} `);

//             if(word === '') filterErrors.splice(i, 1, ',');

//             if(filterErrors[i - 1] === ',') filterErrors.splice(i, 1, ` ${filterErrors[i]}`);

//             if(filterErrors[i] == '<br ' || filterErrors[i] == '<br') filterErrors.splice(i, 2);
//         });
//         // console.log(filterErrors)
        
//         return filterErrors.join('');
// }

module.exports = obtVideogameDetails;