var vera4 = function(s){

var COLUMNS = 12;
var ROWS = 12;
var SPACING = 42;
var SIDE = 40;
// var PERTURB = .15;

var TL;
var PERTURB, FREQUENCY;
var SLIDER_W = 130;
s.setup = function() {
	var canvas = s.createCanvas(s.windowWidth, s.windowHeight);
	TL = {x:(s.windowWidth*.5-COLUMNS*.5*SPACING), y:(s.windowHeight*.5-ROWS*.5*SPACING)};
	PERTURB = s.createSlider(0, 100, 15);
	PERTURB.position(s.windowWidth*.5 - SLIDER_W - 10, canvas.position().y + 10);
	FREQUENCY = s.createSlider(3, 40, 12);
	FREQUENCY.position(s.windowWidth*.5 + 10, canvas.position().y + 10);
	s.noLoop();
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
	for(var c = 0; c < COLUMNS; c++){
		for(var r = 0; r < ROWS; r++){
			var width = SIDE;
			while(width > 0){
				perturbedRect( TL.x + (SIDE*.5) + c * SPACING-(width*.5), TL.y + (SIDE*.5) + r*SPACING-(width*.5), width, width, PERTURB.value()/100.0, PERTURB.value()/100.0);
				width -= s.random(FREQUENCY.value()) + 1;
			}
		}
	}
}

s.mousePressed = function(){
	if(s.mouseY > 0 && s.mouseY < s.windowHeight)
		s.draw();
}

s.mouseDragged = function(){
	if(s.mouseY > 0 && s.mouseY < s.windowHeight)
		s.draw();
}

} 
var four = new p5(vera4, 'vera4');