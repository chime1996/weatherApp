const apiKey = "32713770d399c963772340f4db94fc7b";
const searchInput = document.querySelector(".weather--search-input");
const searchButton = document.querySelector("button");
const cityName = document.querySelector(".city-text--header");
const temperature = document.querySelector(".city--text-temp");
const weatherIcon = document.querySelector(".weather-icon");
const rainChance = document.querySelector(".percent");
const windSpeed = document.querySelector(".percent-wind");
const cloudPercent = document.querySelector(".cloud-percent");

searchButton.addEventListener("click", function () {
  const city = searchInput.value;

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      cityName.textContent = `${data.name}, ${data.sys.country}`;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;

      // Weather conditions
      const iconCode = data.weather[0].icon;
      weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
      weatherIcon.style.width = "200px";
      weatherIcon.style.height = "200px";
      weatherIcon.style.display = "block";

      // Update other weather conditions
      const rain = data.rain ? data.rain["1h"] || 0 : 0;
      rainChance.textContent = `${rain}%`;
      windSpeed.textContent = `${data.wind.speed} km/h`;
      cloudPercent.textContent = `${data.clouds.all}%`;
    })
    .catch((error) => {
      cityName.textContent = "City not found!";
      temperature.textContent = "";
      weatherIcon.style.display = "none";
      rainChance.textContent = "0%";
      windSpeed.textContent = "0 km/h";
      cloudPercent.textContent = "0%";
      console.error("Error fetching data:", error);
    });
});
