var vera4_closeup = function(s){

var COLUMNS = 3;
var ROWS = 1;
var SPACING = 350;
var SIDE = 250;

var TL;
var PERTURB, FREQUENCY;
var SLIDER_W = 130;
s.setup = function() {
	var canvas = s.createCanvas(s.windowWidth, s.windowHeight);
	TL = {x:(s.windowWidth*.5-COLUMNS*.5*SPACING + 50), y:(s.windowHeight*.5-ROWS*.5*SPACING)};
	PERTURB = 6;
	FREQUENCY = s.createSlider(3, 40, 12);
	FREQUENCY.position(s.windowWidth*.5 - SLIDER_W*.5, canvas.position().y + 10);
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
				perturbedRect( TL.x + (SIDE*.5) + c * SPACING-(width*.5), TL.y + (SIDE*.5) + r*SPACING-(width*.5), width, width, PERTURB/100.0, PERTURB/100.0);
				if(c == 0)
					width -= s.random(FREQUENCY.value()) + 1;
				if(c == 1)
					width -= s.random(2 * FREQUENCY.value()) + 1;
				if(c == 2)
					width -= s.random(.5 * FREQUENCY.value()) + 1;
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
var fourB = new p5(vera4_closeup, 'vera4_closeup');