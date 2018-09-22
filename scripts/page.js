var zoomLevel = 10;                     // The default zoom level for OpenMapQuest static map search
                                        // a 400px image covers ~25 miles

function getMap(locations)
{   // Request a static map for the area from OpenMapQuest

    if (typeof locations != "object")
    {   alert ("getMap() invalid parameter\n" + typeof locations);
        return false;
    }

    var OpenMQKey = "4DAFdAxvqtX0oTrlvDv5Z1sKAvOVd2Rt";
    
    // Build the search URL

    // Start with the URL and API key
    var URL = "https://open.mapquestapi.com/staticmap/v5/map?key=" + OpenMQKey;

    // The first element of locations[] is the center of the map
    URL = URL + "&center=" + locations[0][0] + "," + locations[0][1];

    // Add points of interest
    var lLength = locations.length;

    if (lLength > 1)
    {   // the rest of the elements in the array are latitude and longitude for markers
        
        // select the marker style and begin the locations parameter
        URL = URL + "&defaultMarker=marker-num&locations="

        for (var i=1; i<lLength; i++)
        {   URL = URL + locations[i][0] + "," + locations[i][1];

            // double pipe "||" to separate the coordinates of multiple markers
            if ((i + 1) < lLength)
                URL = URL + "||";
        }
    }

    // complete the seach query with images type (satellite), zoom level and image size
    URL = URL + "&type=sat&zoom=" + zoomLevel + "&size=400,300";

    $.get(URL)
    .then (function ()
    {
        $("#map").attr("src", this.url);
    })
    .catch (function()
    {   // the search request falied
        alert (URL);
        return false;
    });

    return true;
}

$(document).ready(function()
{   //
    //

    // get default map -- Case Western Reserve University
    var loc8s  = [];
    var loc8 = [41.3451, -81.5285];
    loc8s.push (loc8);
    var loc8 = [41.3551, -81.5085];
    loc8s.push (loc8);
    var loc8 = [41.3551, -81.5185];
    loc8s.push (loc8);
    var loc8 = [41.3551, -81.5285];
    loc8s.push (loc8);
    var loc8 = [41.3551, -81.5385];
    loc8s.push (loc8);
    var loc8 = [41.3551, -81.5485];
    loc8s.push (loc8);
    getMap (loc8s);
        
    $(".radio-input").on("change", function()
    {   // event handler for the range radio button

        var range = $(this).attr("value");

        zoomLevel = 10;                      // 400px images covers ~ 25 miles 
        if (range == 10) zoomLevel = 11;     // 400px images covers ~ 12 miles
        if (range == 5) zoomLevel = 12       // 400px images covers ~ 6 miles

        alert ("zoom level: " + zoomLevel);
        getMap (loc8s);
    });

    $("#location-button").on("click", function(event)
    {   event.preventDefault();

        // Get data from the form and...
        // - retrieve a map from MapQuest
        // - get data from 

        // getMap() takes 1 parameter -- an array.  This array can have an arbitrary number of elements,
        // but must have at least one.
        //
        // The first element in the array represents the center of the map.  It can be either latituse
        // and longitude or strings with city name and state.
        //
        // The remaining elements represent multiple points of interest.  These must be latitde and
        // longitude.
    });
})