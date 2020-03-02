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

// object variables

//one day

let selectionLocation = "Columbia,MD,USA";
let cityName;
let currentDate;
let weatherIcon;
let currentTemp;
let currentHumid;
let currentWindSpeed;
let currentWindDegrees
let currentLat;
let currentLon;

//used for exploring object in console
let responseVal;

// uv index

let uvValue;

//5 day

let dayOneDate;
let dayOneIcon;
let dayOneTemp;
let dayOneHumid;

let dayTwoDate;
let dayTwoIcon;
let dayTwoTemp;
let dayTwoHumid;

let dayThreeDate;
let dayThreeIcon;
let dayThreeTemp;
let dayThreeHumid;

let dayFourDate;
let dayFourIcon;
let dayFourTemp;
let dayFourHumid;

let dayFiveDate;
let dayFiveIcon;
let dayFiveTemp;
let dayFiveHumid;

// helper functions

function kelvinToFahrenheit(temp) {
    return (temp - 273.15 ) * 1.8;
}

function calculateAverageFiveDay(data1,data2,data3,data4,data5) {
    return (data1+data2+data3+data4+data5)/5;
}

// one day

$.ajax(({
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + selectionLocation + "&APPID=" + appID,
    method: "POST"
})).then(function(response){
    // console.log("One Day: " + JSON.stringify(response));
    cityName = response.name;
    currentDate;
    weatherIcon = response.weather[0].icon;
    currentTempKelvin = response.main.temp;
    currentTempFahrenheit = kelvinToFahrenheit(currentTempKelvin).toFixed(2);
    currentHumid= response.main.humidity;
    currentWindSpeed = response.wind.speed;
    currentWindDegrees = response.wind.deg;
    currentLat = response.coord.lat;
    currentLon = response.coord.lon;
    console.log("City Name: " + cityName + " \n Current Date: " + currentDate + "\nWeather Icon: " + weatherIcon + "\nCurrent Temp: " + currentTempFahrenheit);
    console.log("Current Humidity: " + currentHumid + "\n Current WindSpeed: " + currentWindSpeed + "\nCurrent Wind Direction: " + currentWindDegrees);
    console.log("Current Latitude: " + currentLat + "\n Current Long: " + currentLon);

    $.ajax(({
        url: "http://api.openweathermap.org/data/2.5/uvi?APPID="+appID+"&lat="+currentLat + "&lon=" + currentLon,
        method: "GET"
    })).then(function(responseUV){
        // console.log("UV Index: " + JSON.stringify(responseUV));
        uvValue=responseUV.value;
        console.log("Current UV Index: " + uvValue);
        
    })
})

// five day

$.ajax(({
    url: "http://api.openweathermap.org/data/2.5/forecast?q=" + selectionLocation + "&APPID=" + appID,
    method: "GET"
})).then(function(responseFiveDay){
    // console.log("5 Day: " + JSON.stringify(responseFiveDay));
    responseVal=responseFiveDay;


    dayOneDate=responseFiveDay.list[0].dt_txt;
    dayOneIcon=responseFiveDay.list[0].weather[0].icon;
    // pull date from all four three hour groups, average together, convert to Fahrenheit
    dayOneTemp;
    // pull data from all four thee hour groups, average together
    dayOneHumid;

    dayTwoDate;
    dayTwoIcon;
    dayTwoTemp;
    dayTwoHumid;
    
    dayThreeDate;
    dayThreeIcon;
    dayThreeTemp;
    dayThreeHumid;
    
    dayFourDate;
    dayFourIcon;
    dayFourTemp;
    dayFourHumid;
    
    dayFiveDate;
    dayFiveIcon;
    dayFiveTemp;
    dayFiveHumid;
})

// uv index


