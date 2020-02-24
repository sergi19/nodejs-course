const place = require('./place/place');
const weather = require('./weather/weather');

const argv = require('yargs').options({
    location: {
        demand: true,
        alias: 'loc',
        desc: 'City and Country which we want to get the weather'
    }
}).argv;

const getCityWeather = async (location) => {
    try {
        const promisePlace = await place.getPlaceLatLng(location);
        const promiseWeather = await weather.getWeather(promisePlace.lat, promisePlace.lon);
        return `The wetaher of ${promisePlace.loc} is ${promiseWeather}` ;
    } catch(exception) {
        return `Couldn't determine the climate of ${location}`;
    }
}

getCityWeather(argv.location)
    .then(console.log)
    .catch(console.log);
