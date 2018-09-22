//Foursquare SEARCH endpoint
var client_id = 'FZ5OBOFAZHYVQ0H2MKNGOZCEWDRVIVHLXQS31LD4IU2OML4I';
//HU31LS5FUBEXJMWI5FTBJFRGKDPGDGGJBSMV2A14CEP5YOO0
//FZ5OBOFAZHYVQ0H2MKNGOZCEWDRVIVHLXQS31LD4IU2OML4I
var client_secret = 'ZY1UQBPUXBN5P3VCIKVHGQEFNJLOXFQRCR5FPCSLPNCUSYIJ';
//OYOQDBMT2Q50B3HQNQXO0KXNMV2GR25DF05HUCWFFX3JEO2Y
//ZY1UQBPUXBN5P3VCIKVHGQEFNJLOXFQRCR5FPCSLPNCUSYIJ
var near = ''
var userRadiusMi = ''
var userRadiusM = userRadiusMi / 0.00062137
var version = 20180918
var query = ''
var venueIDs = []

var getSearch = function (queryURL) {
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            if (response.response.venues.length) {
                for (var i = 0; i < response.response.venues.length; i++) {
                    venueIDs.push(response.response.venues[i].id)
                }
                idSearch()
            } else {
                console.log("No Results!")
            }
        });
}

var idSearch = function () {
    for (var j = 0; j < venueIDs.length; j++) {
        var queryURL = "https://api.foursquare.com/v2/venues/" + venueIDs[j] + "?client_id=" + client_id + "&client_secret=" + client_secret + "&v=" + version
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                //create results div
                var $resultDiv = $("<div>").addClass('result')

                var $nameP = $("<p>").text(response.response.venue.name).addClass("name")
                var $addressP = $("<p>").text(response.response.venue.location.address).addClass("address")
                var $categoryP = $("<p>").text(response.response.venue.categories.name).addClass("category")

                //change the rating to be out of 5
                var rating = Math.floor(response.response.venue.rating / 2)
                var $ratingP = $("<p>").text(rating).addClass("rating")

                //adding dollar signs for price tiers
                var priceArray = []
                for (var k = 0; k < response.response.venue.price.tier; k++) {
                    priceArray.push("$")
                }
                var $pricesP = $("<p>").text(priceArray.join(" ")).addClass("prices")

                //format hours from boolean to yes/no strings
                var openString = ''
                if (response.response.venue.hours.isOpen === true) {
                    openString = "Open now!"
                } else if (response.response.venue.hours.isOpen === false) {
                    openString = "This is not open right now"
                } else {
                    openString = "We don't have data on this"
                }
                var $hoursP = $("<p>").text(openString).addClass("open")

                var $linkA = $("<a>").text("View Website").attr("href", response.response.venue.page.pageInfo.links.items[0].url).addClass("link")

                console.log($nameP)
                console.log($addressP)
                console.log($categoryP)
                console.log($ratingP)
                console.log($pricesP)
                console.log($hoursP)
                console.log($linkA)

                $resultDiv.append($nameP)
                $resultDiv.append($addressP)
                $resultDiv.append($categoryP)
                $resultDiv.append($ratingP)
                $resultDiv.append($pricesP)
                $resultDiv.append($hoursP)
                $resultDiv.append($linkA)

                $(".results").append($resultDiv)

                console.log($resultDiv)
            })
    }
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
        var latLon = Math.round(curLat * 10) / 10 + ',' + Math.round(curLon * 10) / 10
        userRadiusMi = $("#radiusSearch").val()
        userRadiusM = userRadiusMi / 0.00062137
        query = $("#query").val()

        var queryURL = "https://api.foursquare.com/v2/venues/search?client_id=" + client_id + "&openNow=1" + "&client_secret=" + client_secret + "&ll=" + latLon + "&v=" + version + "&intent=browse" + "&radius=" + userRadiusM + "&limit=2" + "&query=" + query
        getSearch(queryURL)
    }
}

$("#submitSearch").on("click", function () {
    venueIDs = []
    if (!$("#locationSearch").val()) {
        getCurrentLocation()
    } else if ($("#locationSearch").val()) {
        near = $("#locationSearch").val()
        userRadiusMi = $("#radiusSearch").val()
        userRadiusM = userRadiusMi / 0.00062137
        query = $("#query").val()

        var queryURL = "https://api.foursquare.com/v2/venues/search?client_id=" + client_id + "&openNow=1" + "&client_secret=" + client_secret + "&near=" + near + "&v=" + version + "&intent=browse" + "&radius=" + userRadiusM + "&limit=10" + "&query=" + query
        getSearch(queryURL)
    } else {
        console.log("Broken")
    }
})