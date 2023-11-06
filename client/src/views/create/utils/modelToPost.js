const modelToPost = (name, image, description, platforms, released, rating, genres) => {
    const toPost = { //create the model to post
        name: `${name.charAt(0).toUpperCase()}${name.slice(1)}`,
        image: image,
        description: description,
        platforms: [...platforms],
        released: released,
        rating: Number(rating), //it's a float
        genresName: []
    }

    for(let key in genres){ //add genres
        if(genres[key]) toPost.genresName.push(key);
    }

    return toPost;
}

export default modelToPost;