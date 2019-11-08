'use strict';

const FPS = 10;
const SEND_FRAME_URL = "http://192.168.88.244:8080/api/web/";
let width, height;

const localVideo = document.getElementById('localVideo');
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
//Set canvas size
canvas.style.width = windowWidth;
canvas.style.height = windowHeight;
canvas.width  = windowWidth;
canvas.height = windowHeight;

console.log(`LOG Canvas width: ${canvas.width}px, height: ${canvas.height}px`);

localVideo.addEventListener('loadedmetadata', function() {
    width = this.videoWidth;
    height = this.videoHeight;
    console.log(`LOG Video width: ${this.videoWidth}px, height: ${this.videoHeight}px`);
});

async function startVideoStreamWebRTC() {
    console.log('LOG Requesting local stream');
    try {
        const stream = await navigator.mediaDevices.getUserMedia(
            {
                audio: false, 
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                }
            });
        console.log('LOG Received local stream');
        localVideo.srcObject = stream;
    } catch (e) {
        console.log(`LOG getUserMedia() error: ${e.name}`);
    }                   
}

startVideoStreamWebRTC();

const offset = 50;
function drawPhoneFrameOnCanvas(){
    ctx.beginPath();
    ctx.rect(offset, offset, windowWidth - offset * 2, windowHeight - offset * 2);
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(windowWidth/2-offset, windowHeight/2-offset, offset, offset);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
}

drawPhoneFrameOnCanvas();

const canvasForFrame = document.getElementById("canvasForFrame");
const ctxFFrame = canvasForFrame.getContext("2d");
canvasForFrame.style.width = windowWidth;
canvasForFrame.style.height = windowHeight;
canvasForFrame.width  = windowWidth;
canvasForFrame.height = windowHeight;

var current_core_mode = "SEND_DATA";
function drawOnCanvasFromVideoStream(){
    ctxFFrame.drawImage(localVideo, 0, 0, width, height, 0, 0, width, height);
    
    //Get pixel color
    let imgData = ctxFFrame.getImageData(0, 0, canvas.width, canvas.height);
    let isGreen = Utils.isGreenXY(imgData, width/2, height/2);
    
    ctx.beginPath();
    ctx.rect(windowWidth/2-offset, windowHeight/2-offset, offset, offset);
    ctx.lineWidth = 5;
    if(isGreen){       
        ctx.strokeStyle = "#00FF00";   
        canvasFillScreen("green");   
        
        if(current_core_mode == "SEND_DATA"){
            sendFrame2Server(canvasForFrame.toDataURL());
            current_core_mode = "";
        }
        
    }else{
        ctx.strokeStyle = "#FF0000";       
    }
    ctx.stroke();
}

function canvasFillScreen(color) {
    ctx.beginPath();
    ctx.rect(0, 0, windowWidth, windowHeight);
    ctx.fillStyle = "green";
    ctx.fill();
}

function sendFrame2Server(frame){
    axios
        .post(SEND_FRAME_URL, {
            image: frame
        })
        .then(res => (console.log(res)));
}

//Update canvas every time in interval
setInterval(function(){
    drawOnCanvasFromVideoStream();
}, 1000/FPS);

//Utils
class Utils {

    static isGreenXY(imgData, x, y) {
        let hsv = this.getHSVXY(imgData, x, y);
        let isGreen = false;

        if(
            hsv[0] > 70 && hsv[0] < 160 &&
            hsv[1] > 40 &&
            hsv[2] > 30
        ){
            isGreen = true;
        }

        // console.log(hsv)
        return isGreen;
    };

    static getHSVXY(imgData, x, y) {
        let rgba = this.getPixel(imgData, y*imgData.width+x);
        return this.rgb2hsv(rgba[0],rgba[1],rgba[2]);
    }
    
    static getPixel(imgData, index) {
        let i = index*4, d = imgData.data;
        return [d[i],d[i+1],d[i+2],d[i+3]] // returns array [R,G,B,A]
    }

    static rgb2hsv(r, g, b) {
        let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
        rabs = r / 255;
        gabs = g / 255;
        babs = b / 255;
        v = Math.max(rabs, gabs, babs),
        diff = v - Math.min(rabs, gabs, babs);
        diffc = c => (v - c) / 6 / diff + 1 / 2;
        percentRoundFn = num => Math.round(num * 100) / 100;
        if (diff == 0) {
            h = s = 0;
        } else {
            s = diff / v;
            rr = diffc(rabs);
            gg = diffc(gabs);
            bb = diffc(babs);

            if (rabs === v) {
                h = bb - gg;
            } else if (gabs === v) {
                h = (1 / 3) + rr - bb;
            } else if (babs === v) {
                h = (2 / 3) + gg - rr;
            }
            if (h < 0) {
                h += 1;
            }else if (h > 1) {
                h -= 1;
            }
        }
        return [
            Math.round(h * 360),
            percentRoundFn(s * 100),
            percentRoundFn(v * 100)
        ];
    }

};
