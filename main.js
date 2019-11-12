'use strict';

const TAG = "WEB LOG TAG - "
const WIDNWDOW_WIDTH = window.innerWidth;
const WIDNWDOW_HEIGHT = window.innerHeight;
const FPS = 15;
const SEND_FRAME_URL = "https://sc.smartalliance.eu/api/web/";

const localVideo = document.getElementById('video');
const videoStream = new VideoStream(TAG, FPS, SEND_FRAME_URL, localVideo);
const customCanvas = new CustomCanvas(document.getElementById('canvasMarker'), document.getElementById('canvasForFrame'));

customCanvas.setupCanvasMarker();
customCanvas.drawCanvasMarker();

videoStream.setupVideoStream(customCanvas);

console.log(TAG + "Window size " + WIDNWDOW_WIDTH + "x" + WIDNWDOW_HEIGHT)

//Update canvas every time in interval
setInterval(function(){
    
    videoStream.onEachFrame(customCanvas);
    
}, 1000/FPS);

