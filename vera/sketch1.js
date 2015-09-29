var sketch1 = function(s){

var squareSpacing = 40;
var horizontalDeviationRange = .3;
var verticalDeviationRange = .3;
var shapeSize = 300;
var square;
var canvasTopLeft;

s.setup = function() {
	var canvas = s.createCanvas(s.windowWidth, s.windowHeight * .5);
	centerPiece();
	s.noLoop();
}
function centerPiece(){
	if(s.windowWidth > s.windowHeight)
		shapeSize = s.windowHeight * .5 * .66;
	if(s.windowHeight > s.windowWidth)
		shapeSize = s.windowWidth * .66;
	canvasTopLeft = {x:(s.windowWidth*.5 - shapeSize *.5), y:(s.windowHeight*.25 - shapeSize *.5)};
}

// almost your standard rectangle drawing function: (x, y, width, height)
// but contains 2 extra arguments which specify the percent of the width/height that 
// the x and y locations of each of the 4 corners gets distorted 

// X_PERTURB and Y_PERTURB are a function of the percentage of the width and height
//   .5 will displace them by a random amount that is no larger than half the width
function perturbedRect(x, y, width, height, X_PERTURB, Y_PERTURB){

	var topLeft = {x:(x + s.random(width*X_PERTURB) - (width*X_PERTURB*.5)), 
	               y:(y + s.random(height*Y_PERTURB) - (height*Y_PERTURB*.5))};
	var topRight = {x:(x + width + s.random(width*X_PERTURB) - (width*X_PERTURB*.5)), 
	                y:(y + s.random(height*Y_PERTURB) - (height*Y_PERTURB*.5))};
	var bottomRight = {x:(x + width + s.random(width*X_PERTURB) - (width*X_PERTURB*.5)),
	                   y:(y + height + s.random(height*Y_PERTURB) - (height*Y_PERTURB*.5))};
	var bottomLeft = {x:(x + s.random(width*X_PERTURB) - (width*X_PERTURB*.5)),
	                  y:(y + height + s.random(height*Y_PERTURB) - (height*Y_PERTURB*.5))};

	s.line(topLeft.x, topLeft.y, topRight.x, topRight.y);
	s.line(topRight.x, topRight.y, bottomRight.x, bottomRight.y);
	s.line(bottomRight.x, bottomRight.y, bottomLeft.x, bottomLeft.y);
	s.line(bottomLeft.x, bottomLeft.y, topLeft.x, topLeft.y);
}

s.draw = function() {
	s.clear();
	s.stroke(225);
	s.strokeWeight(5);
	s.rect(canvasTopLeft.x, canvasTopLeft.y, shapeSize, shapeSize);

	s.stroke(0);
	s.strokeWeight(1.5);
	perturbedRect(canvasTopLeft.x, canvasTopLeft.y, shapeSize, shapeSize, horizontalDeviationRange, verticalDeviationRange);
}

s.mousePressed = function() {
	if(s.mouseY > 0 && s.mouseY < s.windowHeight * .5)
		s.draw();
}
s.windowResized = function() {
	s.resizeCanvas(s.windowWidth, s.windowHeight*.5);
	centerPiece();
	s.draw();
}

}
var sketchOne = new p5(sketch1, 'sketch1');