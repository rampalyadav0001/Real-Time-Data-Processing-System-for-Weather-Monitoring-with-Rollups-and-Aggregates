// script.js
let weather = {
    apiKey: "f831aee2074c5d74af5c84505c583a9b",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
            }
            return response.json();
        })
        .then((data) => {
            this.displayWeather(data);
            this.updateChart(data); // Update chart with new data
        });
    },
    
    displayWeather: function (data) {
        const { name } = data.city;
        const { icon, description } = data.list[0].weather[0];
        const { temp, feels_like, humidity, temp_min, temp_max } = data.list[0].main;
        const { speed } = data.list[0].wind;
        const datetime = data.list[0].dt_txt;

        const convertTemp = (temp, unit) => {
            if (unit === "F") {
                return ((temp * 9 / 5) + 32).toFixed(2);
            } else if (unit === "K") {
                return (temp + 273.15).toFixed(2);
            } else {
                return temp.toFixed(2);
            }
        };

        const selectedUnit = ttt;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".dt").innerText = "Last updated: " + datetime;

        document.querySelector(".temp").innerText = convertTemp(temp, selectedUnit) + " °" + selectedUnit;
        document.querySelector(".temp-feels-like").innerText = "Feels like: " + convertTemp(feels_like, selectedUnit) + " °" + selectedUnit;
        document.querySelector(".temp-avg").innerText = "Avg Temp: " + convertTemp((temp_min + temp_max) / 2, selectedUnit) + " °" + selectedUnit;
        document.querySelector(".temp-min").innerText = "Min Temp: " + convertTemp(temp_min, selectedUnit) + " °" + selectedUnit;
        document.querySelector(".temp-max").innerText = "Max Temp: " + convertTemp(temp_max, selectedUnit) + " °" + selectedUnit;

        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";

        document.querySelector(".weather").classList.remove("loading");

        // Populate forecast boxes (as before)
        for (let i = 1; i <= 5; i++) {
            const index = i * 6; // 6 hours later for forecast
            document.querySelector(`.icon${i}`).src =
                "https://openweathermap.org/img/wn/" + data.list[index].weather[0].icon + ".png";
            document.querySelector(`.temp${i}`).innerText = convertTemp(data.list[index].main.temp, selectedUnit) + " °" + selectedUnit;
            document.querySelector(`.dt${i}`).innerText = data.list[index].dt_txt;
        }
    },

    updateChart: function (data) {
        const temps = data.list.map(item => item.main.temp); // Extract temperatures
        const labels = data.list.map(item => item.dt_txt); // Extract corresponding datetime for x-axis

        // Create/update the chart
        const ctx = document.getElementById('summaryChart').getContext('2d');
        if (this.summaryChart) {
            this.summaryChart.data.labels = labels; // Update labels
            this.summaryChart.data.datasets[0].data = temps; // Update data
            this.summaryChart.update(); // Refresh chart
        } else {
            this.summaryChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: temps,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'Temperature (°C)',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Date & Time',
                            },
                        },
                    },
                }
            });
        }
    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            weather.search();
        }
    });

var ttt = "C"; // Default temperature unit
document.querySelector("select").addEventListener("change", function (evt) {
    ttt = evt.target.value;
    weather.fetchWeather(document.querySelector(".city").innerText.split("Weather in ")[1] || "Bangalore");
});

// Initial fetch for weather in Bengaluru
weather.fetchWeather("Bengaluru");

// Function to call the API every 5 minutes
setInterval(() => {
    weather.fetchWeather(document.querySelector(".city").innerText.split("Weather in ")[1] || "Bengaluru");
}, 300000); // 300000 ms = 5 minutes
