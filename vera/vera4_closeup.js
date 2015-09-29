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
	FREQUENCY = s.createSlider(3, 80, 40);
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

function expr(f){
	return (s.cos(f*s.PI*2-s.PI)+1)/2;
}

s.draw = function() {
	s.clear();
	var c;
	// console.log(FREQUENCY.value());
	c = 0;
	var width = SIDE;
	while(width > 0){
		perturbedRect( TL.x + (SIDE*.5) + c * SPACING-(width*.5), TL.y + (SIDE*.5) - (width*.5), width, width, PERTURB/100.0, PERTURB/100.0);
		width -= s.random(FREQUENCY.value()) + 1;
	}
	c = 1;
	var width = SIDE;
	while(width > 0){
		perturbedRect( TL.x + (SIDE*.5) + c * SPACING-(width*.5), TL.y + (SIDE*.5) - (width*.5), width, width, PERTURB/100.0, PERTURB/100.0);
		width -= s.random( (FREQUENCY.value()/80) * SIDE ) + 1;
	}
	c = 2;
	var width = SIDE;
	while(width > 0){
		perturbedRect( TL.x + (SIDE*.5) + c * SPACING-(width*.5), TL.y + (SIDE*.5) - (width*.5), width, width, PERTURB/100.0, PERTURB/100.0);
		if(s.random(10) < 1){
			var count = 0;
			while(width > 0 && count < s.random(6)+2){
				perturbedRect( TL.x + (SIDE*.5) + c * SPACING-(width*.5), TL.y + (SIDE*.5) - (width*.5), width, width, PERTURB/100.0, PERTURB/100.0);
				width -= s.random(FREQUENCY.value()/10) + 1;
				count++;
			}
		}
		width -= s.random(FREQUENCY.value()) + 1;
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