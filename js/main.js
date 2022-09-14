const API_KEY = "8919f40423d85c50f7b9178feaeee36c"
const query = "?zip=11201,us&appid="
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather" 
const API_URL = BASE_URL + query + API_KEY

async function getWeatherData() {
    const res = await fetch(API_URL)
    const data = await res.json()

    const weatherId = data.weather[0].id
    const location = data.name
    const country = getCountry(data.sys.country)
    const windSpeed = data.wind.speed
    const date = new Date(data.dt * 1000)
    const temperature = tempToImperial(data.main.temp)
    const tempFeel = data.main.feels_like
    const tempRange = [tempToImperial(data.main.temp_max), tempToImperial(data.main.temp_min)]
    const humidity = data.main.humidity
    const rain = getRain(data.rain)

    console.log(data)

    const [icon, condition] = weatherIdToIcon(weatherId)
    const weatherInfo = document.createElement("div")
    weatherInfo.innerHTML = 
    `
    <section class="weather-summary">
        <h1>${temperature}&deg</h1>
        <div>
            <span>${location}</span>
            <span>${country}</span>
        </div>
        <div>
            <span id="icon">${icon}</span>
            <span>${condition}</span>
        </div>
    </section>

    <section class="weather-details">
        <input type="text" placeholder="Search">
        <h3>Weather Details</h3>
        <ul>
            <li>High: ${tempRange[0]}&deg</li>
            <li>Low: ${tempRange[1]}&deg</li>     
            <li>Humidity: ${humidity}%</li>
            <li>Wind: ${windSpeed} mph</li>
            <li>Rain: ${rain} in</li>
        </ul>
    </section>
    `
    document.querySelector("body").appendChild(weatherInfo)
}

function getCountry(abbr) {
    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
      );
    return regionNames.of(abbr)
}

function getRain(data) {
    return data === undefined ? 0 : (data/25.4).toPrecision(2)
}

function tempToImperial(temp) {
    return Math.round((temp - 273.15) * (9/5) + 32)
}

function weatherIdToIcon(id) {
    if (id < 300) {
        return [`<i class="fa-solid fa-cloud-showers-heavy"></i>, "Thunderstorm`]
    } else if (id < 400) {
        return `<i class="fa-solid fa-droplet"></i>`
    } else if (id < 600) {
        return `<i class="fa-solid fa-cloud-rain"></i>`
    } else if (id < 700) {
        return `<i class="fa-regular fa-snowflake"></i>`
    } else if (id < 800) {
        return `<i class="fa-solid fa-smog"></i>`
    } else if (id === 800) {
        return [`<i class="fa-solid fa-sun"></i>`, "Clear"]
    } else {
        return `<i class="fa-solid fa-cloud"></i>`
    }
}

getWeatherData()