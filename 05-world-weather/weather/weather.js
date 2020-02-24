const axios = require('axios');

const getWeather = async (lat, lon) => {
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fad69304c9759133e2424c568bf27a14&units=metric`);
    return resp.data.main.temp;
}

module.exports = {
    getWeather
}