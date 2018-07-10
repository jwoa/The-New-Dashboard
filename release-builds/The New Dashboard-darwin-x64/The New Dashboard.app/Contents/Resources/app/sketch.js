// When user draws, send position to network
// When we recieve a position, draw it on screen

var osc = require('node-osc');
var remote = require('electron').remote;
var fs = require('fs');

var client = new osc.Client('127.0.0.1', 3333);
var oscServer = new osc.Server(3333, '0.0.0.0');

var x = undefined;
var y = undefined;

var r, g, b;

var col = 100;
var c = 80;
var d = 100;

oscServer.on("message", function (msg, rinfo) {
    // runs whenever we get a message from the network
    console.log(msg);

    if(msg[0] == "/brush-x") {
        x = msg[1];
        if(y != undefined) {
            ellipse(x, y, 10);
            x = undefined;
            y = undefined;
        }
    } else if(msg[0] == "/brush-y") {
        y = msg[1];
        if(x != undefined) {
            ellipse(x, y, 10);
            x = undefined;
            y = undefined;
        }
    }

});

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Pick colors randomly
    r = random(255);
    g = random(255);
    b = random(255);
    strokeWeight(5);
    stroke(r, g, b);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseDragged() {
    // User drew something
    // send position to network here
    client.send('/brush-x', mouseX);
    client.send('/brush-y', mouseY);

    line(mouseX, mouseY, pmouseX, pmouseY);
    return false;
}

function draw() {
    col,c,d = mouseX/1;
    background (col,c,d, 3);
}

function keyPressed (){
  // lower case and upper case s
  // saveCanvas(canvas, 'out','png');
  if(keyCode === 83 || keyCode === 16){
    remote.getCurrentWindow().capturePage(img => fs.writeFileSync("song2.png", img.toPng()));
  // Assign colors to brush strokes
    } else if (keyCode === 82) {
        //red (r)
        stroke(255, 0, 0);
    } else if (keyCode === 71) {
        //green (g)
        stroke(0, 255, 0);
    } else if (keyCode === 66) {
        //blue (b)
        stroke(0, 0, 255);
    } else if (keyCode === 80) {
        //purple (p)
        stroke(153, 51, 255);
    } else if (keyCode === 89) {
        //yellow (y)
        stroke(255, 255, 51);
    } else if (keyCode === 79) {
        //orange (o)
        stroke(255, 153, 51);
    } else if (keyCode === 73) {
        //pink (i)
        stroke(255, 204, 229);
    }
}
