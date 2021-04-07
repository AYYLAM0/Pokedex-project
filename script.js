var formControl = $(".form-control");
var searchBtn = $(".search-button")
var resultsContainer = $(".search-results")
var searchInput = $(".search-input")

function formSearch(event) {
    event.preventDefault();

    var searchInputValue = $(".form-control").val();
    var selectBoxValue = $(".form-select").val();

    if (!searchInputValue) {
        $('#myModal').modal("show");
        $(".modal-title").text("Error!")
        $(".modal-body").text("Please type search parameters!")
    }

    getPokeData(searchInputValue, selectBoxValue);

}

function getPokeData(searchInputValue, selectBoxValue) {
    var pokeUrl = "https://pokeapi.co/api/v2/" + selectBoxValue + "/" + searchInputValue;

    console.log(pokeUrl);

    fetch(pokeUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    getResults(data, searchInputValue, selectBoxValue);
                })
            } else {
                $('#myModal').modal("show");
                $(".modal-title").text("Error!");
                $(".modal-body").text("Alert, must select a filter!");
            }
        })
}

function getResults(data, search, selectBoxValue) {

    // searchInput.textContent = search;
    console.log(data.length);
    console.log(data);

    var listResult = document.createElement("div");
    var resultBody = document.createElement("div");

    listResult.append(resultBody);

    var resultTitle = document.createElement("h1");
    var bodyInfo = document.createElement("p");
    var bodyInfo2 = document.createElement("p");
    var bodyInfo3 = document.createElement("p");
    var resultBtn = document.createElement("button");

    resultBtn.textContent = "Click for more info.";


    if (selectBoxValue === "pokemon") {

        function showModal() {

            $('#myModal').modal("show");
            $(".modal-title").text(data.name)
            $(".modal-img").attr('src', data.sprites.other['official-artwork'].front_default);
            $(".modal-li-1").text("Type: " + data.types[0].type.name)
            $(".modal-li-2").text("Abilities: " + data.abilities[0].ability.name + "/" + data.abilities[1].ability.name)
            $(".modal-li-3").text("Stats: " + "HP: " + data.stats[0].base_stat + " ATK: " + data.stats[1].base_stat + " DEF: " + data.stats[2].base_stat + " SP. ATK: " + data.stats[3].base_stat + " SP. DEF: " + data.stats[4].base_stat + " SPD: " + data.stats[5].base_stat)
            $(".modal-li-4").text("Base XP: " + data.base_experience);
            $(".modal-li-5").text("Height: " + data.height + " ft " + "Weight: " + data.weight + " lbs")
        }


        var pokeImg = document.createElement("img");
        pokeImg.src = data.sprites.other['official-artwork'].front_default;
        resultTitle.textContent = "Name: " + data.name;
        bodyInfo.textContent = "Type: " + data.types[0].type.name;
        if (data.types[1]) {
            bodyInfo.textContent = "Type: " + data.types[0].type.name + "/ " + data.types[1].type.name;
        }
        bodyInfo2.textContent = "Height: " + data.height + " ft"
        bodyInfo3.textContent = "Weight: " + data.weight + " lbs"

        resultsContainer.append(pokeImg);

    } else if (selectBoxValue === "type") {

        resultTitle.textContent = data.name;
        
        for (var i = 0; i < data.pokemon.length; i++) {

            var typeH2 = document.createElement("h2")
            typeH2.textContent = data.pokemon[i].pokemon.name;
            bodyInfo.append(typeH2);
            typeH2.setAttribute("class", "type-header");
        }

    } else if (selectBoxValue === "move") {
        
        resultTitle.textContent = data.name
        
        for (var i = 0; i < data.learned_by_pokemon.length; i++) {

            var moveH2 = document.createElement("h2")
            moveH2.textContent = data.learned_by_pokemon[i].name;
            bodyInfo.append(moveH2);
            moveH2.setAttribute("class", "type-header");
        }


    } else if (selectBoxValue === "ability") {
        
        resultTitle.textContent = data.name

        for (var i = 0; i < data.pokemon.length; i++) {
            var abilityH2 = document.createElement('h2')
            abilityH2.textContent = data.pokemon[i].pokemon.name;
            bodyInfo.append(abilityH2);
            abilityH2.setAttribute("class", "type-header");
        }
    }
    resultBody.append(resultTitle, bodyInfo, bodyInfo2, bodyInfo3, resultBtn);
    resultsContainer.append(listResult);


    resultBtn.addEventListener("click", showModal);
}

function weatherCall(){

    var noCityUrl = 'http://api.weatherapi.com/v1/forecast.json?key=695952c7d92b4120b1b141701210304&days=4&aqi=no&alerts=no';
    var searchCity = document.getElementById("searchId").value;
    var searchUrl = noCityUrl + "&q=" + searchCity ;
    
    console.log(searchCity)
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
      console.log('XMLHttpRequest Response \n-------------');
      console.log(xmlhttp.response);
    
      var myObj = JSON.parse(this.responseText); 
  
     var tempOutput="Temperature: " + myObj.current.temp_f + " ○F"; 
     document.getElementById("tempField").innerHTML = tempOutput;
     var conditionOutput ="Condition: " + myObj.current.condition.text; 
     document.getElementById("conditionField").innerHTML = conditionOutput;
     var conditionOutput ="Tomorrow High: " + myObj.forecast.forecastday[0].day.maxtemp_f; 
     document.getElementById("tomorrowHigh").innerHTML = conditionOutput + " ○F";
     var conditionOutput ="Tomorrow Low: " + myObj.forecast.forecastday[0].day.mintemp_f; 
     document.getElementById("tomorrowLow").innerHTML = conditionOutput + " ○F";
     var conditionOutput ="Tomorrow Condition: " + myObj.forecast.forecastday[0].day.condition.text; 
     document.getElementById("tomorrowCondition").innerHTML = conditionOutput;

    }
  };
  
  xmlhttp.open("GET", searchUrl, true);
  xmlhttp.send();
  }
    
  
  $('button').click(function() {
  weatherCall();
  });


$(".search-button").click(formSearch);