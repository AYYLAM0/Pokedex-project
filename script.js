//Project Pokedex - Beau, Dan, Kamille, and Robert

//global variables
var formControl = $(".form-control");
var searchBtn = $(".search-button")
var resultsContainer = $(".search-results")
var searchInput = $(".search-input")

// function to make searchbar work
function formSearch(event) {
    event.preventDefault();

    var searchInputValue = $(".form-control").val();
    var selectBoxValue = $(".form-select").val();

    //if no searchbar value, display master modal
    if (!searchInputValue) {
        $('#myModal').modal("show");
        $(".modal-title").text("Error!")
        $(".modal-li-1").text("Please type search parameters!");
    }  

    //pull data from api
    getPokeData(searchInputValue, selectBoxValue);
}
//call formSearch function on click
$(".search-button").click(formSearch);

//function to call data from API
function getPokeData(searchInputValue, selectBoxValue) {
    var pokeUrl = "https://pokeapi.co/api/v2/" + selectBoxValue + "/" + searchInputValue;

    fetch(pokeUrl)
        .then(function (response) {
            //if response is okay, then trigger getResults function
            if (response.ok) { 
                response.json().then(function (data) {
                    getResults(data, searchInputValue, selectBoxValue);
                })

                //display variation of master modal for invaild input
            }  else if (searchInputValue !== response.name) {
                $('#myModal').modal("show");
                $(".modal-title").text("Error!");
                $(".modal-li-1").text("Alert, must type valid input!");

                //display variation of master modal for no filter selected
            } else {
                $('#myModal').modal("show");
                $(".modal-title").text("Error!");
                $(".modal-li-1").text("Alert, must select a filter!");
            } 
        })
}

//function to display data pulled from api
function getResults(data, search, selectBoxValue) {

    searchInput.textContent = search;

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

        //trigger modal on click to display pokemon species info
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

        //display info on search
        var pokeImg = document.createElement("img");
        pokeImg.src = data.sprites.other['official-artwork'].front_default;
        resultTitle.textContent = "Name: " + data.name;
        bodyInfo.textContent = "Type: " + data.types[0].type.name;
        bodyInfo2.textContent = "Height: " + data.height + " ft"
        bodyInfo3.textContent = "Weight: " + data.weight + " lbs"

        //if the pokemon has more than one type, display this data
        if (data.types[1]) {
            bodyInfo.textContent = "Type: " + data.types[0].type.name + "/ " + data.types[1].type.name;
        }
        
        //append info to html container
        resultsContainer.append(pokeImg);

    } else if (selectBoxValue === "type") {

        resultTitle.textContent = data.name;
        
        //for loop to create data for each pokemon displayed
        for (var i = 0; i < data.pokemon.length; i++) {

            var typeH2 = document.createElement("h2")
            typeH2.textContent = data.pokemon[i].pokemon.name;
            bodyInfo.append(typeH2);
            typeH2.setAttribute("class", "type-header");
        }

    } else if (selectBoxValue === "move") {

        //show modal on click for pokemon move info
           function showModal() {

        $('#myModal').modal("show");
        $(".modal-title") .text(data.name)
        $(".modal-li-1") .text("Accuracy: " + data.accuracy)
        $(".modal-li-2").text("PP: " + data.pp)
        $(".modal-li-3").text("Power: " + data.power)
        $(".modal-li-4").text("Type: " + data.type.name)
        $(".modal-li-5").text("Priority: " + data.priority)
       
    }
        
        resultTitle.textContent = data.name
        
        //for loop to create data for each pokemon displayed
        for (var i = 0; i < data.learned_by_pokemon.length; i++) {

            var moveH2 = document.createElement("h2")
            moveH2.textContent = data.learned_by_pokemon[i].name;
            bodyInfo.append(moveH2);
            moveH2.setAttribute("class", "type-header");
        }


    } else if (selectBoxValue === "ability") {

       //show modal on click to display pokemon ability info
        function showModal() {

            $('#myModal').modal("show");
            $(".modal-title").text(data.name)
            $(".modal-li-1").text("Generation: " + data.generation.name)
            $(".modal-li-2").text("Effect: " + data.effect_changes[0].effect_entries[1].effect)
            $(".modal-li-3").text("Chance: " + data.effect_entries[1].effect)
            $(".modal-li-4").text("Bonus Effect: " + data.flavor_text_entries[0].flavor_text)
        }
        
        resultTitle.textContent = data.name

        //for loop to create data for each pokemon displayed
        for (var i = 0; i < data.pokemon.length; i++) {

            var abilityH2 = document.createElement('h2')
            abilityH2.textContent = data.pokemon[i].pokemon.name;
            bodyInfo.append(abilityH2);
            abilityH2.setAttribute("class", "type-header");
        }
    }

    //append to container, then append to html
    resultBody.append(resultTitle, bodyInfo, bodyInfo2, bodyInfo3, resultBtn);
    resultsContainer.append(listResult);

    resultBtn.addEventListener("click", showModal);
}

//function to call weather api
function weatherCall(){

    var noCityUrl = 'http://api.weatherapi.com/v1/forecast.json?key=695952c7d92b4120b1b141701210304&days=4&aqi=no&alerts=no';
    var searchCity = document.getElementById("searchId").value;
    var searchUrl = noCityUrl + "&q=" + searchCity ;
   
//use XML to pull information
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    
    //parsing response to JSON
    var myObj = JSON.parse(this.responseText); 
  
    //displaying weather information
    var tempOutput="Temperature: " + myObj.current.temp_f + " °F"; 
     document.getElementById("tempField").innerHTML = tempOutput;
    var conditionOutput ="Condition: " + myObj.current.condition.text; 
     document.getElementById("conditionField").innerHTML = conditionOutput;
    
    //conditional to determine what type woud be available in weather condition
    if (myObj.current.condition.text === "Sunny" || "Clear") {
         $(".poke-condition").text("Type Available: Fire, Flying, Bug, Grass, Fighting, and Ground")
     }
    if (myObj.current.condition.text === "Mist" || "Overcast" || "Cloudy" || "Partly cloudy" || "Fog") {
         $(".poke-condition").text("Type Available: Psychic, Fairy, Ghost, Poison, and Dark")
     }
    if (myObj.current.condition.text === "Blizzard" || "Moderate snow") {
         $(".poke-condition").text("Type Available: Ice, Steel, and Rock")
     }
    if (myObj.current.condition.text === "Moderate rain" || "Light rain" || "Heavy rain") {
         $(".poke-condition").text("Type Available: Water, and Electric")
     }
    if (myObj.current.condition.text === "Thundery outbreaks possible") {
         $(".poke-condition").text("Type Available: Electric, Water, and Dragon")
     }
    }
  };
  
  xmlhttp.open("GET", searchUrl, true);
  xmlhttp.send();
  }
  
  //call weather api on click of search button
  $('button').click(function() {
  weatherCall();
  });
