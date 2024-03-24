// Name: Assignement2
// Course Code: SODV1201
// Class: Introduction to Web Programming
// Author: Glenn Perez
// ==============================================================================================================
// WEATHER INFORMATION USING API
// ==============================================================================================================

// Add an event listener to search button
document.querySelector('#searchLocation').addEventListener('click', () => {
    let searchLocation = document.querySelector('#location').value.trim().toLowerCase();
    let weatherURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' +
        searchLocation + '?unitGroup=metric&key=9RS32YTSG9J6ZRVH8SKDVJXC4&contentType=json';

    let resultsDiv = document.querySelector('#weatherResultsDiv');
    let errorDiv = document.querySelector('#weatherErrorDiv')

    // Request data from API
    fetch(weatherURL)
        .then(response => {
            // Evaluate response
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json()
        })
        .then(response => {
            // Response is valid. Display weather data in the page
            let weatherData = response;
            console.log(weatherData) // Log weather data

            // Show results div and hide error div
            resultsDiv.style.display = 'block';
            errorDiv.style.display = 'none';

            // Store query selectors in variables
            let location = document.querySelector('#weatherLocation');
            let description = document.querySelector('#weatherDescription');
            let condition = document.querySelector('#weatherCondition');
            let temp = document.querySelector('#weatherTemp');
            let humidity = document.querySelector('#weatherHumidity');
            let precipitation = document.querySelector('#weatherPrecip');

            // Update weather information in the page
            location.innerHTML = weatherData.resolvedAddress;
            description.innerHTML = weatherData.description;
            condition.innerHTML = weatherData.currentConditions.conditions;
            temp.innerHTML = weatherData.currentConditions.temp + "°C (Feels like " +
                weatherData.currentConditions.feelslike + '°C)';
            humidity.innerHTML = weatherData.currentConditions.humidity;
            precipitation.innerHTML = weatherData.currentConditions.precipprob + '%';

        })
        .catch(error => {
            // Error response.
            // Hide results div and show error div
            resultsDiv.style.display = 'none';
            errorDiv.style.display = 'block';

            console.log(error) // Log error data
        })
})

// ==============================================================================================================
// Set date on footer
SetDate();
function SetDate() {
    const now = new Date();
    // Constants to display month as text
    const m = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    document.querySelector('#date').textContent = m[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
}