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
        resultBody.append(resultTitle, bodyInfo, resultLink);
        resultsContainer.append(listResult);
    
        listResult.append(resultBody);
    
        var resultTitle = document.createElement("h2");
        var bodyInfo = document.createElement("p");
        var resultLink = document.createElement("a");
        
        resultLink.textContent = "Click for picture.";

        if (selectBoxValue === "pokemon") {
            var pokeImg = document.createElement("img")
        pokeImg.src = data.sprites.other['official-artwork'].front_default
        resultTitle.textContent = JSON.stringify(data.name);
        bodyInfo.textContent = JSON.stringify(data.sprites.other["official-artwork"]);
        resultLink.href = data.sprites.other["official-artwork"].front_default;
        resultsContainer.append(pokeImg)

        } else if (selectBoxValue === "type") {
            for (var i = 0; i < data.pokemon.length; i++) {

                var pokemonH1 = document.createElement("h1")
                pokemonH1.textContent = data.pokemon[i].pokemon.name;
                resultsContainer.append(pokemonH1)
                pokemonH1.setAttribute("class", "type-header")
            }
            resultLink.href = data
            resultTitle.textContent = JSON.stringify(data);
            bodyInfo.textContent = JSON.stringify(data);

        } else if (selectBoxValue === "moves") {
            resultLink.href = data
            resultTitle.textContent = JSON.stringify(data);
            bodyInfo.textContent = JSON.stringify(data);

        } else if (selectBoxValue === "abilities") {
            resultLink.href = data
            resultTitle.textContent = JSON.stringify(data);
            bodyInfo.textContent = JSON.stringify(data);
        }
    }
    
        
    


$(".search-button").click(formSearch);