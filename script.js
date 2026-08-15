
const apiKey = "f1330cb67f474ed38c3181325262007";
const apiUrl = "https://api.weatherapi.com/v1/current.json";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {

    const response = await fetch(
        `${apiUrl}?key=${apiKey}&q=${city}&aqi=no`
    );

    if (!response.ok) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML =
        Math.round(data.current.temp_c) + "°C";
    document.querySelector(".humidity").innerHTML =
        data.current.humidity + "%";
    document.querySelector(".wind").innerHTML =
        data.current.wind_kph + " km/h";

    weatherIcon.src = "https:" + data.current.condition.icon;

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});