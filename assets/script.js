// appID for open weather
let appID="d4c97eb69f4c233c45990ad2f9bc1349";

// testing the api

let responseVal;

// page generation

// search bar and button

let searchBar = $("#city-search");
let searchButton = $("#city-submit");

// search history

let searchHistory = $("#search-history");
let dataHistory=0;
let searchArray=[];
let entryIndex=0;


// cards for five day

let fiveDayD1Img = $("#five-day-d1-img");
let fiveDayD1Title = $("#five-day-d1-title");
let fiveDayD1Para = $("#five-day-d1-para");

let fiveDayD2Img = $("#five-day-d2-img");
let fiveDayD2Title = $("#five-day-d2-title");
let fiveDayD2Para = $("#five-day-d2-para");

let fiveDayD3Img = $("#five-day-d3-img");
let fiveDayD3Title = $("#five-day-d3-title");
let fiveDayD3Para = $("#five-day-d3-para");

let fiveDayD4Img = $("#five-day-d4-img");
let fiveDayD4Title = $("#five-day-d4-title");
let fiveDayD4Para = $("#five-day-d4-para");

let fiveDayD5Img = $("#five-day-d5-img");
let fiveDayD5Title = $("#five-day-d5-title");
let fiveDayD5Para = $("#five-day-d5-para");

// one day

let cityNameDump = $("#city-name-dump");
let tempDump = $("#temp-dump");
let weatherImg = $("#weather-picture-dump");
let humidDump = $("#humid-dump");
let windDump = $("#wind-speed");
let uvDump = $("#uv-dump");

// one day title

let oneDayHeader = $("#one-day-header");

// helper functions

// converting from Kelvin to fahrenheit
function kelvinToFahrenheit(temp) {
    return (temp - 273.15 ) * 1.8 + 32;
}

// calculate average based on given value and divisor, rounded to 2 decimalp places
function averageAndDecimals(value,divisor){
    return (value/divisor).toFixed(2);
}

// determine uv text color based on value
function uvColor(uvValue) {
    if (uvValue >= 0 && uvValue <= 2 ){
        return "green";
    } else if (uvValue >= 3 && uvValue <= 5 ){
        return "orange";
    } else {
        return "red";
    }
}

// function for ajax call

function ajaxCall() {
    //one day
    let currentDate;
    let selectionLocation;
    let cityName;
    let weatherIcon;
    let currentTemp;
    let currentHumid;
    let currentWindSpeed;
    let currentWindDegrees;
    let currentLat;
    let currentLon;

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

    selectionLocation = searchBar.val();

    let searchEntry = $("<p>");
    let searchDivider = $("<hr>")
    searchEntry.text(selectionLocation);
    searchEntry.attr("class","search-entry");
    searchEntry.attr("data-history",searchArray.length);
    searchHistory.prepend(searchDivider);
    searchHistory.prepend(searchEntry);

    searchArray.push(selectionLocation);
    
    entryIndex++;
    let counter=0;

    // one day
    $.ajax(({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + selectionLocation + "&APPID=" + appID,
        method: "POST"
    })).then(function(response){
        cityName = response.name;
        weatherIcon = response.weather[0].icon;
        weatherIconAltText = response.weather[0].description;
        currentTempKelvin = response.main.temp;
        currentTempFahrenheit = kelvinToFahrenheit(currentTempKelvin).toFixed(2);
        currentHumid= response.main.humidity;
        currentWindSpeed = response.wind.speed;
        currentWindDegrees = response.wind.deg;
        currentLat = response.coord.lat;
        currentLon = response.coord.lon;

        cityNameDump.text("Selected City: " + cityName)
        tempDump.text("Current Temperature: " + currentTempFahrenheit + "F");
        weatherImg.attr("src","http://openweathermap.org/img/wn/" + weatherIcon.slice(0,2) + "d@2x.png");
        weatherImg.attr("alt",weatherIconAltText);
        weatherImg.attr("style","block");
        humidDump.text("Current Humidity: " + currentHumid +"%");
        windDump.text("Current Wind Speed: " + currentWindSpeed+ "mph");
        
        $.ajax(({
            url: "https://api.openweathermap.org/data/2.5/uvi?APPID="+appID+"&lat="+currentLat + "&lon=" + currentLon,
            method: "GET"
        })).then(function(responseUV){
            uvValue=responseUV.value;
            uvDump.attr("style","color:" + uvColor(uvValue))
            uvDump.text("UV Index: " + uvValue);
        })
    })

    // five day
    $.ajax(({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + selectionLocation + "&APPID=" + appID,
        method: "GET"
    })).then(function(responseFiveDay){

        responseVal=responseFiveDay;
        //first day - just the month and day of month
        let dayStart = responseFiveDay.list[0].dt_txt.slice(0,10);
        let dayNext;
    
        // loop to figure out offset
        for (let i = 0; i < 8; i++) {
            dayNext = responseFiveDay.list[i].dt_txt.slice(0,10);
            if (dayStart == dayNext) {
                counter++;
            }
        }

        currentDate = responseFiveDay.list[0].dt_txt.slice(6,10);
        oneDayHeader.text("One Day Forecast for " + selectionLocation + " on "+ currentDate);

        //day one
        for (let i = 0; i < counter; i++) {
            dayOneTempSum+= kelvinToFahrenheit(responseFiveDay.list[i].main.temp);
            dayOneHumidSum+= responseFiveDay.list[i].main.humidity; 
        }

        // starting on first day
        dayOneIcon=responseFiveDay.list[0].weather[0].icon;
        dayOneTempSum = averageAndDecimals(dayOneTempSum,8);
        dayOneHumidSum = averageAndDecimals(dayOneHumidSum,8);
        dayOneDate = responseFiveDay.list[0].dt_txt.slice(5,10);
        
        //day two
        for (let i = (1 + counter); i < (8 + counter); i++) {
            dayTwoTempSum+= kelvinToFahrenheit(responseFiveDay.list[i].main.temp);
            dayTwoHumidSum+= responseFiveDay.list[i].main.humidity; 
        }

        //adding counter to offset start 
        dayTwoDate=responseFiveDay.list[counter+0].dt_txt.slice(5,10);
        dayTwoIcon=responseFiveDay.list[counter+0].weather[0].icon;
        dayTwoTempSum=averageAndDecimals(dayTwoTempSum,8);
        dayTwoHumidSum=averageAndDecimals(dayTwoHumidSum,8);
        
        //day three
        for (let i = (9 + counter); i < (16 + counter); i++) {
            dayThreeTempSum+= kelvinToFahrenheit(responseFiveDay.list[i].main.temp);
            dayThreeHumidSum+= responseFiveDay.list[i].main.humidity; 
        }

        dayThreeDate=responseFiveDay.list[counter+8].dt_txt.slice(5,10);
        dayThreeIcon=responseFiveDay.list[counter+8].weather[0].icon;
        dayThreeTempSum=averageAndDecimals(dayThreeTempSum,8);
        dayThreeHumidSum=averageAndDecimals(dayThreeHumidSum,8);
        
        //day four
        for (let i = (17 + counter); i < (24 + counter); i++) {
            dayFourTempSum+= kelvinToFahrenheit(responseFiveDay.list[i].main.temp);
            dayFourHumidSum+= responseFiveDay.list[i].main.humidity; 
        }
        
        dayFourDate=responseFiveDay.list[counter+16].dt_txt.slice(5,10);
        dayFourIcon=responseFiveDay.list[counter+16].weather[0].icon;
        dayFourTempSum=averageAndDecimals(dayFourTempSum,8);
        dayFourHumidSum=averageAndDecimals(dayFourHumidSum,8);
        
        //day five
        let lastDayCounter=0;

        for (let i = (25 + counter); i < responseFiveDay.list.length; i++) {
            lastDayCounter++;
            dayFiveTempSum+= kelvinToFahrenheit(responseFiveDay.list[i].main.temp);
            dayFiveHumidSum+= responseFiveDay.list[i].main.humidity; 
        }
        
        dayFiveDate=responseFiveDay.list[counter+24].dt_txt.slice(5,10);
        dayFiveIcon=responseFiveDay.list[counter+24].weather[0].icon;
        dayFiveTempSum=averageAndDecimals(dayFiveTempSum,lastDayCounter);
        dayFiveHumidSum=averageAndDecimals(dayFiveHumidSum,lastDayCounter);
        
        fiveDayD1Img.attr("src","http://openweathermap.org/img/wn/" + dayOneIcon.slice(0,2) + "d@2x.png");
        fiveDayD1Img.attr("alt","Weather for Day One");
        fiveDayD1Img.attr("style","display:block");
        fiveDayD1Title.text(dayOneDate);
        fiveDayD1Para.text("Temperature: " + dayOneTempSum + "F\n Humdity: " + dayOneHumidSum + "%");

        fiveDayD2Img.attr("src","http://openweathermap.org/img/wn/" + dayTwoIcon.slice(0,2) + "d@2x.png");
        fiveDayD2Img.attr("alt","Weather for Day Two")
        fiveDayD2Title.text(dayTwoDate);
        fiveDayD2Img.attr("style","display:block");
        fiveDayD2Para.text("Temperature: " + dayTwoTempSum + "F\n Humdity: " + dayTwoHumidSum + "%");

        fiveDayD3Img.attr("src","http://openweathermap.org/img/wn/" + dayThreeIcon.slice(0,2) + "d@2x.png");
        fiveDayD3Img.attr("alt","Weather for Day Three")
        fiveDayD3Title.text(dayThreeDate);
        fiveDayD3Img.attr("style","display:block");
        fiveDayD3Para.text("Temperature: " + dayThreeTempSum + "F\n Humdity: " + dayThreeHumidSum + "%");

        fiveDayD4Img.attr("src","http://openweathermap.org/img/wn/" + dayFourIcon.slice(0,2) + "d@2x.png");
        fiveDayD4Img.attr("alt","Weather for Day Four")
        fiveDayD4Title.text(dayFourDate);
        fiveDayD4Img.attr("style","display:block");
        fiveDayD4Para.text("Temperature: " + dayFourTempSum + "F\n Humdity: " + dayFourHumidSum + "%");

        fiveDayD5Img.attr("src","http://openweathermap.org/img/wn/" + dayFiveIcon.slice(0,2) + "d@2x.png");
        fiveDayD5Img.attr("alt","Weather for Day Five")
        fiveDayD5Title.text(dayFiveDate);
        fiveDayD5Img.attr("style","display:block");
        fiveDayD5Para.text("Temperature: " + dayFiveTempSum + "F\n Humdity: " + dayFiveHumidSum + "%");
    });
}

function unloadImages() {
    // setting all images to not display on load
    weatherImg.attr("style" ,"display:none");
    fiveDayD1Img.attr("style" ,"display:none");
    fiveDayD2Img.attr("style" ,"display:none");
    fiveDayD3Img.attr("style" ,"display:none");
    fiveDayD4Img.attr("style" ,"display:none");
    fiveDayD5Img.attr("style" ,"display:none");
}


$(document).ready(function(){ 

    //dynamic page updating

    unloadImages();

    // clicking on submit button activates the submit button function
    $("#city-submit").on("click",function(e){
        e.preventDefault();
        ajaxCall();
    })

    // clicking on a city in search history enters it back into the search bar as a value
    $(document).on("click", ".search-entry", function(e){
        e.preventDefault();
        searchVal = $(this).attr("data-history")
        searchBar.val(searchArray[searchVal]);
        ajaxCall();
        
    });


})

