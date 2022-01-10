var cityList =$("#city-list");


var cities = [];


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
}


function renderCities() {

    cityList.text = "";


    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
      console.log(city);

      var li = $("<li>").text(city);
      li.attr("data-index", i);
      li.attr("class", "list-group-item");
      console.log(li);

      cityList.append(li);
    }
  }


  $("#add-city").on("click", function(event){
      event.preventDefault();


    cities.push(city);
    renderCities();

  });
