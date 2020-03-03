// appID for open weather

let appID="d4c97eb69f4c233c45990ad2f9bc1349";

// moment.js variables

let currentHour = moment().hour();
let currentDay = parseInt(moment().format("DD"));

//one day

let selectionLocation = "Columbia,MD,USA";
let cityName;
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
let momentVar = moment();
let dayOneDate = moment().day(currentDay).format("MMMM" + " DD");
let dayOneIcon;
let dayOneTemp;
let dayOneHumid;



let dayTwoDate = moment().day(currentDay + 1).format("MMMM" + " DD");
let dayTwoIcon;  
let dayTwoTemp;
let dayTwoHumid;

let dayThreeDate = moment().day(currentDay + 2).format("MMMM" + " DD");;
let dayThreeIcon;
let dayThreeTemp;
let dayThreeHumid;

let dayFourDate = moment().day(currentDay + 3).format("MMMM" + " DD");;
let dayFourIcon;
let dayFourTemp;
let dayFourHumid;

let dayFiveDate = moment().day(currentDay + 4).format("MMMM" + " DD");;
let dayFiveIcon;
let dayFiveTemp;
let dayFiveHumid;

console.log("Tomorrow is "+ dayOneDate + ". Next day is " + dayTwoDate);

// helper functions

// converting from Kelvin to fahrenheit
function kelvinToFahrenheit(temp) {
    return (temp - 273.15 ) * 1.8;
}

// return time block - each block is a 3 hour period
function calculateTimeBlock(hour) {
    return Math.round(hour / 3);
}

// return number of timeblocks left in day
function calculateTimeBlocksLeft(hour){
    return 8-calculateTimeBlock(hour);
}

// one day

$.ajax(({
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + selectionLocation + "&APPID=" + appID,
    method: "POST"
})).then(function(response){
    // console.log("One Day: " + JSON.stringify(response));
    cityName = response.name;
    weatherIcon = response.weather[0].icon;
    currentTempKelvin = response.main.temp;
    currentTempFahrenheit = kelvinToFahrenheit(currentTempKelvin).toFixed(2);
    currentHumid= response.main.humidity;
    currentWindSpeed = response.wind.speed;
    currentWindDegrees = response.wind.deg;
    currentLat = response.coord.lat;
    currentLon = response.coord.lon;
    // console.log("City Name: " + cityName +  "\nWeather Icon: " + weatherIcon + "\nCurrent Temp: " + currentTempFahrenheit);
    // console.log("Current Humidity: " + currentHumid + "\n Current WindSpeed: " + currentWindSpeed + "\nCurrent Wind Direction: " + currentWindDegrees);
    // console.log("Current Latitude: " + currentLat + "\n Current Long: " + currentLon);

    // need latitude and longitude to get UV index
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
    console.log(responseVal);

    let currentTimeBlock = calculateTimeBlock(currentHour)
    let timeBlocksRemaining=calculateTimeBlocksLeft(currentHour);
    console.log("Current timeblock is " + currentTimeBlock + ". There are " + timeBlocksRemaining + " timeblocks left.");
    
    dayOneIcon=responseFiveDay.list[0].weather[0].icon;

    //calculating average for day 1 based on timeblocks left in day
    let day1Sum=0;
    for (let i = 0 + currentTimeBlock; i < 8 + currentTimeBlock; i++) {
        // console.log("Main temp at index " + i + " is " + kelvinToFahrenheit(responseVal.list[i].main.temp));
        day1Sum+= kelvinToFahrenheit(responseVal.list[i].main.temp);
        console.log(responseVal.list[i].dt_txt);
    }
    day1Sum = (day1Sum/8).toFixed(0);
    console.log("Main temp tomorrow is " + day1Sum + "F");


    // pull date from all four three hour groups, average together, convert to Fahrenheit
    // dayOneTemp= kelvinToFahrenheit(calculateAverageFiveDay());
    // pull data from all four thee hour groups, average together
    // dayOneHumid= kelvinToFahrenheit(calculateAverageFiveDay());
    console.log("Day One Info: Date " + dayOneDate +"\nDay One Icon: " + dayOneIcon);

    dayTwoDate;
    dayTwoIcon;
    dayTwoTemp;
    dayTwoHumid;
    console.log("Day Two Info: Date " + dayTwoDate +"\nDay Two Icon: " + dayTwoIcon);
    
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