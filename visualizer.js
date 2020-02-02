var paper
var MAX_RAD = 25; //circle max radius
var MIN_RAD = 7; //circle min radius
var SCALE = 100;
var WIDTH, HEIGHT;
var addyParts;
//document.getElementById("test").innerHTML = realCoords; //testing
//testing coordinates
//var coords = [[20.5,40,2], [40,78.47624,5], [67, 89, 7], [200, 100, 4], [567, 27, 5], [600, 300, 2], [40, 200, 1]]

//setting drawable canvas bounds
function setBounds(width, height) {
    paper = Raphael("map", width, height);
    
    document.getElementById("mapBox").style.height = height + "px";
    document.getElementById("mapBox").style.width = width + "px";
    //document.getElementById("test").innerHTML = [width, height]; //testing
}

//drawing a circle at x,y with radius rad
function circle(x, y, rad) {
    var circle = paper.circle(x, y, rad);
    circle.attr({"fill": "forestgreen", "stroke-width":0}); //styling
}

//drawing line from x1,y1 to x2,y2
function line(x1, y1, x2, y2) {
    var line = paper.path( ["M", x1, y1, "L", x2, y2 ] );
    line.attr({"stroke-width":10, "stroke":"forestgreen"}); //styling
}

//setting relative radii of circles from Max to see differences in duration
function radii(coords) {
    var max = 0;//longest duration
    for (var i=0; i<coords.length; i++) {
        //finding largest duration value
        if (coords[i][2] > max) {
            max = coords[i][2];
        }
    }
    //setting relativity
    for (var i=0; i<coords.length; i++) {
        //percent of biggest * maximum size
        coords[i][2] = coords[i][2] / max * MAX_RAD;
        if (coords[i][2] < MIN_RAD) {
            coords[i][2] = MIN_RAD; //minimum visible value
        }
    }
}

//reduce coordinate scaling until tangle fits into frame
function setScaling(coords) {
    var maxx = coords[0][0]*SCALE;
    var minx = coords[0][0]*SCALE;
    var maxy = coords[0][1]*SCALE;
    var miny = coords[0][1]*SCALE
    for(var i=0; i<coords.length; i++) {
        if (coords[i][0]*SCALE < minx)
            {minx = coords[i][0]*SCALE;}
        else if (coords[i][0]*SCALE > maxx)
            {maxx = coords[i][0]*SCALE;}
        if (coords[i][1]*SCALE < miny)
            {miny = coords[i][1]*SCALE;}
        else if (coords[i][1]*SCALE > maxy)
            {maxy = coords[i][1]*SCALE;}
    }
    var viewX = screen.width;
    var viewY = screen.height;
    if((maxx-minx) > viewX || (maxy-miny) > viewY) {
        if(SCALE <= 5)
            SCALE -= 1;
        else
            SCALE -= 5;
        setScaling(coords);
    }
}

//converting lat long to usable coords
function geoCoordstoUsable(coords) {
    setScaling(coords);//set scaling
    for(var i = 0; i<coords.length; i++){
        coords[i][0] = (coords[i][0]+180)*SCALE;
        coords[i][1] += (90-coords[i][1])*SCALE;
    } //document.getElementById("test").innerHTML = coords; //testing
}

//converts coordinates to relative coordinates
function relativeCoords(coords) {
    var minx = coords[0][0];
    var maxx = coords[0][0];
    var miny = coords[0][1];
    var maxy = coords[0][1];
    //finding minimum and maximum coordinate values
    for (var i = 0; i<coords.length; i++){
        if (coords[i][0] < minx)
            {minx = coords[i][0];}
        else if (coords[i][0] > maxx)
            {maxx = coords[i][0];}
        if (coords[i][1] < miny)
            {miny = coords[i][1];}
        else if (coords[i][1] > maxy)
            {maxy = coords[i][1];}
    } 
    maxx = 0;
    maxy = 0;
    //changing coordinates  to minimum relatvie positions
    for (var i = 0; i<coords.length; i++){
        coords[i][0] = coords[i][0] - minx + MAX_RAD;
        coords[i][1] = coords[i][1] - miny + MAX_RAD;
        if(coords[i][0] > maxx)
            {maxx = coords[i][0]+25;}
        if(coords[i][1] > maxy)
            {maxy = coords[i][1]+50;}
    } 
    //creating relative drawable frame
    HEIGHT = maxy;
    WIDTH = maxx;
    setBounds(WIDTH, HEIGHT);
}

//full tangle builder and visualizer
function buildTangle(coords) {
    geoCoordstoUsable(coords);
    //setting relative radii
    relativeCoords(coords);
    radii(coords);
    //document.getElementById("test").innerHTML = coords; //testing   
    for (var i=0; i<coords.length; i++) {
        //building circles
        circle(coords[i][0], coords[i][1], coords[i][2]);
        if (i > 0) {
            //building lines
            line(coords[i-1][0], coords[i-1][1], coords[i][0], coords[i][1]);
        }
    }
}


//==========TESTING==========
setBounds(400, 800);
//circle(coords[0][0], coords[0][1], 15);
//circle(coords[1][0], coords[1][1], 15);
//circle(coords[2][0], coords[2][1], 15);
//line(50, 50, 100, 100);

document.getElementById("test").innerHTML = coords; //testing
buildTangle(coords);
drawGoogleMap(getGoogleMap(realCoords));