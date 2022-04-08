import axios from 'axios';
import dotenv from 'dotenv'
// import weather from 'weather-js';


// export function weatherApi(city){
//     weather.find({
//         search: city,
//         degreeType: "C",
//     }, function (err, result) {
//         console.log(result);
//     })

// }
export const weatherApi = async (city, type) => {
    dotenv.config({
        path: `.env.${type}`
    })
    try {
        console.log("weather: ",city);
        const { data } = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_KEY}`);

        return data;

    } catch (error) {
        console.error("Not Found!!!")
    }
}