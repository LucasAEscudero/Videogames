const modelToPost = (name, image, description, platforms, released, rating, genres) => {
    const toPost = { //create the model to post
        name: `${name.charAt(0).toUpperCase()}${name.slice(1)}`,
        image: image,
        description: description,
        platforms: [],
        released: released,
        rating: Number(rating), //it's a float
        genresName: []
    }

    for(let key in platforms){ //add platforms
        if(platforms[key]) toPost.platforms.push(key);
    }

    for(let key in genres){ //add genres
        if(genres[key]) toPost.genresName.push(key);
    }

    return toPost;
}

export default modelToPost;