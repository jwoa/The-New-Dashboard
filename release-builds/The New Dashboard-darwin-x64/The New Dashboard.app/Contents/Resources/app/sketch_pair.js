var socket;
var myColor;

var col = 100;
var c = 80;
var d = 100;

// var col = random(255);
// var c = random(255);
// var d = random(255);

 function setup() {
    socket = io();
    myColor = { r:random(255), g:random(255), b:random(255) }

    socket.on('brush', function(brushData) {
        stroke(brushData.color.r, brushData.color.g, brushData.color.b);
        line(brushData.x, brushData.y, brushData.px, brushData.py);
    });

 	createCanvas(displayWidth, displayHeight);
	strokeWeight(10);
	stroke(0);
}

function mouseDragged() {
    stroke(myColor.r, myColor.g, myColor.b);
	line(mouseX, mouseY, pmouseX, pmouseY);
    socket.emit('brush', {x:mouseX,
                          y:mouseY,
                          px:pmouseX,
                          py:pmouseY,
                          color:myColor});
	return false;
}
 function draw() {
    col,c,d = mouseX/3;
    background (col,c,d, 2);
 }
