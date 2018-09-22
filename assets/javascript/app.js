// foursquare 
client_id = HU31LS5FUBEXJMWI5FTBJFRGKDPGDGGJBSMV2A14CEP5YOO0
client_secret = OYOQDBMT2Q50B3HQNQXO0KXNMV2GR25DF05HUCWFFX3JEO2Y// 

// zomatoAPI = "71908c4a0942db243aa61de4a0bff5f2";

//joes code

//Foursquare SEARCH endpoint
var client_id = 'HU31LS5FUBEXJMWI5FTBJFRGKDPGDGGJBSMV2A14CEP5YOO0';
var client_secret = 'OYOQDBMT2Q50B3HQNQXO0KXNMV2GR25DF05HUCWFFX3JEO2Y';

var distanceArray = []
var nameArray = []
var addressArray = []

var getSearch = function (queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
        console.log(response.response)
        for(var i = 0; i < response.response.venues.length; i++){
            distanceArray.push(response.response.venues[i].location.distance)
            nameArray.push(response.response.venues[i].name)
            addressArray.push(response.response.venues[i].location.address)
        }
        console.log("names " + nameArray)
        console.log("distance " + distanceArray)
        console.log("address " + addressArray)
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
        //need to trim to one decimal
        var latLon = Math.round( curLat * 10 ) / 10 + ',' + Math.round( curLon * 10 ) / 10
        var near = $("#locationSearch").val()
        var userRadiusMi = $("#radiusSearch").val()
        var userRadiusM = userRadiusMi / 0.00062137
        var version = 20180918
        var query = $("#query").val()


        if (!$("#locationSearch").val()) {
            var queryURL = "https://api.foursquare.com/v2/venues/search?client_id=" + client_id + "&openNow=1" + "&client_secret=" + client_secret + "&ll=" + latLon + "&v=" + version + "&intent=browse" + "&radius=" + userRadiusM + "&limit=10" + "&query=" + query
            getSearch(queryURL)
        } else if ($("#locationSearch").val()) {
            var queryURL = "https://api.foursquare.com/v2/venues/search?client_id=" + client_id + "&openNow=1" + "&client_secret=" + client_secret + "&near=" + near + "&v=" + version + "&intent=browse" + "&radius=" + userRadiusM + "&limit=10" + "&query=" + query
            getSearch(queryURL)
        } else {
            console.log("Broken")
        }
    }
}

$("#submitSearch").on("click", function () {
    getCurrentLocation()
})

$("#testBtn").on("click", function(){
    // $(".search-container").hide()
    dataCreate()
    dataFill()
})

var dataCreate = function(data, target){
    var newTD = $("<td>")
    $(newTD).text(data)
            .appendTo(target)
}

var dataFill = function(){
    for(var j = 0; j < 10; j++){
        var newTR = $("<tr>")
    dataCreate(nameArray[j], newTR)
    dataCreate(addressArray[j], newTR)
    dataCreate(distanceArray[j], newTR)
    $(newTR).appendTo($(".abc"))
    }    
}

function sortNumber(a,b){
    return a - b 
}
//foursquare api 
// var radius = $("#input-radius").val().trim()
// var section = "food"
// var cityState = $("#input-city").val().trim()
// var fs_id = "HU31LS5FUBEXJMWI5FTBJFRGKDPGDGGJBSMV2A14CEP5YOO0"
// var fs_secret = "OYOQDBMT2Q50B3HQNQXO0KXNMV2GR25DF05HUCWFFX3JEO2Y"
// var v = "20180918"
// var queryURL = "https://api.foursquare.com/v2/venues/explore?client_id=" + fs_id + "&client_secret=" + fs_secret + "&near=" + cityState + "&limit=10&section=" + section + "&radius=" + radius + "&v=" + v;

// // $("#testBtn").on("click", function () {
// //     $.ajax({
// //         url: queryURL,
// //         method: "GET"
// //     }).then(function (response) {
// //         var results = response.response.groups
// //         console.log(results)
// //     })
// // })
// //Zomato

// var zQueryURL = "https://developers.zomato.com/api/v2.1/search?q=" + q + "&count=1"
//     var q = 
// $.ajax({
//     url: zQueryURL,
//     method: "GET",
//     beforeSend: function (xhr) { xhr.setRequestHeader('user-key', '71908c4a0942db243aa61de4a0bff5f2'); },

// })
//     .then(function (response) {
//         console.log(response.restaurants);
//     });