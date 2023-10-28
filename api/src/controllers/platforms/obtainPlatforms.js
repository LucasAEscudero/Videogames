const axios = require('axios');

const obtainPlatforms = async () => {
    let maxPage = false;
    let page = 1;
    let platforms = [];

    while(!maxPage){
        const { data } = await axios(
            `https://api.rawg.io/api/platforms?key=${process.env.API_KEY}&page=${page}`
        );

        data.results.forEach(platform => {
            platforms.push(platform.name);
        });

        if(data.next) page++;
        else maxPage = true;
    }
    
    return platforms;
}

module.exports = obtainPlatforms;