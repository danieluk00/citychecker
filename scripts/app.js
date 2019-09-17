const cityForm = document.querySelector('form');
const weatherResult = document.querySelector('.weatherresult');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const clock = document.querySelector('.clock');
const card = document.querySelector('.card');

let gmtOffset=0;

const onLoad = () => {
    updateClock();
    cityForm.city.focus();
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //Get city value
    const city= cityForm.city.value.trim();
    cityForm.reset();

    //Update UI with new city
    updateWeather(city)
        .then(data => updateWeatherUI(data))
        .catch(error => console.log(error))

    console.log('City entered:',city);

    updateTime(city)
        .then(data => setGMTOffset(data.gmtOffset))
        .catch(error => console.log(error))

})

const updateWeather = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {cityDetails, weather}

}

const updateTime = async (city) => {

    const cityLatLong = await getLatLong(city);
    const gmtOffset = await getTimeZone(cityLatLong.lat, cityLatLong.long);

    return {gmtOffset};

}

const setGMTOffset = data => {

    let userTimeZoneOffset = new Date().getTimezoneOffset()/60
    gmtOffset = data + userTimeZoneOffset;
}

const updateWeatherUI = (data) => {

    const cityDetails = data.cityDetails;
    const weather= data.weather;

    //Update details template
    details.innerHTML=`
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //Update night/day image
    const iconSrc= `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src',iconSrc);

    let timeSrc = null;
    if (weather.IsDayTime){
        timeSrc='img/day.svg'
    } else {
        timeSrc='img/night.svg'
    }
    time.setAttribute('src',timeSrc);

    //remove d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};


const updateClock = () => {

    const now =  new Date();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    h = h + gmtOffset;
    m = m<=9 ? '0' + m : m;
    s = s<=9 ? '0' + s : s;

    clock.innerHTML=`
    <span>${h}</span> : 
    <span>${m}</span> :
    <span>${s}</span>
    `;

}

setInterval(updateClock, 1000);