const cleanInput = (setInput) => {
    setInput({
        name: '',
        image: '',
        description: '',
        platforms: [],
        released: '',
        rating: '',
        genres: {}
    });
}

export default cleanInput;