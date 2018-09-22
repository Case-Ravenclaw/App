//Foursquare SEARCH endpoint
var client_id = 'HU31LS5FUBEXJMWI5FTBJFRGKDPGDGGJBSMV2A14CEP5YOO0';
var client_secret = 'OYOQDBMT2Q50B3HQNQXO0KXNMV2GR25DF05HUCWFFX3JEO2Y';
var near = ''
var userRadiusMi = ''
var userRadiusM = userRadiusMi / 0.00062137
var version = 20180918
var query = ''
var venueIDs =[]

var getSearch = function (queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            if (response.response.venues.length){
                for(var i =0; i < response.response.venues.length; i++){
                    venueIDs.push(response.response.venues[i].id)
                }console.log("venues " + venueIDs)
            } else {
                console.log("No Results!")
            }
    });
}

var idSearch = function(){
for(var j = 0; j < venueIDs.length; j++){
    var queryURL = "https://api.foursquare.com/v2/venues/" + venuesIDs[j] + "?client_id=" + client_id + "&client_secret=" + client_secret +"&v=" + version
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log("address " + response.response.venues.location.address)
    })
}

function getCurrentLocation() {
    //Get current location (default if leaving location blank)
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser. Please enter a Location")
        }
    }
    getLocation()

    function showPosition(position) {
        var curLat = position.coords.latitude
        var curLon = position.coords.longitude
        var latLon = Math.round( curLat * 10 ) / 10 + ',' + Math.round( curLon * 10 ) / 10
        userRadiusMi = $("#radiusSearch").val()
        userRadiusM = userRadiusMi / 0.00062137
        query = $("#query").val()
        
        var queryURL = "https://api.foursquare.com/v2/venues/search?client_id=" + client_id + "&openNow=1" + "&client_secret=" + client_secret + "&ll=" + latLon + "&v=" + version + "&intent=browse" + "&radius=" + userRadiusM + "&limit=10" + "&query=" + query
        getSearch(queryURL)
    }
}

$("#submitSearch").on("click", function () {

    if (!$("#locationSearch").val()) {
        getCurrentLocation()
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

