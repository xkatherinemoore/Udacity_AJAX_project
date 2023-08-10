
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    //Pulls form values and converts to URL-encoded format
    var $streetName = $('#street').val().replaceAll(" ", "+");
    var $cityName = $('#city').val().replaceAll(" ", "+");
    $body.append('<img class="bgimage" src="http://maps.googleapis.com/maps/api/streetview?size=1200x600&location='+ $streetName + "+" + $cityName + '" />');

    console.log($streetName, $cityName);
    return false;
};

$('#form-container').submit(loadData);

// loadData();
