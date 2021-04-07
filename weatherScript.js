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