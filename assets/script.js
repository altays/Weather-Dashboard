// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// #text-dump
// #image-dump
// #search-history

let appID="d4c97eb69f4c233c45990ad2f9bc1349";
// let queryURL="api.openweathermap.org/data/2.5/weather"

// use one query url for one day weather - use city input
// use another query url for uv index - pull lat & long from one day weather
// use another query url for 5 day forecast - use city input

// check out https://css-tricks.com/multiple-simultaneous-ajax-requests-one-callback-jquery/ for multiple AJAX Calls

$.ajax(({
    url: "http://api.openweathermap.org/data/2.5/weather?q=Columbia,MD,USA&APPID=d4c97eb69f4c233c45990ad2f9bc1349",
    method: "POST"
})).then(function(response){
    console.log("One Day: " + JSON.stringify(response));
})

$.ajax(({
    url: "http://api.openweathermap.org/data/2.5/forecast?q=Columbia,MD,USA&APPID=d4c97eb69f4c233c45990ad2f9bc1349",
    method: "GET"
})).then(function(response){
    console.log("5 Day: " + JSON.stringify(response));
})

$.ajax(({
    url: "http://api.openweathermap.org/data/2.5/uvi?APPID=d4c97eb69f4c233c45990ad2f9bc1349&lat=37.73&lon=-75.75",
    method: "GET"
})).then(function(response){
    console.log("UV Index: " + JSON.stringify(response));
})
