function loadData() {

    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // Google Maps API
    //Pulls user input, converts to coordinates, and creates streetview map
    $streetName = $('#street').val().replaceAll(" ", "+");
    $cityName = $('#city').val();
    let address = $streetName + "+" + $cityName;
    let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKeys.googlemaps}`;
    
    $.getJSON(geocodeURL, (GeocoderResult, status) => {
            locationObj = GeocoderResult.results[0].geometry.location;
            renderMap(locationObj['lat'], locationObj['lng']);
    })


    $.getJSON(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${$cityName}&api-key=${apiKeys.nytimes}`, (data) => {
        console.log(data);

    });
    return false;
};

$('#form-container').submit(loadData);

//Adds iframe with map data
function renderMap(lat, long) {
    $('#map').append(`<iframe width="450" height="250" frameborder="0" style="border:0" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/streetview?key=${apiKeys.googlemaps}&location=${lat}, ${long}" allowfullscreen></iframe>`);
}

// loadData();