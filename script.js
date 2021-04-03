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
    
        var resultTitle = document.createElement("h2");
        var bodyInfo = document.createElement("p");
        var bodyInfo2 = document.createElement("p");
        var bodyInfo3 = document.createElement("p");
        var resultBtn = document.createElement("button");
        
        resultBtn.textContent = "Click for more info.";
        

        if (selectBoxValue === "pokemon") {
            
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
            for (var i = 0; i < data.pokemon.length; i++) {

                var pokemonH1 = document.createElement("h1")
                pokemonH1.textContent = data.pokemon[i].pokemon.name;
                resultsContainer.append(pokemonH1)
                pokemonH1.setAttribute("class", "type-header")
            }
            
            resultTitle.textContent = JSON.stringify(data);
            bodyInfo.textContent = JSON.stringify(data);

        } else if (selectBoxValue === "move") {
            
            resultTitle.textContent = data.name;
            bodyInfo.textContent = "BP " + data.power;

        } else if (selectBoxValue === "abilities") {
           
            resultTitle.textContent = JSON.stringify(data);
            bodyInfo.textContent = JSON.stringify(data);
        }
        resultBody.append(resultTitle, bodyInfo, bodyInfo2);
        resultsContainer.append(listResult);
    }
    
function showModal(){
    $('#myModal').modal("show");
    $(".modal-body").
}  
    


$(".search-button").click(formSearch);