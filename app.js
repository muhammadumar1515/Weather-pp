// API key for OpenWeatherMap (Replace 'YOUR_API_KEY' with your actual key)
const apiKey = `8eb27e851736e07aa6bc98890b59954e`;

// DOM elements
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

// Function to fetch weather data from the API
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if the city exists
        if (data.cod === "404") {
            alert("City not found!");
            return;
        }

        // Extract weather data
        const { name, main, weather, wind: windData } = data;

        // Display weather info
        cityName.textContent = name;
        temp.innerHTML = `Temperature: ${main.temp}°C`;
        condition.innerHTML = `Condition: ${weather[0].description}`;
        humidity.innerHTML = `Humidity: ${main.humidity}%`;
        wind.innerHTML = `Wind Speed: ${windData.speed} m/s`;

        // Show the weather info div
        weatherInfo.style.display = "block";
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Event listener for the search button
searchBtn.addEventListener("click", function() {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    } else {
        alert("Please enter a city!");
    }
});

// Optional: Event listener to search weather on Enter key press
cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
