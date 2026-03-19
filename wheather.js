let apikey = "8f206522d545c2749146332d5f76a79e";
let API = "https://api.openweathermap.org/data/2.5/weather?q=";

let input = document.getElementsByClassName("nav-search")[0];
let btn = document.getElementsByClassName("tab")[0];
let weatherIcon = document.querySelector(".wheather-icon");

async function weather(city) {
  try {
    let response = await fetch(API + city + `&appid=${apikey}`);

    if (response.status == 404) {
      alert("City not found!");
      return;
    }

    let data = await response.json();

    document.querySelector(".City-Name").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.floor(data.main.temp - 273.15) + "°C";
    document.querySelector(".humidity").innerHTML =
      data.main.humidity + "% <br> Humidity";
    document.querySelector(".wind").innerHTML =
      data.wind.speed + " km/h <br> Wind speed";

    // Change weather icon
    let condition = data.weather[0].main;

    if (condition === "Clouds") {
      weatherIcon.src = "clouds.png";
    } else if (condition === "Rain") {
      weatherIcon.src = "rain.png";
    } else if (condition === "Clear") {
      weatherIcon.src = "clear.png";
    } else if (condition === "Drizzle") {
      weatherIcon.src = "drizzle.png";
    } else if (condition === "Mist") {
      weatherIcon.src = "mist.png";
    }

  } catch (error) {
    alert("Something went wrong. Check internet.");
  }
}

function reloading() {
  location.reload();
}

// Button click
btn.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    weather(input.value);
  }
});

// Enter key search
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    weather(input.value);
  }
});
