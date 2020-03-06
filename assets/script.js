// appID for open weather
let appID="d4c97eb69f4c233c45990ad2f9bc1349";

//one day
let selectionLocation;
let cityName;
let weatherIcon;
let currentTemp;
let currentHumid;
let currentWindSpeed;
let currentWindDegrees
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

// page generation

// search bar and button

let searchBar = $("#city-search");
let searchButton = $("#city-submit");

// search history

let searchHistory = $("#search-history");
let dataHistory=0;

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


// helper functions

// converting from Kelvin to fahrenheit
function kelvinToFahrenheit(temp) {
    return (temp - 273.15 ) * 1.8 + 32;
}

// calculate average based on given value and divisor, rounded to 2 decimalp places
function averageAndDecimals(value,divisor){
    return (value/divisor).toFixed(2);
}

//dynamic page updating
$(document).ready(function() {

    $("#city-submit").on("click",function(e){
        e.preventDefault();
        console.log(searchBar.val());
        selectionLocation = searchBar.val();

        //  search history
        
        let searchEntry = $("<p>");
        let searchDivider = $("<hr>")
        searchEntry.text(selectionLocation);
        searchEntry.attr("data-history",dataHistory)
        searchEntry.addClass("search-entry")
        searchHistory.prepend(searchDivider);
        searchHistory.prepend(searchEntry);

        dataHistory++;

        // one day
        $.ajax(({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + selectionLocation + "&APPID=" + appID,
            method: "POST"
        })).then(function(response){
            cityName = response.name;
            weatherIcon = response.weather[0].icon;
            currentTempKelvin = response.main.temp;
            currentTempFahrenheit = kelvinToFahrenheit(currentTempKelvin).toFixed(2);
            currentHumid= response.main.humidity;
            currentWindSpeed = response.wind.speed;
            currentWindDegrees = response.wind.deg;
            currentLat = response.coord.lat;
            currentLon = response.coord.lon;

            // need latitude and longitude to get UV index
            $.ajax(({
                url: "http://api.openweathermap.org/data/2.5/uvi?APPID="+appID+"&lat="+currentLat + "&lon=" + currentLon,
                method: "GET"
            })).then(function(responseUV){
                uvValue=responseUV.value;
            })
        })

        // five day
        $.ajax(({
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + selectionLocation + "&APPID=" + appID,
            method: "GET"
        })).then(function(responseFiveDay){

            //first day - just the month and day of month
            let dayStart = responseFiveDay.list[0].dt_txt.slice(0,10);
            let dayNext;
        
            // counter to figure out how much to offset
            let counter=0;

            // loop to figure out offset
            for (let i = 0; i < 8; i++) {
                dayNext = responseFiveDay.list[i].dt_txt.slice(0,10);
                if (dayStart == dayNext) {
                    counter++;
                }
            }

            //day one
            for (let i = (0 + counter); i < (7 + counter); i++) {
                dayOneTempSum+= kelvinToFahrenheit(responseFiveDay.list[i].main.temp);
                dayOneHumidSum+= responseFiveDay.list[i].main.humidity; 
            }

            //adding one to counter to start on the next day
            dayOneIcon=responseFiveDay.list[counter+1].weather[0].icon;
            dayOneTempSum = averageAndDecimals(dayOneTempSum,8);
            dayOneHumidSum = averageAndDecimals(dayOneHumidSum,8);
            dayOneDate = responseFiveDay.list[counter+1].dt_txt.slice(5,10);

            console.log("Day One Info: Date " + dayOneDate +"\nDay One Icon: " + dayOneIcon +"\nDay One Temp: " + dayOneTempSum +"F.\nDay One Humidity: " + dayOneHumidSum + "%.");
            
            //day two
            for (let i = (8 + counter); i < (15 + counter); i++) {
                dayTwoTempSum+= kelvinToFahrenheit(responseFiveDay.list[i].main.temp);
                dayTwoHumidSum+= responseFiveDay.list[i].main.humidity; 
            }

            //adding 9 to counter to start on next day and skip previous 8 timeblocks (one day)
            dayTwoDate=responseFiveDay.list[counter+9].dt_txt.slice(5,10);
            dayTwoIcon=responseFiveDay.list[counter+9].weather[0].icon;
            dayTwoTempSum=averageAndDecimals(dayTwoTempSum,8);
            dayTwoHumidSum=averageAndDecimals(dayTwoHumidSum,8);
            console.log("Day Two Info: Date " + dayTwoDate +"\nIcon: " + dayTwoIcon+"\nTemp: " + dayTwoTempSum + "\nHumidity: " + dayTwoHumidSum);
            
            //day three
            for (let i = (16 + counter); i < (23 + counter); i++) {
                dayThreeTempSum+= kelvinToFahrenheit(responseFiveDay.list[i].main.temp);
                dayThreeHumidSum+= responseFiveDay.list[i].main.humidity; 
            }

            dayThreeDate=responseFiveDay.list[counter+17].dt_txt.slice(5,10);
            dayThreeIcon=responseFiveDay.list[counter+17].weather[0].icon;
            dayThreeTempSum=averageAndDecimals(dayThreeTempSum,8);
            dayThreeHumidSum=averageAndDecimals(dayThreeHumidSum,8);
            console.log("Day Three Info: Date " + dayThreeDate +"\nIcon: " + dayThreeIcon+"\nTemp: " + dayThreeTempSum + "\nHumidity: " + dayThreeHumidSum);
            
            //day four
            for (let i = (24 + counter); i < (31 + counter); i++) {
                dayFourTempSum+= kelvinToFahrenheit(responseFiveDay.list[i].main.temp);
                dayFourHumidSum+= responseFiveDay.list[i].main.humidity; 
            }
            
            dayFourDate=responseFiveDay.list[counter+25].dt_txt.slice(5,10);
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
            }
            
            dayFiveDate=responseFiveDay.list[counter+33].dt_txt.slice(5,10);
            dayFiveIcon=responseFiveDay.list[counter+33].weather[0].icon;
            dayFiveTempSum=averageAndDecimals(dayFiveTempSum,lastDayCounter);
            dayFiveHumidSum=averageAndDecimals(dayFiveHumidSum,lastDayCounter);
            console.log("Day Five Info: \nDate " + dayFiveDate +"\nIcon: " + dayFiveIcon+"\nTemp: " + dayFiveTempSum + "\nHumidity: " + dayFiveHumidSum);
            // counter=0;
        })


        // one day forecast
        
        
        // five day forecast
        
    

    })


})

