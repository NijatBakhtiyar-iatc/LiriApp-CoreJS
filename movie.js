import axios from 'axios';
import dotenv from 'dotenv';


export const movieApi = async (movie, type) => {
    dotenv.config({
        path: `.env.${type}`
    })

    try {
        console.log("movie:",movie);
        const { data } = await axios(`https://www.omdbapi.com/?apikey=${process.env.MOVIE_KEY}&t=${movie}&y=2000&plot=full`);
        
        return data;
    } catch (error) {
        console.error("Not Found!");
    }
}