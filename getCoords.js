//https://stackoverflow.com/questions/2499567/how-to-make-a-json-call-to-a-url/2499647#2499647
function retrieveJSON(address) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",address,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function retrieveCoordinates(address) {
    var obj = JSON.parse(retrieveJSON(address));
    longitude = obj.results[0].geometry.location.lng;
    latitude = obj.results[0].geometry.location.lat;
    var coordinates = [latitude, longitude];
    return coordinates;
}

function encodeAddress(city, state) {
    address = "https://maps.googleapis.com/maps/api/geocode/json?components=";
    address = address + "locality:" + city + "&";
    address = address + "administrative_area_level_1:" + state;
    return address;
}

city = "Toronto";
state = "Ontario";

userAddress = encodeAddress(city, state) + "&key=AIzaSyCEp7beuCu9-5XxRZ0u7gcVSkIRui4n8oc";

//document.getElementById("test").innerHTML = userAddress;
document.getElementById("test").innerHTML = retrieveCoordinates(userAddress);