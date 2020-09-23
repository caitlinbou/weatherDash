// declare global variables and functions
var APIKey = "80555cce8f2ab40520d4836bf43096e6";
var city = $(".citySearch").val().trim();
var cities = [];
var header;
var reset;
function setLocalStorage() {
  localStorage.setItem("cities", cities, JSON.stringify(cities));
}

function initialBtns() {
  for (i = 0; i < reset.length; i++) {
    var a = $("<button>");
    a.addClass("historyBtn btn btn-outline-secondary");
    a.text(reset[i]);
    $(".prev-search").append(a);
  }
}
// pull from local storage for persistant data and push that data to cities array
var resetString = localStorage.getItem("cities");
if (resetString !== "" && resetString !== null) {
  reset = resetString.split(`,`);
  if (reset !== "" && reset !== null) {
    initialBtns();
    setLocalStorage();
    displayWeatherInfo(reset[0]);
  }
  for (i = 0; i < reset.length; i++) {
    cities.push(reset[i]);
  }
}
// function for AJAX call and for displaying desired information on the page
function displayWeatherInfo(query) {
  var city = $(".citySearch").val().trim();
  // first queryURL used for lat and lon to be applied to second query
  var queryURLnow = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${APIKey}&units=imperial`;
  $.ajax({
    url: queryURLnow,
    method: "GET",
  }).then(function (responseNow) {
    var lat = responseNow.coord.lat;
    var lon = responseNow.coord.lon;
    var queryURLall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${APIKey}&units=imperial`;
    $(".citySearch").val("");
    $.ajax({
      url: queryURLall,
      method: "GET",
    }).then(function (responseAll) {
      // variables to hold information for TODAY weather
      var cityName = responseNow.name;
      var dateTodayUnix = responseNow.dt;
      var unixMS = dateTodayUnix * 1000;
      var dateTodayObject = new Date(unixMS);
      var humanDateToday = dateTodayObject.toLocaleDateString("en-US");
      var tempF = responseAll.current.temp;
      var humidity = responseAll.current.humidity;
      var wind = responseAll.current.wind_speed;
      var uvIndex = responseAll.current.uvi;
      var icon = $("<img>").attr(
        "src",
        `http://openweathermap.org/img/wn/${responseNow.weather[0].icon}@2x.png`
      );
      var forecast = responseAll.daily;
      // variables to hold information for 5 day
      var dateUnixMS;
      var dateObject;
      var humanDate;
      var iconForecast;
      var fiveDay;
      var dateI;
      var minTemp;
      var maxTemp;
      // for loop to render information for each day in five day forecast, with values assigned to variables stated prior
      header = $("<h3 class=header>").text("Five-day forecast");
      $(".five-day").append(header);
      for (var i = 1; i < 6; i++) {
        dateUnixMS = forecast[i].dt * 1000;
        dateObject = new Date(dateUnixMS);
        humanDate = dateObject.toLocaleDateString("en-US");

        fiveDay = $("<div class='col-2 card-body border dayCard'>");
        dateI = $("<h5 class='card-title'>").text(`${humanDate}`);
        iconForecast = $("<img>").attr(
          "src",
          `http://openweathermap.org/img/wn/${forecast[i].weather[0].icon}@2x.png`
        );
        maxTemp = $("<p class='card-text'>").text(
          `Temp high: ${Math.round(forecast[i].temp.max)}°F`
        );
        minTemp = $("<p class='card-text'>").text(
          `Temp low: ${Math.round(forecast[i].temp.min)}°F`
        );
        humidityI = $("<p class='card-text'>").text(
          `humidity: ${forecast[i].humidity}%`
        );
        // appending five day forecast information to cards for each day
        fiveDay.append(dateI);
        fiveDay.append(iconForecast);
        fiveDay.append(minTemp);
        fiveDay.append(maxTemp);
        fiveDay.append(humidityI);
        // appending to the page
        $(".forecast").append(fiveDay);
      }
      // creating divs with today's information and appending to page
      var cityDate = $("<h1>").text(`${cityName} ${humanDateToday}`);
      $(".today").append(cityDate);
      $(".today").append(icon);
      var tempToday = $("<p>").text(`Temperature: ${tempF} °F`);
      $(".today").append(tempToday);
      var humidityToday = $("<p>").text(`Humidity: ${humidity}%`);
      $(".today").append(humidityToday);
      var windToday = $("<p>").text(`Wind Speed: ${wind} MPH`);
      $(".today").append(windToday);
      var uvToday = $("<p class ='uv'>").text(`UV Index: `);
      var span = $(`<span>${uvIndex}</span>`);
      span.appendTo(uvToday);
      $(".today").append(uvToday);
      // coloring span for uv to show favorable/unfavorable
      if (uvIndex < 3) {
        span.addClass("uvFav");
      } else if (uvIndex >= 3 && uvIndex < 6) {
        span.addClass("uvMod");
      } else if (uvIndex >= 6) {
        span.addClass("uvSev");
      }
    });
  });
}

// creates a new button for city being searched and places all recent city search buttons on screen
function renderBtns() {
  for (i = 0; i < cities.length; i++) {
    var a = $("<button>");
    a.addClass("historyBtn btn btn-outline-secondary");
    a.attr("data-number", i);
    a.text(cities[i]);
    $(".prev-search").append(a);
    setLocalStorage();
  }
}
// pulls up refreshed data when a city is called again
$(document).on("click", ".historyBtn", function (event) {
  event.preventDefault();
  // activate proper button from city array for displayWeatherInfo function to work and empties prior data to prevent duplicate
  $(".citySearch").val($(this).text());
  // prevent adding content multiple times
  $(".header").empty();
  $(".today").empty();
  $(".forecast").empty();
  $(".prev-search").empty();
  renderBtns();
  displayWeatherInfo($(this).text());
});
// Adding a click event listener to "citySearchBtn"
$(".citySearchBtn").on("click", function (event) {
  event.preventDefault();
  // prevent adding content multiple times
  $(".header").empty();
  $(".today").empty();
  $(".forecast").empty();
  $(".prev-search").empty();
  //  defines city being searched for and adds that city to "cities" array
  var city = $(".citySearch").val().trim();
  cities.unshift(city);
  // calls functions to retrieve and display info
  renderBtns();
  displayWeatherInfo(city);
});

