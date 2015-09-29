var sketch2a = function(s){

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
	return 1.0;
}

s.draw = function() {
	s.clear();
	s.strokeWeight(1);
	s.stroke(200);
	s.noFill();
	s.rect(canvasTopLeft.x -shapeSize*.5, canvasTopLeft.y, shapeSize*2, shapeSize)
	for(var i = 0; i < 1; i+=(1.0/shapeSize) ){
		var val = expr(i);
		s.stroke((1.0-val)*255);
		s.fill((1.0-val)*255);
		s.ellipse(canvasTopLeft.x -shapeSize*.5 + i*shapeSize * 2, canvasTopLeft.y + shapeSize - shapeSize*s.random(1.0), 2, 2);
	}
	s.stroke(0);
	s.fill(0);
	for(var i = 0; i < 1; i+=(1.0/shapeSize) ){
		s.ellipse(canvasTopLeft.x -shapeSize*.5 + i*shapeSize * 2, canvasTopLeft.y + shapeSize - shapeSize*expr(i), 2, 2);
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
var sketchTwoA = new p5(sketch2a, 'sketch2a');