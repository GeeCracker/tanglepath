var paper
var MAX_RAD = 25; //circle max radius
var MIN_RAD = 5; //circle min radius
//testing coordinates
var coords = [[20,20,2], [40,30,5], [67, 89, 7], [200, 100, 4], [567, 36, 5], [600, 300, 2], [40, 200, 1]]

//setting drawable canvas bounds
function setBounds(height, width) {
    paper = Raphael("map", width, height);
}

//drawing a circle at x,y with radius rad
function circle(x, y, rad) {
    var circle = paper.circle(x, y, rad);
    circle.attr({"fill": "blue", "stroke-width":0}); //styling
}

//drawing line from x1,y1 to x2,y2
function line(x1, y1, x2, y2) {
    var line = paper.path( ["M", x1, y1, "L", x2, y2 ] );
    line.attr({"stroke-width":10, "stroke":"blue"}); //styling
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
        document.getElementById("test").innerHTML = coords; //testing
    }
}

//full tangle builder and visualizer
function buildTangle(coords) {
    //setting relative radii
    radii(coords);
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

buildTangle(coords);
