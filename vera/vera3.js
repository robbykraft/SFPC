var vera3 = function(s){

var DIFFERENCE = 10;
var CENTER;
var SIDE_LENGTH;
// var DEVIATION_Y = 130;
// var DEVIATION_X = 0;
var DEVIATION_X, DEVIATION_Y;
var SLIDER_W = 130;
s.setup = function() {
	var canvas = s.createCanvas(s.windowWidth, s.windowHeight);
	CENTER = {x:(s.windowWidth*.5), y:(s.windowHeight*.5)};
	if(s.windowHeight > s.windowWidth)
		SIDE_LENGTH = s.windowWidth * .66;
	else 
		SIDE_LENGTH = s.windowHeight * .66;
	DEVIATION_X = s.createSlider(0, 200, 1);
	DEVIATION_X.position(s.windowWidth*.5 - SLIDER_W - 10, canvas.position().y + 10);
	DEVIATION_Y = s.createSlider(0, 200, 130);
	DEVIATION_Y.position(s.windowWidth*.5 + 10, canvas.position().y + 10);
	s.noLoop();
}

s.draw = function() {
	s.clear();
	s.stroke(0);
	s.strokeWeight(1.5);
	s.noFill();

	var sl = SIDE_LENGTH;
	while(sl > DIFFERENCE * 3){
		s.rect(CENTER.x - sl*.5 + (s.random(DEVIATION_X.value())-(DEVIATION_X.value()*.5)), CENTER.y - sl*.5 + (s.random(DEVIATION_Y.value())-(DEVIATION_Y.value()*.5)), sl, sl);
		sl = sl - DIFFERENCE;
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
var three = new p5(vera3, 'vera3');