function loadData() {

    var $wikiElem = $('#wikipedia-links');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $('#map').text("");
    $('#wikipedia-links').text("");
    $('#nytimes-articles').text("");

    // Google Maps API
    //Pulls user input, converts to coordinates, and creates streetview map
    $streetName = $('#street').val().replaceAll(" ", "+");
    $cityName = $('#city').val();
    let address = $streetName + "+" + $cityName;
    
    let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKeys.googlemaps}`;
    
    $.getJSON(geocodeURL, (GeocoderResult, status) => {
            locationObj = GeocoderResult.results[0].geometry.location;
            renderMap(locationObj['lat'], locationObj['lng']);
    }).error(() => $('#map').append('<p>Error loading map</p>'));

    //NYT API
    $.getJSON(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${$cityName}&api-key=${apiKeys.nytimes}`, (data) => {
        let results = data.response.docs;
        results.forEach((obj) => {
            let ul = $('#nytimes-articles');
            let headline = obj.headline.main;
            let byline = obj.byline.original;
            let firstLine = obj.lead_paragraph;
            let linkAddr = obj.web_url;
            let thumbnail = obj.multimedia.filter((i) => {
                return i.subtype === 'xlarge'
            });
            renderArticle(ul, headline, byline, firstLine, linkAddr, thumbnail);
        });


    }).error(() => $('#nytimes-articles').replaceWith("<p> Articles could not load</p>"));

    return false;
};

$('#form-container').submit(loadData);

//Adds iframe with map data
function renderMap(lat, long) {
    $('#map').append(`<iframe width="450" height="250" frameborder="0" style="border:0" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/streetview?key=${apiKeys.googlemaps}&location=${lat}, ${long}" allowfullscreen></iframe>`);
}

//Adds list items to NYT container
function renderArticle(element, headline, byline, summary, linkAddr, thumbnail) {
    let li = document.createElement("li");
    li.setAttribute("class", "article");

    li.innerHTML = 
        `<a href="${linkAddr}" target="_blank" rel="noopener noreferrer">
        <img src="https://static01.nyt.com/${thumbnail[0].url}" class="thumbnail" alt="NYT doesn't add alt text to their images." />
        <div class="article-text">
        <h4>${headline}</h4>
        <h5>${byline}</h5>
        <p>${summary}..</p>
        </div></a>`;

    element.append(li);
}

function renderWikiLinks(element, title, linkAddr) {
    let li = document.createElement('li');
}

//getJSON function
async function getJSON(url, dataProcessing) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const jsonResponse = await response.json();
            dataProcessing(jsonResponse);
            return;
        }
        throw new Error('ERROR')
    } catch(error) {console.log(error);}
}

//API Response Processing functions
function handleGoogleMaps(data) {
    let latitude = data.results[0].geometry.location.lat;
    let longitude = data.results[0].geometry.location.lng;

    $('#map').append(`<iframe width="450" height="250" frameborder="0" style="border:0" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/streetview?key=${apiKeys.googlemaps}&location=${latitude}, ${longitude}" allowfullscreen></iframe>`);
}

function handleNYTimes(data) {
    
}

function handleWiki(data) {

}

const googleURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKeys.googlemaps}`;
const nytimesURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${$cityName}&api-key=${apiKeys.nytimes}`;
const wikiURL = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${$cityName}`;