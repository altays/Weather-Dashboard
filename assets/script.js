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
let dayOneTempSum = 0;
let dayOneHumidSum = 0;

let dayTwoDate = moment().day(currentDay + 1).format("MMMM" + " DD");
let dayTwoIcon;  
let dayTwoTempSum = 0;
let dayTwoHumidSum = 0;

let dayThreeDate = moment().day(currentDay + 2).format("MMMM" + " DD");
let dayThreeIcon;
let dayThreeTempSum = 0;
let dayThreeHumidSum = 0;

let dayFourDate = moment().day(currentDay + 3).format("MMMM" + " DD");
let dayFourIcon;
let dayFourTempSum = 0;
let dayFourHumidSum = 0;

let dayFiveDate = moment().day(currentDay + 4).format("MMMM" + " DD");
let dayFiveIcon;
let dayFiveTempSum = 0;
let dayFiveHumidSum = 0;

let todayDate = moment().format("MMMM DD YYYY")

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
        // console.log("Current UV Index: " + uvValue);
        
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

    // console.log("Current timeblock is " + currentTimeBlock + ". There are " + timeBlocksRemaining + " timeblocks left.");

    // work out logic for determining number of days left based on dt_txt
    // while responseFiveDay.list[i].dt_txt !== responseFiveDay.list[j].dt_txt, add to sum? checks for if days are the same
    // since the dt_txt also has hours listed at the end, the hours will ahve to be trimmed off 

    dayOneIcon=responseFiveDay.list[0].weather[0].icon;

    // a string from dt_txt that just has the day and month
    let dayStart = responseFiveDay.list[0].dt_txt.slice(0,10);
    let dayNext;
    // counter to figure out how much to offset
    let counter=0;

    // loop to figure out offset
    for (let i = 0; i < 8; i++) {
        dayNext = responseFiveDay.list[i].dt_txt.slice(0,10);
        if (dayStart == dayNext) {
            console.log(dayNext)
            console.log("Main temp at index " + i + " is " + kelvinToFahrenheit(responseVal.list[i].main.temp));
            console.log("Counter is at "+ counter + " and the first day is " + dayStart + "and index is at " + i);
            counter++;
        }
    }

    console.log("Offset is " + counter);

    // calculating average time blocks based on offset
    
    for (let i = (0 + counter); i < (8 + counter); i++) {
        // console.log(i)
        dayOneTempSum+= kelvinToFahrenheit(responseFiveDay.list[i].main.temp);
        dayOneHumidSum+= responseFiveDay.list[i].main.humidity; 
        // console.log(dayOneTempSum + " , " + dayOneHumidSum + " , " + counter)
    }
    
    dayOneTempSum = (dayOneTempSum/8).toFixed(0);
    dayOneHumidSum = (dayOneHumidSum/8).toFixed(0);
       
    console.log("Day One Info: Date " + dayOneDate +"\nDay One Icon: " + dayOneIcon +"\nDay One Temp: " + dayOneTempSum +"F.\nDay One Humidity: " + dayOneHumidSum + "%.");
    
    dayTwoDate;
    dayTwoIcon;
    dayTwoTempSum;
    dayTwoHumidSum;
    // console.log("Day Two Info: Date " + dayTwoDate +"\nDay Two Icon: " + dayTwoIcon);
    
    dayThreeDate;
    dayThreeIcon;
    dayThreeTempSum;
    dayThreeHumidSum;
    
    dayFourDate;
    dayFourIcon;
    dayFourTempSum;
    dayFourHumidSum;
    
    dayFiveDate;
    dayFiveIcon;
    dayFiveTempSum;
    dayFiveHumidSum;
})