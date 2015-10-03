var sketch3 = function(s){

var shapeSize = 500;
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

function expr(f){
	return 1/((f)*100+2.5) + 0 + 1/(6.2+5*s.cos(f*s.PI*2.2)) - .1/s.acos(f) + s.pow(f,2);
	// return 1/((f)*100+2.5) + 0 + .33*s.pow(s.sin(f*s.PI*1.9),2) + .5*s.pow(f,5);
}

s.draw = function() {
	s.clear();
	s.strokeWeight(1);
	s.stroke(200);
	s.noFill();
	s.rect(canvasTopLeft.x -shapeSize*.5, canvasTopLeft.y, shapeSize*2, shapeSize)
	s.stroke(0);
	s.fill(0);
	for(var i = 0; i < 1; i+=(1.0/shapeSize) ){
		var val = expr(i);
		s.stroke(0, val*255);
		s.fill(0, val*255);
		// if(s.random(1.0) > val)
			s.ellipse(canvasTopLeft.x -shapeSize*.5 + i*shapeSize * 2, canvasTopLeft.y + shapeSize - shapeSize*s.random(1.0), 2, 2);
	}
	s.stroke(0);
	s.fill(0);
	s.strokeWeight(3);
	var lastPoint = {x:(canvasTopLeft.x -shapeSize*.5 + 0*shapeSize * 2), y:(canvasTopLeft.y + shapeSize - shapeSize*expr(0))};
	for(var i = 0; i < 1; i+=(1.0/shapeSize) ){
		s.line(lastPoint.x, lastPoint.y, canvasTopLeft.x -shapeSize*.5 + i*shapeSize * 2, canvasTopLeft.y + shapeSize - shapeSize*expr(i));
		lastPoint = {x:(canvasTopLeft.x -shapeSize*.5 + i*shapeSize * 2), y:(canvasTopLeft.y + shapeSize - shapeSize*expr(i))};
		// s.ellipse(canvasTopLeft.x -shapeSize*.5 + i*shapeSize * 2, canvasTopLeft.y + shapeSize - shapeSize*expr(i), 2, 2);
	}
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
var sketchThree = new p5(sketch3, 'sketch3');