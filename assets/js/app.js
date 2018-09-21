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



//Foursquare EXPLORE endpoint 
// var radius = "1000"
// var section = "food"
// var city = "Willoughby,OH"
// var fs_id = "HU31LS5FUBEXJMWI5FTBJFRGKDPGDGGJBSMV2A14CEP5YOO0"
// var fs_secret = "OYOQDBMT2Q50B3HQNQXO0KXNMV2GR25DF05HUCWFFX3JEO2Y"
// var v = "20180918"
// var open = "1"
// var queryURL = "https://api.foursquare.com/v2/venues/explore?client_id=" + fs_id + "&client_secret=" + fs_secret + "&near=" + city + "&limit=10&section=" + section + "&radius=" + radius + "&v=" + v + "&openNow=" + open

// $("#submitExplore").on("click", function () {
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         var results = response.response.groups
//         console.log(results)
//     })
// })