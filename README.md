# Weather-Dashboard

## Goal of project

The goal for this project was to build a weather dashboard that runs in the browser and utilizes dynamically updating HTML and CSS using data from the OpenWeather API (https://openweathermap.org/api) to retrieve weather data.

## User story & Acceptance Criteria

The user story for this project was as follows: 

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

The acceptance criteria were as follows: 

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## How acceptance criteria was satisfied

```
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
```

This acceptance criteria was satisfied by creating a input field for the city and using the APIs for information about that city's current and future weather.

```
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
```

This acceptance criteria was satisfied with two separate calls. The city search pulled up the information for the One Day Weather and a separate call had to be made for the UV Index. The latter API uses latitude and longitude, which was pulled from the One Day Weather.

```
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
```

This acceptance criteria was satisfied by using conditional statements to set the UV index text color based on if the value fell within specific ranges.

```
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
```

This acceptance criteria was satisfied by averaging the Five Day Forecast. Each day is split into 3 hour chunks, so the first day had to be calculated by determining the number of blocks until the next day. This number is then used to offset the later days.

```
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

This acceptance criteria was satisfied by setting a click event on the document whenever an element with the "search-entry" class was clicked. This re-enters the value from that element back into the input box and resubmits it into the ajax call for one and five day weather.

## Issues / Future Updates

The primary issue is that when search history goes over five entries, the layout gets affected. 

One potential update would be to use arrays to store the one and five day weather. This would allow for less variables to be used and would create more concise code.