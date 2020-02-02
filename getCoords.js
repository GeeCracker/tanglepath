//Pushes the newest set of coordinates into a list of coordinates, called coords.
function addCoordinates(coords, address, radius) {
    singleCoordinate = retrieveCoordinates(address);
    //Only push the set of coordinates if they are an array.
    if (typeof(singleCoordinate) == "object") {
        singleCoordinate.push(radius);
        coords.push(singleCoordinate);
    }
}

//Retrieves and verifies the coordinates may be a match to what the user wants.
function retrieveCoordinates(address) {
    //Invokes the method that retrieves the JSON and parses it.
    var obj = JSON.parse(retrieveJSON(address));
    //Two lists that encompass the possible types of locations entered (i.e. city, state).
    var regions = ["locality", "sublocality", "postal_code", "country", "administrative_level_1", "administrative_level_2"];
    var cities = ["locality", "administrative_area_3"];
    //If the JSON retrieves has 0 results, exit the function.
    if(obj.results.length == 0) {
        return;
    }
    //Iterate through each of the types that the first result can be classified as, and verify that it
    //may either be a city or country.
    for (var x in obj.results[0].types) {
        if (regions.includes(obj.results[0].types[x]) || cities.includes(obj.results[0].types[x])) {
            //Organizes the location's corresponding coordinates into a list and returns it.
            longitude = obj.results[0].geometry.location.lng;
            latitude = obj.results[0].geometry.location.lat;
            var coordinates = [longitude, latitude];
            return coordinates;
        }
    }
}

//Encodes a web address into the correct formatting to retrieve its corresponding JSON.
function encodeAddress(city, state) {
    address = "https://maps.googleapis.com/maps/api/geocode/json?components=";
    address = address + "locality:" + city + "|";
    address = address + "administrative_area_level_1:" + state;
    //Adds the API key onto the end.
    address = address + "&key=AIzaSyCEp7beuCu9-5XxRZ0u7gcVSkIRui4n8oc";
    return address;
}

//Requests and receives a JSON.
//Source:
//  https://stackoverflow.com/questions/2499567/how-to-make-a-json-call-to-a-url/2499647#2499647
function retrieveJSON(address) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",address,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}


//==========TESTING==========
city = "Mississauga";
state = "Ontario";
addCoordinates(coords, encodeAddress(city, state), radius);

city = "Detroit";
state = "Michigan";
addCoordinates(coords, encodeAddress(city, state), 2);