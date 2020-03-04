// appID for open weather
let appID="d4c97eb69f4c233c45990ad2f9bc1349";

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

let dayOneDate;
let dayOneIcon;
let dayOneTempSum = 0;
let dayOneHumidSum = 0;

let dayTwoDate;
let dayTwoIcon;  
let dayTwoTempSum = 0;
let dayTwoHumidSum = 0;

let dayThreeDate;
let dayThreeIcon;
let dayThreeTempSum = 0;
let dayThreeHumidSum = 0;

let dayFourDate;
let dayFourIcon;
let dayFourTempSum = 0;
let dayFourHumidSum = 0;

let dayFiveDate;
let dayFiveIcon;
let dayFiveTempSum = 0;
let dayFiveHumidSum = 0;

let todayDate = moment().format("MMMM DD YYYY")

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

function averageAndDecimals(value,divisor){
    return (value/divisor).toFixed(2);
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

    // work out logic for determining number of days left based on dt_txt
    // while responseFiveDay.list[i].dt_txt !== responseFiveDay.list[j].dt_txt, add to sum? checks for if days are the same
    // since the dt_txt also has hours listed at the end, the hours will ahve to be trimmed off 

    // a string from dt_txt that just has the day and month
    let dayStart = responseFiveDay.list[0].dt_txt.slice(0,10);
    let dayNext;
    // counter to figure out how much to offset
    let counter=0;

    // loop to figure out offset
    for (let i = 0; i < 8; i++) {
        dayNext = responseFiveDay.list[i].dt_txt.slice(0,10);
        if (dayStart == dayNext) {
            // console.log(dayNext)
            counter++;
        }
    }

    // console.log("Offset is " + counter);
    // calculating average time blocks based on offset

    //day one
    
    for (let i = (0 + counter); i < (7 + counter); i++) {
        // console.log(i)
        dayOneTempSum+= kelvinToFahrenheit(responseFiveDay.list[i].main.temp);
        dayOneHumidSum+= responseFiveDay.list[i].main.humidity; 
        // console.log(dayOneTempSum + " , " + dayOneHumidSum + " , " + counter)
    }
    //adding one to counter to start on the next day
    dayOneIcon=responseFiveDay.list[counter+1].weather[0].icon;
    dayOneTempSum = averageAndDecimals(dayOneTempSum,8);
    dayOneHumidSum = averageAndDecimals(dayOneHumidSum,8);
    dayOneDate = responseFiveDay.list[counter+1].dt_txt.slice(0,10);

    console.log("Day One Info: Date " + dayOneDate +"\nDay One Icon: " + dayOneIcon +"\nDay One Temp: " + dayOneTempSum +"F.\nDay One Humidity: " + dayOneHumidSum + "%.");
    
    //day two

    for (let i = (8 + counter); i < (15 + counter); i++) {
        // console.log(i)
        dayTwoTempSum+= kelvinToFahrenheit(responseFiveDay.list[i].main.temp);
        dayTwoHumidSum+= responseFiveDay.list[i].main.humidity; 
        // console.log(dayOneTempSum + " , " + dayOneHumidSum + " , " + counter)
    }

    //adding 9 to counter to start on next day and skip previous 8 timeblocks (one day)
    dayTwoDate=responseFiveDay.list[counter+9].dt_txt.slice(0,10);
    dayTwoIcon=responseFiveDay.list[counter+9].weather[0].icon;
    dayTwoTempSum=averageAndDecimals(dayTwoTempSum,8);
    dayTwoHumidSum=averageAndDecimals(dayTwoHumidSum,8);
    console.log("Day Two Info: Date " + dayTwoDate +"\nIcon: " + dayTwoIcon+"\nTemp: " + dayTwoTempSum + "\nHumidity: " + dayTwoHumidSum);
    
    //day three

    for (let i = (16 + counter); i < (23 + counter); i++) {
        // console.log(i)
        dayThreeTempSum+= kelvinToFahrenheit(responseFiveDay.list[i].main.temp);
        dayThreeHumidSum+= responseFiveDay.list[i].main.humidity; 
        // console.log(dayOneTempSum + " , " + dayOneHumidSum + " , " + counter)
    }

    dayThreeDate=responseFiveDay.list[counter+17].dt_txt.slice(0,10);
    dayThreeIcon=responseFiveDay.list[counter+17].weather[0].icon;
    dayThreeTempSum=averageAndDecimals(dayThreeTempSum,8);
    dayThreeHumidSum=averageAndDecimals(dayThreeHumidSum,8);
    console.log("Day Three Info: Date " + dayThreeDate +"\nIcon: " + dayThreeIcon+"\nTemp: " + dayThreeTempSum + "\nHumidity: " + dayThreeHumidSum);
    
    //day four

    for (let i = (24 + counter); i < (31 + counter); i++) {
        // console.log(i)
        dayFourTempSum+= kelvinToFahrenheit(responseFiveDay.list[i].main.temp);
        dayFourHumidSum+= responseFiveDay.list[i].main.humidity; 
        // console.log(dayOneTempSum + " , " + dayOneHumidSum + " , " + counter)
    }
    
    dayFourDate=responseFiveDay.list[counter+25].dt_txt.slice(0,10);
    dayFourIcon=responseFiveDay.list[counter+25].weather[0].icon;
    dayFourTempSum=averageAndDecimals(dayFourTempSum,8);
    dayFourHumidSum=averageAndDecimals(dayFourHumidSum,8);
    console.log("Day Four Info: \nDate " + dayFourDate +"\nIcon: " + dayFourIcon+"\nTemp: " + dayFourTempSum + "\nHumidity: " + dayFourHumidSum);

    //day five

    let lastDayCounter=0;

    for (let i = (32 + counter); i < (responseFiveDay.list.length); i++) {
        lastDayCounter++;
        dayFiveTempSum+= kelvinToFahrenheit(responseFiveDay.list[i].main.temp);
        dayFiveHumidSum+= responseFiveDay.list[i].main.humidity; 
        // console.log(dayOneTempSum + " , " + dayOneHumidSum + " , " + counter)
    }
    
    dayFiveDate=responseFiveDay.list[counter+33].dt_txt.slice(0,10);
    dayFiveIcon=responseFiveDay.list[counter+33].weather[0].icon;
    dayFiveTempSum=averageAndDecimals(dayFiveTempSum,lastDayCounter);
    dayFiveHumidSum=averageAndDecimals(dayFiveHumidSum,lastDayCounter);
    console.log("Day Five Info: \nDate " + dayFiveDate +"\nIcon: " + dayFiveIcon+"\nTemp: " + dayFiveTempSum + "\nHumidity: " + dayFiveHumidSum);

})