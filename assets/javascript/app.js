// foursquare 
// client_id = HU31LS5FUBEXJMWI5FTBJFRGKDPGDGGJBSMV2A14CEP5YOO0
// client_secret = OYOQDBMT2Q50B3HQNQXO0KXNMV2GR25DF05HUCWFFX3JEO2Y

// zomatoAPI = "71908c4a0942db243aa61de4a0bff5f2";

//foursquare api 
var radius = "1000"
var section = "food"
var cityState = "Willoughby,OH"
var fs_id = "HU31LS5FUBEXJMWI5FTBJFRGKDPGDGGJBSMV2A14CEP5YOO0"
var fs_secret = "OYOQDBMT2Q50B3HQNQXO0KXNMV2GR25DF05HUCWFFX3JEO2Y"
var v = "20180918"
var queryURL = "https://api.foursquare.com/v2/venues/explore?client_id=" + fs_id + "&client_secret=" + fs_secret + "&near=" + cityState + "&limit=10&section=" + section +"&radius=" + radius + "&v=" + v;

$("#btn").on("click", function(){
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    var results = response.response.groups
    console.log(results)
})
})