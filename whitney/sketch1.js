var sketch1 = function(s){

var shapeSize;
var center;

s.setup = function() {
	var canvas = s.createCanvas(s.windowWidth, s.windowHeight);
	setupCanvas();
}
setupCanvas = function(){
	shapeSize = .5 * s.sqrt(s.pow(s.windowWidth,2) + s.pow(s.windowHeight,2));
	center = {x:s.windowWidth*.5, y:s.windowHeight*.5};
}
radiuses = [7,8,6,9,7,8,6,8,7,9,7,8,7,9,6];
s.draw = function() {
	s.clear();
	s.background(0);
	s.noStroke();
	var radius = 0;
	var offset = s.millis()/10000.0
	var angle = offset;
	var angle_increment = .2;
	var radius_increment = .1;
	var count = 1;
	s.colorMode(s.HSB, 255);
	s.fill(s.color((offset*4)%360, 255, 90));
	while(radius < shapeSize){
		// radius_increment = 3/(count*.3)+.1;
		// radius_increment = angle/500;
		radius = angle*(1.025 - .025*s.cos(s.millis()/40000.0));
		angle_increment = 20/(radius+1);
		var x = s.cos(angle);
		var y = s.sin(angle);
		s.ellipse(center.x + x*radius, center.y + y*radius, radiuses[count%15], radiuses[count%15]);
		angle += angle_increment;
		// radius += radius_increment;

		count++;
	}
}
s.mousePressed = function() {
	if(s.mouseY > 0 && s.mouseY < s.windowHeight)
		s.draw();
}
s.windowResized = function() {
	s.resizeCanvas(s.windowWidth, s.windowHeight);
	setupCanvas();
	s.draw();
}

}
var sketchOne = new p5(sketch1, 'sketch1');