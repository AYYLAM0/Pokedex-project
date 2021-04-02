var searchInput = $(".form-control");
var searchBtn = $(".search-button")

function getPokeData() {
    var requestUrl = "https://pokeapi.co/api/v2/" 

    fetch(requestUrl)
    .then(function (response) {
    return response.json();
    
})
    .then(function(data) {
        console.log(data)
    })
}

function formSearch(event) {
    event.preventDefault();

    var searchInputValue = $(".form-control").value
    var selectBoxValue = $(".form-select").value

    if (!searchInputValue || !selectBoxValue) {
        $('#myModal').modal();
    }

    var queryString = 
  location.assign(queryString);
}

$(".search-button").click(formSearch);

// searchBtn.addEventListener("click", formSearch);
// var selectBoxHandler = function (event) {
//     var parameters = event.target.getAttribute('form-select');
//     if (parameters) {
//       getFeaturedRepos(parameters);
//       repoContainerEl.textContent = '';
//     }
//   };

// var getFeaturedRepos = function (parameters) {
//     var apiUrl = 'https://api.github.com/search/repositories?q=' + parameters + '+is:featured&sort=help-wanted-issues';
//     fetch(apiUrl).then(function (response) {
//       if (response.ok) {
//         response.json().then(function (data) {
//           displayRepos(data.items, parameters);
//         });
//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     });
//   };