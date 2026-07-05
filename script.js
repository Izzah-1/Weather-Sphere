const apiKey = "fcd663e6fe304a4fa5b595bdc0aff636";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

const detailCards = document.querySelectorAll(".detail-card");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent = data.name;
        temperature.textContent = Math.round(data.main.temp) + "°C";
        description.textContent = data.weather[0].description;

        detailCards[0].querySelector("p").textContent =
            data.main.humidity + "%";

        detailCards[1].querySelector("p").textContent =
            data.wind.speed + " m/s";

        detailCards[2].querySelector("p").textContent =
            data.main.pressure + " hPa";

        detailCards[3].querySelector("p").textContent =
            (data.visibility / 1000) + " km";

    }

    catch (error) {

        alert("City not found!");

    }

}
