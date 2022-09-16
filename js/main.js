
const API_KEY = "8919f40423d85c50f7b9178feaeee36c"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather" 


// takes in city name, gets weather data from api, and calls updatePage() fn
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
    const timeDiff = data.dt - data.sys.sunset
    let condition = weatherIdToIcon(weatherId, timeDiff)
    const imgURL = createImgList(84, condition[1])

    updatePage(temperature, location, country, iconCode, condition[0], tempRange[0], tempRange[1], humidity, windSpeed, rain, imgURL)
}


// checks search input and sends input data to getWeatherData() fn
function searchWeather(city) {
    document.querySelector(".search-bar").value = ""
    document.querySelector(".search-bar").addEventListener("keydown", submitSearch)
    document.querySelector(".search-icon").addEventListener("click", submitSearch)
    query = "?q=" + city + "&appid="
    API_URL = BASE_URL + query + API_KEY
    getWeatherData(API_URL)
}


// updates HTML content with API data and adds page load effect
function updatePage(temperature, location, country, iconCode, condition, high, low, humidity, wind, rain, img) {
    document.querySelector(".cover").classList.add("load-effect")
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
    setTimeout(() => document.querySelector(".cover").classList.remove("load-effect"), 1250)
}


// returns weather condition depending on weather code/id
function weatherIdToIcon(id, timeDiff) {
    if (id < 300) {
        return ["Thunderstorm", "Raining"]
    } else if (id < 400) {
        return ["Drizzling", "Raining"]
    } else if (id < 600) {
        return ["Raining", "Raining"]
    } else if (id < 700) {
        return ["Snowing", "Snowing"]
    } else if (id < 800) {
        return ["Fog", "Fog"]
    } else if (id < 802 && timeDiff > 0) {
        return ["Clear", "Clear Night"]
    } else if (id < 802 && timeDiff < 0) {
        return ["Clear", "Clear"] 
    } else {
        return ["Cloudy", "Cloudy"]
    }
}


// creates list of image paths and calls getRandomImg() fn
function createImgList(num, weatherPath) {
    let imgList = []
    for (let i = 2; i < num+2; i++) {
        imgList.push(`bg${i}.jpg`)
    }
    return getRandomImg(weatherPath, imgList)
}


// grabs random img depending on weather condition 
function getRandomImg(path, imageList) {
    let index = 0
    const root = "./images/"
    
    switch (path) {
        case "Cloudy": 
            index = Math.floor((Math.random() * 14) + 45);
            break
        case "Raining":
            index = Math.floor((Math.random() * 14) + 59);
            break
        case "Snowing":
            index = Math.floor((Math.random() * 11) + 73);
            break
        case "Fog":
            index = Math.floor(Math.random() * 9);
            break
        case "Clear":
            index = Math.floor((Math.random() * 14) + 9);
            break
        case "Clear Night":
            index = Math.floor((Math.random() * 22) + 23);
            break
    }
    return `${root + imageList[index]}`
}


// performs search if enter key is pressed or search button is clicked
function submitSearch(submit) {
    if (submit.key === "Enter" || submit.type === "click") {
        searchWeather(document.querySelector(".search-bar").value)
    }
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


// set default weather data
setTimeout(() => searchWeather("New York"), 50)
