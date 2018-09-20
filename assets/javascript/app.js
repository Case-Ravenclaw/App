var client_id = 'HU31LS5FUBEXJMWI5FTBJFRGKDPGDGGJBSMV2A14CEP5YOO0';
var client_secret = 'OYOQDBMT2Q50B3HQNQXO0KXNMV2GR25DF05HUCWFFX3JEO2Y';

//Can use Latitude Longitude or Near One is requireed
var latLon = "41.08,81.51"
var near = "Akron"
var intent = "browse"
var radius = 1000


var version = 20180918
var queryURL = "https://api.foursquare.com/v2/venues/search?client_id="+ client_id +"&client_secret=" + client_secret +"&ll=" + latLon + "&v=" + version + "&intent="+ intent + "&radius="+radius

$.ajax({
url: queryURL,
method: "GET"
})
.then(function(response) {
console.log(response.response.venues);
});








//Zomato

var queryURL = "https://developers.zomato.com/api/v2.1/search?q=Luna Cleveland&radius=1&count=1"

$.ajax({
url: queryURL,
method: "GET",
beforeSend: function(xhr){xhr.setRequestHeader('user-key', '71908c4a0942db243aa61de4a0bff5f2');},

})
.then(function(response) {
console.log(response.restaurants);
});







