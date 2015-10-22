#include "testApp.h"

//--------------------------------------------------------------
void testApp::setup()
{
	ofBackground(0);

    image.loadImage("morisawa.png");

	ofSetLogLevel( OF_LOG_VERBOSE );
	ofSetVerticalSync( true );

//    ofSetWindowPosition(1920, 0);
//    ofToggleFullscreen();
	showOverlay = false;
	predictive = true;
	
	ofHideCursor();
	
	oculusRift.baseCamera = &cam;
	oculusRift.setup();
	
	for(int i = 0; i < 20; i++){
		DemoSphere d;
		d.color = ofColor(ofRandom(255),
						  ofRandom(255),
						  ofRandom(255));
		
		d.pos = ofVec3f(ofRandom(-500, 500),0,ofRandom(-500,500));
		
		d.floatPos.x = d.pos.x;
		d.floatPos.z = d.pos.z;
		
		d.radius = ofRandom(2, 50);
        
        d.bMouseOver = false;
        d.bGazeOver  = false;
        
		demos.push_back(d);
	}
	
	//enable mouse;
	cam.begin();
	cam.end();
    
    ofHideCursor();
}


//--------------------------------------------------------------
void testApp::update()
{


}


//--------------------------------------------------------------
void testApp::draw()
{
	if(oculusRift.isSetup()){

        ofSetColor(255);
		glEnable(GL_DEPTH_TEST);

        oculusRift.beginLeftEye();
		drawScene();
		oculusRift.endLeftEye();
		
		oculusRift.beginRightEye();
		drawScene();
		oculusRift.endRightEye();
		
		oculusRift.draw();
		
		glDisable(GL_DEPTH_TEST);
    }
	else{
		cam.begin();
		drawScene();
		cam.end();
	}
	
}

//--------------------------------------------------------------
void testApp::drawScene()
{

	ofPushMatrix();
    ofTranslate(5.0, 0.0, 662.0);
    ofSetColor(255,255,255);
    float flt = (ofGetElapsedTimef()/40.0);
    int whole = flt;
    flt -= whole;
    for(int i = 150; i >= 0; i--){
        ofPushMatrix();
        ofTranslate(0.0, -10*powf((i-flt),1.7), -40.0*(i-flt));
        image.draw(-50, 0, 0, 100.0, 100.0*0.225);
        ofPopMatrix();
    }
    for(int i = 150; i >= 0; i--){
        ofPushMatrix();
        ofTranslate(0.0, -10*powf((i+flt),1.7), 40.0*(i+flt));
        image.draw(-50, 0, 0, 100.0, 100.0*0.225);
        ofPopMatrix();
    }
    
    ofPopMatrix();
	ofPushStyle();
	ofNoFill();

	
	//billboard and draw the mouse
	if(oculusRift.isSetup()){
		
		ofPushMatrix();
		oculusRift.multBillboardMatrix();
		ofSetColor(255, 0, 0);
//		ofCircle(0,0,.5);
		ofPopMatrix();

	}
	
	ofPopStyle();
    
}

//--------------------------------------------------------------
void testApp::keyPressed(int key)
{
	if( key == 'f' )
	{
		//gotta toggle full screen for it to be right
		ofToggleFullscreen();
	}
	
	if(key == 's'){
		oculusRift.reloadShader();
	}
	
	if(key == 'l'){
		oculusRift.lockView = !oculusRift.lockView;
	}
	
	if(key == 'o'){
		showOverlay = !showOverlay;
	}
	if(key == 'r'){
		oculusRift.reset();
		
	}
	if(key == 'h'){
		ofHideCursor();
	}
	if(key == 'H'){
		ofShowCursor();
	}
	
	if(key == 'p'){
		predictive = !predictive;
		oculusRift.setUsePredictedOrientation(predictive);
	}
}

//--------------------------------------------------------------
void testApp::keyReleased(int key)
{

}

//--------------------------------------------------------------
void testApp::mouseMoved(int x, int y)
{
 //   cursor2D.set(x, y, cursor2D.z);
}

//--------------------------------------------------------------
void testApp::mouseDragged(int x, int y, int button)
{
//    cursor2D.set(x, y, cursor2D.z);
}

//--------------------------------------------------------------
void testApp::mousePressed(int x, int y, int button)
{

}

//--------------------------------------------------------------
void testApp::mouseReleased(int x, int y, int button)
{

}

//--------------------------------------------------------------
void testApp::windowResized(int w, int h)
{

}

//--------------------------------------------------------------
void testApp::gotMessage(ofMessage msg)
{

}

//--------------------------------------------------------------
void testApp::dragEvent(ofDragInfo dragInfo)
{

}
