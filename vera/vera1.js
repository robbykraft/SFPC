var vera1 = function(s){

var numRows = 12;
var numColumns = 12;
// var shapeSize = 26;
var squareSpacing = 40;

var canvasTopLeft, horizontalDeviationRange, verticalDeviationRange, shapeSize, square;
var SLIDER_W = 130;
s.setup = function() {
	var canvas = s.createCanvas(s.windowWidth, s.windowHeight);
	horizontalDeviationRange = s.createSlider(0, 100, 7);
	horizontalDeviationRange.position(s.windowWidth*.5 - SLIDER_W*1.5 - 20, canvas.position().y + 10);
	verticalDeviationRange = s.createSlider(0, 100, 1);
	verticalDeviationRange.position(s.windowWidth*.5 - SLIDER_W*.5, canvas.position().y + 10);
	// squareSpacing = s.createSlider(10, 100, 40);
	// squareSpacing.position(s.windowWidth*.5 + SLIDER_W * .5 + 20, canvas.position().y + 10);
	shapeSize = s.createSlider(4, 100, 26);
	shapeSize.position(s.windowWidth*.5 + SLIDER_W * .5 + 20, canvas.position().y + 10);
	centerPiece();
	s.noLoop();
}
function centerPiece(){
	canvasTopLeft = {x:(s.windowWidth*.5-numColumns*.5*squareSpacing + shapeSize.value() *.5), y:(s.windowHeight*.5-numRows*.5*squareSpacing  + shapeSize.value() *.5)};
}

function rH(){
	return s.random(horizontalDeviationRange.value()) - horizontalDeviationRange.value()*.5;
}
function rV(){
	return s.random(verticalDeviationRange.value()) - verticalDeviationRange.value()*.5;
}

// almost your standard rectangle drawing function: (x, y, width, height)
// but contains 2 extra arguments which specify the percent of the width/height that 
// the x and y locations of each of the 4 corners gets distorted 
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
	s.strokeWeight(1.5);
	for(var w = 0; w < numColumns; w++){
		for(var h = 0; h < numRows; h++){
			var localOrigin = {x:(canvasTopLeft.x+w*squareSpacing ), y:(canvasTopLeft.y+h*squareSpacing )};
			perturbedRect(localOrigin.x- shapeSize.value() *.5, localOrigin.y- shapeSize.value() *.5, shapeSize.value(), shapeSize.value(), horizontalDeviationRange.value()/50, verticalDeviationRange.value()/50);
		}
	}
}
s.mouseDragged = function(){
	if(s.mouseY > 0 && s.mouseY < s.windowHeight){
		centerPiece();
		s.draw();
	}
}
s.mousePressed = function() {
	if(s.mouseY > 0 && s.mouseY < s.windowHeight)
		s.draw();
}
s.windowResized = function() {
	s.resizeCanvas(s.windowWidth, s.windowHeight);
	centerPiece();
	s.draw();
}

}
var one = new p5(vera1, 'vera1');