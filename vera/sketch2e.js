var sketch2e = function(s){

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
	return s.pow(f,2);
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
var sketchTwoE = new p5(sketch2e, 'sketch2e');