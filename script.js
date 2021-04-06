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
            $(".modal-body").text("Type: " + data.types[0].type.name)
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


$(".search-button").click(formSearch);