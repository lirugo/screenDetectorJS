'use strict';

const FPS = 10;
let width, height;

const localVideo = document.getElementById('localVideo');
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function setCanvasSize(){
    canvas.style.width = width;
    canvas.style.height = height;
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    console.log(`LOG Canvas width: ${canvas.width}px, height: ${canvas.height}px`);
    console.log(`LOG Canvas offset width: ${canvas.offsetWidth}px, height: ${canvas.offsetHeight}px`);
}

localVideo.addEventListener('loadedmetadata', function() {
    width = this.videoWidth;
    height = this.videoHeight;
    console.log(`LOG Video width: ${this.videoWidth}px, height: ${this.videoHeight}px`);

    setCanvasSize();  
});

function drawOnCanvasFromVideoStream(){
    ctx.drawImage(localVideo, 0, 0, width, height, 0, 0, width, height);
    
    //Get pixel color
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixel = Utils.getHSVXY(imgData, 150, 150);
    
    // console.log('LOG pixel ' + pixel)

    let img = canvas.toDataURL("image/jpg");
}

async function startVideoStreamWebRTC() {
    console.log('LOG Requesting local stream');
    try {
        const stream = await navigator.mediaDevices.getUserMedia(
            {
                audio: false, 
                video: {
                    width: { ideal: 1440 },
                    height: { ideal: 1080 },
                }
            });
        console.log('LOG Received local stream');
        localVideo.srcObject = stream;
    } catch (e) {
        console.log(`LOG getUserMedia() error: ${e.name}`);
    }                   
}

startVideoStreamWebRTC().then(() => {
   
});

//Update canvas every time in interval
setInterval(function(){
    drawOnCanvasFromVideoStream();
}, 1000/FPS);


//Utils
class Utils {

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
