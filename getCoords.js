function addCoordinates(coords, address, radius) {
    singleCoordinate = retrieveCoordinates(address);
    if (typeof(singleCoordinate) == "object") {
        singleCoordinate.push(radius);
        coords.push(singleCoordinate);
    }
}

function retrieveCoordinates(address) {
    var obj = JSON.parse(retrieveJSON(address));
    var regions = ["locality", "sublocality", "postal_code", "country", "administrative_level_1", "administrative_level_2"];
    var cities = ["locality", "administrative_area_3"];
    if(obj.results.length == 0) {
        return;
    }
    for (var x in obj.results[0].types) {
        if (regions.includes(obj.results[0].types[x]) || cities.includes(obj.results[0].types[x])) {
            longitude = obj.results[0].geometry.location.lng;
            latitude = obj.results[0].geometry.location.lat;
            var coordinates = [longitude, latitude];
            return coordinates;
        }
    }
}

function encodeAddress(city, state) {
    address = "https://maps.googleapis.com/maps/api/geocode/json?components=";
    address = address + "locality:" + city + "|";
    address = address + "administrative_area_level_1:" + state;
    address = address + "&key=AIzaSyCEp7beuCu9-5XxRZ0u7gcVSkIRui4n8oc";
    return address;
}

//https://stackoverflow.com/questions/2499567/how-to-make-a-json-call-to-a-url/2499647#2499647
function retrieveJSON(address) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",address,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

//userAddress = encodeAddress(city, state);
//addCoordinates(coords, userAddress, 2);

city = "Mississauga";
state = "Ontario";
userAddress = encodeAddress(city, state) + "&key=AIzaSyCEp7beuCu9-5XxRZ0u7gcVSkIRui4n8oc";
addCoordinates(coords, userAddress, 2);

city = "Detroit";
state = "Michigan";
userAddress = encodeAddress(city, state) + "&key=AIzaSyCEp7beuCu9-5XxRZ0u7gcVSkIRui4n8oc";
addCoordinates(coords, userAddress, 2);

//printString = ""

// for (var i in coords) {
//     printString = printString + "["

//     for (var j in coords[i]) {
//         printString = printString + coords[i][j] + "|"
//     }

//     printString = printString + "]"
