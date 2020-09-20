var APIKey = "80555cce8f2ab40520d4836bf43096e6";
var city = "seattle";
var queryURLnow = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
var queryURLforecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

$.ajax({
  url: queryURLnow,
  method: "GET",
}).then(function (responseNow) {
  console.log(responseNow);
var tempK = responseNow.main.temp;
var tempF = Math.round(((9/5)*(tempK - 273) + 32))
var humidity = responseNow.main.humidity;
var wind = responseNow.wind.speed;
var lat = responseNow.coord.lat;
var lon = responseNow.coord.lon;
var icon = responseNow.weather.icon;
var queryURLuv = `http://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${lon}`;

$.ajax({
    url: queryURLuv,
    method: "GET",
  }).then(function (responseUV) {
    console.log(responseUV);
    var UVindex = responseUV.value
    console.log(
        "Temperature: " + tempF,
        "Humidity: " + humidity,
        "Wind Speed: " + wind,
        "lat: " + lat,
        "lon: " + lon,
        "UV Index: " + UVindex,
        icon
      );
  });
});
$.ajax({
    url: queryURLforecast,
    method: "GET",
}).then(function (responseForecast){
    console.log(responseForecast)
    var day1 = ""
    var day2 = ""
    var day3 = ""
    var day4 = ""
    var day5 = ""
})






// function logData(city){

// }
