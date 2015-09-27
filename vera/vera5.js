var vera5 = function(s){

var SPACING = 70;
var SIDE = SPACING - 6;
var MARGIN = SPACING - SIDE;
var COLUMNS = 7;
var ROWS = 7;

var TL;
var DENSITY;
var FLOOR;
var SLIDER_W = 130;
s.setup = function() {
	var canvas = s.createCanvas(s.windowWidth, s.windowHeight);
	TL = {x:(s.windowWidth*.5-COLUMNS*.5*SPACING), y:(s.windowHeight*.5-ROWS*.5*SPACING)};
	s.strokeWeight(1.5);
	FLOOR = s.createSlider(3, 18, 5);
	FLOOR.position(s.windowWidth*.5 - SLIDER_W-10, canvas.position().y + 10);
	DENSITY = s.createSlider(3, 18, 11);
	DENSITY.position(s.windowWidth*.5 + 10, canvas.position().y + 10);
	s.noLoop();
}

function rectWithVerticalCurve(x, y, width, height, slices){
	for(var i = 0; i < slices; i++){
		if(i%2){
			s.line(x + (width*(i/(slices-1))), y, x + (width*(i/(slices-1))), y + height);
			if(i != slices-1)
				s.line(x + (width*(i/(slices-1))), y + height, x + (width*((i+1)/(slices-1))), y + height);
		}
		else{
			s.line(x + (width*(i/(slices-1))), y+height, x + (width*(i/(slices-1))) , y );
			if(i != slices-1)
				s.line(x + (height*(i/(slices-1))), y, x + (height*((i+1)/(slices-1))), y );
		}
	}
}

function rectWithHorizontalCurve(x, y, width, height, slices){
	for(var i = 0; i < slices; i++){
		if(i%2){
			s.line(x, y + (height*(i/(slices-1))), x + width, y + (height*(i/(slices-1))) );
			if(i != slices-1)
				s.line(x, y + (height*(i/(slices-1))), x, y + (height*((i+1)/(slices-1))));
		}
		else{
			s.line(x, y + (height*(i/(slices-1))), x + width, y + (height*(i/(slices-1))) );
			if(i != slices-1)
				s.line(x + width, y + (height*(i/(slices-1))), x + width, y + (height*((i+1)/(slices-1))));
		}
	}
}

function getARandomNumber(){
	var f = FLOOR.value();
	var d = DENSITY.value();
	var n;
	if(f < d){
		n = s.floor(s.random( d - f ) + f );
	}
	else{
		n = s.floor(DENSITY.value());
	}
	if(n%2 == 0)
		n--;
	if(n == 1)
		n == 3;
	return n;
}

s.draw = function() {
	s.clear();
	for(var c = 0; c < COLUMNS; c++){
		for(var r = 0; r < ROWS; r++){
			var i = c+r;
			if(i%2){
				var x = TL.x + c*SPACING;
				var y = TL.y + r*SPACING;
				rectWithVerticalCurve(x, y, SIDE, SIDE, getARandomNumber());
				if(c == 0)
					s.line(x, y+SIDE,  x, y + SIDE + MARGIN);
				if(c == COLUMNS-1)
					s.line( x + (SIDE), y ,  x + (SIDE), y + MARGIN);
				else
					s.line( x + (SIDE), y ,  x + (SIDE) + MARGIN, y);
			}
			else{
				var x = TL.x + c*SPACING;
				var y = TL.y + r*SPACING;
				rectWithHorizontalCurve(x, y, SIDE, SIDE, getARandomNumber());
				// if(c == 0)
				// 	s.line(x, y, x, y - MARGIN);
				if(c == COLUMNS-1)
					s.line(x + SIDE, y + (SIDE), x + SIDE, y + (SIDE) + MARGIN);
				else
					s.line(x, y + (SIDE), x + SIDE + MARGIN, y + (SIDE) );

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
var five = new p5(vera5, 'vera5');