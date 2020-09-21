var APIKey = "80555cce8f2ab40520d4836bf43096e6";
var city = "seattle";
var queryURLnow = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;
// var queryURLforecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

$.ajax({
  url: queryURLnow,
  method: "GET",
}).then(function (responseNow) {
  console.log(responseNow);
  var lat = responseNow.coord.lat;
  var lon = responseNow.coord.lon;
  var queryURLall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${APIKey}&units=imperial`;

  $.ajax({
    url: queryURLall,
    method: "GET",
  }).then(function (responseAll) {
    console.log(queryURLall);
    console.log(responseAll);
    var cityName = responseNow.name;
    var dateToday = responseNow.dt;
    var tempF = responseAll.current.temp;
    var humidity = responseAll.current.humidity;
    var wind = responseAll.current.wind_speed;
    var uvIndex = responseAll.current.uvi;
    var icon = responseNow.weather.icon;
    var forecast = responseAll.daily;
    console.log(forecast);
    for (i = 1; i < 6; i++) {
      console.log(
        // TODO:convert date to standard date
        "date: " + forecast[i].dt,
        "minimum temp: " + forecast[i].temp.min,
        "maximum temp: " + forecast[i].temp.max,
        "humidity: " + forecast[i].humidity + "%",
        // TODO: get icon working
        "icon: " + forecast[i].weather.icon
      );
      
    }
    console.log(
      "City: " + cityName,
    //   TODO: convert date to standard date
      "Today's Date: " + dateToday,
    //   TODO: figure out how to add the "degree" symbol
      "Temperature: " + (tempF) + " F",
      "Humidity: " + humidity + "%",
      "Wind Speed: " + wind + " MPH",
      "lat: " + lat,
      "lon: " + lon,
    //   TODO: 
      "UV Index: " + uvIndex,
    //   TODO: get icon working
      icon
    );
  });
});

$(".citySearch").on("click", function(){
    $(this).val
})



// function logData(city){

// }
