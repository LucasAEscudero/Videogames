const cleanInput = (setInput) => {
    setInput({
        name: '',
        image: '',
        description: '',
        platforms: [],
        released: '',
        rating: '',
        genres: {},
        tags: {}
    });
}

export default cleanInput;