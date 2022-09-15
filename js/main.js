const API_KEY = "8919f40423d85c50f7b9178feaeee36c"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather" 
let query = "?zip=11201,us&appid="
let API_URL = BASE_URL + query + API_KEY


// gets weather data from url
async function getWeatherData(url) {
    const res = await fetch(url)
    const data = await res.json()
    
    const weatherId = data.weather[0].id
    const location = data.name
    const country = getCountry(data.sys.country)
    const windSpeed = data.wind.speed
    const temperature = tempToImperial(data.main.temp)
    const tempRange = [tempToImperial(data.main.temp_max), tempToImperial(data.main.temp_min)]
    const humidity = data.main.humidity
    const rain = getRain(data.rain) 
    const iconCode = data.weather[0].icon
    const [condition, folderPath] = weatherIdToIcon(weatherId)
    const imgURL = getRandomImg(folderPath)
    // const tempFeel = data.main.feels_like
    // const date = new Date(data.dt * 1000)
    console.log(data)

    updatePage(temperature, location, country, icon, iconCode, condition, tempRange[0], tempRange[1], humidity, windSpeed, rain, imgURL)
}


// updates HTML content with API data
function updatePage(temperature, location, country, icon, iconCode, condition, high, low, humidity, wind, rain, img) {
    document.querySelector(".temperature").textContent = `${temperature}°` 
    document.querySelector(".location").textContent = `${location}`
    document.querySelector(".country").textContent = `${country}`
    document.querySelector("#icon").src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
    document.querySelector(".condition").innerHTML = `${condition}`
    document.querySelector(".high").innerHTML = `<i class="fa-regular fa-sun"></i> High: ${high}&deg`
    document.querySelector(".low").innerHTML = `<i class="fa-solid fa-cloud-moon"></i> Low: ${low}&deg`
    document.querySelector(".humidity").innerHTML = `<i class="fa-solid fa-droplet"></i> Humidity: ${humidity}%`
    document.querySelector(".wind").innerHTML = `<i class="fa-solid fa-wind"></i> Wind: ${wind} mph`
    document.querySelector(".rain").innerHTML = `<i class="fa-solid fa-umbrella"></i> Rain: ${rain} in`
    document.querySelector("body").style.background = `url(${img})`
    document.querySelector("body").style["background-size"] = "cover"
}


// coverts raw API country code to name
function getCountry(abbr) {
    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
      );
    return regionNames.of(abbr)
}


// converts rain data from mm to inches
function getRain(data) {
    return data === undefined ? 0 : (data/25.4).toPrecision(2)
}


// converts temperature from Kelvin to Fahrenheit
function tempToImperial(temp) {
    return Math.round((temp - 273.15) * (9/5) + 32)
}


// returns [icon, condition, img path] depending on weather code/id
function weatherIdToIcon(id) {
    if (id < 300) {
        return ["Thunderstorm", "rain/"]
    } else if (id < 400) {
        return ["Drizzling", "rain/"]
    } else if (id < 600) {
        return ["Raining", "rain/"]
    } else if (id < 700) {
        return ["Snowing", "snow/"]
    } else if (id < 800) {
        return ["Fog", "atmosphere/"]
    } else if (id < 802) {
        return ["Clear", "clear-day/"]
    } else {
        return ["Cloudy", "cloudy/"]
    }
}


// grabs random relevant img depending on weather condition 
function getRandomImg(path) {
    let index = 0
    const root = "./images/"
    const images = ["bg46.jpg", "bg63.jpg", "bg57.jpg", "bg69.jpg", "background3.jpg", "bg11.jpg", "bg48.jpg"]
    
    switch (path) {
        case "cloudy/": 
            index = 0;
            break
        case "rain/":
            index = 1;
            break
        case "snow/":
            index = 3;
            break
        case "atmosphere/":
            index = 4;
            break
        case "clear-day/":
            index = 5;
            break
    }
    return `${root + path + images[index]}`
}


// performs search if enter key is pressed or search button is clicked
function submitSearch(submit) {
    if (submit.key === "Enter" || submit.type === "click") {
        searchWeather(document.querySelector(".search-bar").value)
    }
    console.log(submit)
}


// gets weather data depending on search term
function searchWeather(city) {
    document.querySelector(".search-bar").value = ""
    document.querySelector(".search-bar").addEventListener("keydown", submitSearch)
    document.querySelector(".search-icon").addEventListener("click", submitSearch)
    query = "?q=" + city + "&appid="
    API_URL = BASE_URL + query + API_KEY
    getWeatherData(API_URL)
}


// default weather data
searchWeather("Brooklyn")
