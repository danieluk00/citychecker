const weatherKey = 'lvx3dGLXKFqkpjPAJW2whArsfaMgpNsl';
const timezoneKey = 'FC5BY9MHTCTQ';
const geocodeKey = '43585abe9b09496f86830d36aadebbc4';

const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${weatherKey}&q=${city}`

    const response = await fetch(base + query);
    const data = await response.json();

 //   console.log(data[0]);

    return data[0];

};

const getWeather = async (cityId) => {

    const base =  'http://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${cityId}?apikey=${weatherKey}`;

    const response = await fetch(base + query);
    const data = await response.json();

//   console.log(data[0]);

    return data[0];

};

const getTimeZone = async (lat,long) => {

    const base = 'http://api.timezonedb.com/v2.1/get-time-zone';
    const query = `?key=${timezoneKey}&format=json&by=position&lat=${lat}&lng=${long}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return parseInt(data.gmtOffset)/3600;
};

const getLatLong = async (city) => {
    const base = 'https://api.opencagedata.com/geocode/v1/';
    const query = `json?q=${city}&key=${geocodeKey}`;

    const response = await fetch(base + query);
    const data = await response.json();

    const lat = data.results[0].geometry.lat;
    const long = data.results[0].geometry.lng;

    console.log(data.results[0]);
    console.log(lat, long);

    return {lat, long};

};