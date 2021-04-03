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

function getResults(data, search) {

    var searchResults = [];
    searchResults.push(data);

    searchInput.textContent = search;

    searchResults.forEach(function (){

        var listResult = document.createElement("div");
        var resultBody = document.createElement("div");
    
        listResult.append(resultBody);
    
        var resultTitle = document.createElement("h2");
        resultTitle.textContent = JSON.stringify(data.name);
    
        var bodyInfo = document.createElement("p");
        bodyInfo.textContent = JSON.stringify(data);
    
        var resultLink = document.createElement("a");
        resultLink.textContent = "Click for more info.";
        // resultLink.href = data.species.url
    
        resultBody.append(resultTitle, bodyInfo, resultLink);
    
        resultsContainer.append(listResult);
    })
}

$(".search-button").click(formSearch);