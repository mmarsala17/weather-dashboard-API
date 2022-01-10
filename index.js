var cityList =$("#city-list");


var cities = [];
var key = "fc8bfacdac6r209ecs22977";


function FormatDay(date){
    var date = new Date();
    console.log(date);
    var month = date.getMonth()+1;
    var day = date.getDate();

    var dayOutput = date.getFullYear() + '/' +
        (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day;
    return dayOutput;
}




init();





function init(){
 
    var storedCities = JSON.parse(localStorage.getItem("cities"));

   
    if (storedCities !== null) {
        cities = storedCities;
      }

    renderCities();
}


function storeCities(){
  
  localStorage.setItem("cities", JSON.stringify(cities));
  console.log(localStorage);
}


function renderCities() {

    cityList.empty = ();


    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];

      
      var li = $("<li>").text(city);
      li.attr("id", "listC");
      li.attr("class", "list-group-item");
      console.log(li);

      cityList.prepend(li);
      if (!city){
        return
    } 
    else{
        getResponseWeather(city)
    };
}   



  $("#add-city").on("click", function(event){
      event.preventDefault();

      var city = $("#city-input").val().trim();
      
      if (city === "") {
        return;
    }

    cities.push(city);

    console.log(cities);
    console.log(city);

  storeCities();
  renderCities();
  });

  function getResponseWeather(cityName){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid=" + key; 


    $("#today-weather").empty();
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      var cityTitle = $("<h3>").text(response.name + " "+ FormatDay());
      $("#today-weather").append(cityTitle);
      var TempetureToNum = parseInt((response.main.temp)* 9/5 - 459);
      var cityTemperature = $("<p>").text("Tempeture: "+ TempetureToNum + " °F");
      $("#today-weather").append(cityTemperature);
      var cityHumidity = $("<p>").text("Humidity: "+ response.main.humidity + " %");
      $("#today-weather").append(cityHumidity);
      var cityWindSpeed = $("<p>").text("Wind Speed: "+ response.wind.speed + " MPH");
      $("#today-weather").append(cityWindSpeed);
      var CoordLon = response.coord.lon;
      var CoordLat = response.coord.lat;


    var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid="+ key+ "&lat=" + CoordLat +"&lon=" + CoordLon;
    $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(responseuv) {

        var cityUV = $("<span>").text(responseuv.value);
      var cityUVp = $("<p>").text("UV Index: ");
      cityUVp.append(cityUV);
        $("#today-weather").append(cityUVp);
        $("#today-weather").append(cityUV);
        if(cityUV <= 2){
            cityUV.attr("class","green")
        }
        else if (cityUV <= 7){
            cityUV.attr("class","orange")
        }
        else{
            cityUV.attr("class","red")
        }
      });
    });
    var cnt = 5;   
    var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key;
      $.ajax({
      url: queryURL3,
      method: "GET"
    }).then(function(response5day) { 
      $("#boxes").empty();
      console.log(response5day);
      for(var i=0; i<15; i=i+2){
          var FivedayDiv = $("<div>");
          FivedayDiv.attr("class","col-3 m-2 bg-primary")
          var read_date = response5day.list[i].dt;
          var d = new Date(0); 
          d.setUTCSeconds(read_date);
          var date = d;
          console.log(date);
          var month = date.getMonth()+1;
          var day = date.getDate();
          var dayOutput = date.getFullYear() + '/' +
          (month<10 ? '0' : '') + month + '/' +
          (day<10 ? '0' : '') + day;
          var Fivedayh4 = $("<h6>").text(dayOutput);
          var imgtag = $("<img>");
          var pTemperatureK = response5day.list[i].main.temp;
          var TempetureTof = parseInt((pTemperatureK)* 9/5 - 459);
          var pTemperature = $("<p>").text("Tempeture: "+ TempetureToNum + " °F");
          var pHumidity = $("<p>").text("Humidity: "+ response5day.list[i].main.humidity + " %");
          FivedayDiv.append(Fivedayh4);
          FivedayDiv.append(imgtag);
          FivedayDiv.append(pTemperature);
          FivedayDiv.append(pHumidity);

          $("#boxes").prepend(FivedayDiv);



      }

  });

