var vera2 = function(s){

var MARGIN = 30;
var LENGTH = 35;
// var SLOPE = 2;

var SLOPE_SLIDER;
var SLIDER_W = 130;
s.setup = function() {
	// uncomment this line to make the canvas the full size of the window
	var canvas = s.createCanvas(s.windowWidth, s.windowHeight);
	SLOPE_SLIDER = s.createSlider(7, 40, 20);
	SLOPE_SLIDER.position(s.windowWidth*.5 - SLIDER_W*.5, canvas.position().y + 10);
	s.noLoop();
	// frameRate(10);
}

s.draw = function() {
	s.clear();
	var SLOPE = SLOPE_SLIDER.value() / 10.0;
	var pen = {x:(0), y:(0)};
	var nextPen = {x:(0), y:(0)};
	var localOrigin = {x:(MARGIN), y:(MARGIN * 3)};
	var backForth = 0;
	while(localOrigin.y < s.windowHeight - MARGIN){

		pen.x = localOrigin.x;
		pen.y = localOrigin.y;

		while(localOrigin.x < s.windowWidth-MARGIN){
		// for(var i = 0; i < 50; i++){
			var length, slope;
			if(!backForth)
				slope = SLOPE - s.random(0,18)/20.0;
			else
				slope = SLOPE + s.random(0,10)/20.0;
			var angle = s.atan(slope);
			length = s.random(LENGTH) + 5;
			
			if( (localOrigin.y - pen.y) > 10){
				if(backForth)
					length *= 2;
				else
					length *= .5;
			}
			if( (localOrigin.y - pen.y) < -10){
				if(!backForth)
					length *= 2;
				else
					length *= .5;
			}


			var xChange, yChange;
			if(!backForth)
				xChange = s.cos(angle) * length;
			else
				xChange = - s.cos(angle) * length;
	
			if(!backForth)
				yChange = - s.sin(angle) * length * .5;
			else
				yChange = s.sin(angle) * length * .5;

			// if(pen.y + yChange > localOrigin.y + 50) yChange = localOrigin.y + 50 - pen.y;

			nextPen.x = pen.x + xChange;
			nextPen.y = pen.y + yChange;

			s.line(pen.x, pen.y, nextPen.x, nextPen.y);
	
			pen.x = nextPen.x;
			pen.y = nextPen.y;
			backForth = !backForth;
			localOrigin.x += xChange;
		}
		localOrigin.x = MARGIN;
		localOrigin.y += 60;
	}
  // draw stuff here
  // ellipse(width/2, height/2, 50, 50);
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
var two = new p5(vera2, 'vera2');
