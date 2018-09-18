//Miles to Meters
$(document).on("click", "#submitExplore", function () {

    var userRadiusMi = $("#radiusExplore").val()

    var userRadiusM = userRadiusMi / 0.00062137

    console.log(userRadiusM)


    //Get current location (default if leaving location blank)
    if (!$("#locationExplore").val()) {
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                alert("Geolocation is not supported by this browser.")
            }
        }
        getLocation()
        function showPosition(position) {
            console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude)
        }
    }
})