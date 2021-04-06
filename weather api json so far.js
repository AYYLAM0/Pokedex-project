var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
   document.getElementById("demo").innerHTML = myObj.date;
  
  }

};
xmlhttp.open("GET", 'http://api.weatherapi.com/v1/forecast.json?key=695952c7d92b4120b1b141701210304&q=London&days=4&aqi=no&alerts=no', true);
xmlhttp.send();
