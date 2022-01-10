var cityList =$("#city-list");


var cities = [];
console.log(cities);


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
      li.attr("data-index", i);
      li.attr("class", "list-group-item");
      console.log(li);

      cityList.append(li);
    }
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
