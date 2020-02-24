const axios = require('axios');

const getPlaceLatLng = async (location) => {
    let encodedURL = encodeURI(location);
    
    const instace = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedURL}`,
        timeout: 1000,
        headers: {'x-rapidapi-key': '3d06632eebmsh3270425ec2e1276p121522jsnfbcd299e20e3'}
    });
    
    const resp = await instace.get();
    if (resp.data.Results.length == 0) {
        throw new Error(`Not results found for ${location}`);
    }

    const data = resp.data.Results[0];
    const loc = data.name;
    const lat = data.lat;
    const lon = data.lon;

    return {
        loc,
        lat,
        lon
    }
}

module.exports = {
    getPlaceLatLng
}
