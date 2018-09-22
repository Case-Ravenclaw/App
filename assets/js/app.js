//Foursquare SEARCH endpoint
var client_id = 'HU31LS5FUBEXJMWI5FTBJFRGKDPGDGGJBSMV2A14CEP5YOO0';
var client_secret = 'OYOQDBMT2Q50B3HQNQXO0KXNMV2GR25DF05HUCWFFX3JEO2Y';
var near = ''
var userRadiusMi = ''
var userRadiusM = userRadiusMi / 0.00062137
var version = 20180918
var query = ''

var getSearch = function (queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            if (response.response.venues.length){
                console.log(response.response.venues)
            } else {
                console.log("No Results!")
            }
    });
}

var getLocation = function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser. Please enter a Location")
    }
}

var  showPosition =  function showPosition(position) {
    var curLat = position.coords.latitude
    var curLon = position.coords.longitude
    var latLon = Math.round( curLat * 10 ) / 10 + ',' + Math.round( curLon * 10 ) / 10
    console.log("latitude, longitude", latLon)
    userRadiusMi = $("#radiusSearch").val()
    userRadiusM = userRadiusMi / 0.00062137
    query = $("#query").val()
    
    var queryURL = "https://api.foursquare.com/v2/venues/search?client_id=" + client_id + "&openNow=1" + "&client_secret=" + client_secret + "&ll=" + latLon + "&v=" + version + "&intent=browse" + "&radius=" + userRadiusM + "&limit=10" + "&query=" + query
    getSearch(queryURL)
}

$("#submitSearch").on("click", function () {

    if (!$("#locationSearch").val()) {
        getLocation()
    } else if ($("#locationSearch").val()){
        near = $("#locationSearch").val()
        userRadiusMi = $("#radiusSearch").val()
        userRadiusM = userRadiusMi / 0.00062137
        query = $("#query").val()

        var queryURL = "https://api.foursquare.com/v2/venues/search?client_id=" + client_id + "&openNow=1" + "&client_secret=" + client_secret + "&near=" + near + "&v=" + version + "&intent=browse" + "&radius=" + userRadiusM + "&limit=10" + "&query=" + query
        getSearch(queryURL)
    } else{
        console.log("Broken")
    }
})
///////////////////
//EXPLORE
/////////////////

var q = "Luna"
var userRadiusMi = ""
var userRadiusM = userRadiusMi / 0.00062137
var cuisines = ""
var lat = ""
var lon = ""
var radius = 1000
var limit = 10
//Zomato

var buildZomatoCall = function (){
    q = $("#locationExplore").val().trim()
    cuisines = $("#cuisines").val().data();

}
var calculatePosition = function() {
    var curLat = Math.round( position.coords.latitude * 10 ) / 10;
    var curLon = Math.round( position.coords.longitude * 10 ) / 10;
    // var latLon =  + ',' + Math.round( curLon * 10 ) / 10
    console.log("EXPLORE LAT", curLat);
    console.log("EXPLORE LON", curLon)

    userRadiusMi = $("#radiusSearch").val()
    userRadiusM = userRadiusMi / 0.00062137

}


var doZomatoCall = function() {
var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + q + "&radius=" + radius + "&count=" + limit;

$.ajax({
url: queryURL,
method: "GET",
beforeSend: function(xhr){xhr.setRequestHeader('user-key', '71908c4a0942db243aa61de4a0bff5f2');},
})
.then(function(response) {
    apiResponse=response.restaurants;

console.log(response.restaurants);
});
}
// doZomato();


var showPositionExplore = function showPositionExplore() {
    var curLat = Math.round( position.coords.latitude * 10 ) / 10;
    var curLon = Math.round( position.coords.longitude * 10 ) / 10;
    // var latLon =  + ',' + Math.round( curLon * 10 ) / 10
    console.log("EXPLORE LAT", latLon)
    userRadiusMi = $("#radiusSearch").val()
    userRadiusM = userRadiusMi / 0.00062137
    query = $("#query").val()
    
    var queryURL = "https://api.foursquare.com/v2/venues/explore?client_id=" + client_id + "&openNow=1" + "&client_secret=" + client_secret + "&near=" + near + "&v=" + version + "&intent=browse" + "&radius=" + userRadiusM + "&limit=10" + "&query=" + query
    getSearch(queryURL)
    
}

$("#submitExplore").on("click", function () {
    getLocation();
    calculatePosition(position);
    buildZomatoCall();


    // // if (!$("#locationSearch").val()) {
    //     getLocation()
    
    //     near = $("#locationExplore").val()
    //     userRadiusMi = $("#radiusSearch").val()
    //     userRadiusM = userRadiusMi / 0.00062137
    //     query = $("#query").val()

    //     var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + q + "&radius=" + radius + "&count=" + "&lat=" + curLat + ;
    //     getExplore(queryURL)
})
