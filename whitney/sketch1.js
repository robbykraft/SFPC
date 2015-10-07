var sketch1 = function(s){

var shapeSize;
var center;

s.setup = function() {
	var canvas = s.createCanvas(s.windowWidth, s.windowHeight);
	// if(s.windowWidth > s.windowHeight)
	// 	shapeSize = s.windowHeight * .45;
	// if(s.windowHeight > s.windowWidth)
	// 	shapeSize = s.windowWidth * .45;
	setupCanvas();
	// s.noLoop();
}
setupCanvas = function(){
	shapeSize = .5 * s.sqrt(s.pow(s.windowWidth,2) + s.pow(s.windowHeight,2));
	center = {x:s.windowWidth*.5, y:s.windowHeight*.5};

	// // image 1
	// var img1 = createImage(s.windowWidth, s.windowWidth);
	// img1.loadPixels();
	// for (i = 0; i < img1.width; i++) {
	//   for (j = 0; j < img1.height; j++) {
	//     img1.set(i, j, color(0, 90, 102));
	//   }
	// }
	// img1.updatePixels();
	// image(img1, 17, 17);
}
radiuses = [5,8,6,7,5,4,6,7,5,7,8,8,6,8,9];
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
	while(radius < shapeSize){
		s.fill(s.color((radius*.4)%360, 206, 125));
		// radius_increment = 3/(count*.3)+.1;
		// radius_increment = angle/500;
		radius = angle*(1.025 - .025*s.cos(s.millis()/10000.0));
		angle_increment = 20/(radius+1);
		var x = s.cos(angle);
		var y = s.sin(angle);
		s.ellipse(center.x + x*radius, center.y + y*radius, radiuses[count%15], radiuses[count%15]);
		angle += angle_increment;
		// radius += radius_increment;

		count++;
	}

	// s.fill(0,128);
	// var radius = 0;
	// var offset = -s.millis()/20000.0
	// var angle = offset;
	// var angle_increment = .5;
	// var radius_increment = .2;
	// var count = 1;
	// while(radius < shapeSize){
	// 	radius_increment = 3/(count*.3)+.2;
	// 	var x = s.cos(angle);
	// 	var y = s.sin(angle);
	// 	s.ellipse(center.x + x*radius, center.y + y*radius, 6, 6);
	// 	angle -= angle_increment;
	// 	radius += radius_increment;
	// 	count++;
	// }

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