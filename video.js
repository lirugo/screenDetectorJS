
class VideoStream {    
    constructor(TAG, FPS, URL, videoElement){
        console.log(TAG + "Init Video Stream")
        this.FPS = FPS;
        this.URL = URL;
        this.videoElement = videoElement;

        this.MODE_UNHANDLED = 0;
        this.MODE_PHONE_DETECTING = 1;
        this.MODE_SEND_DATA = 2;
        this.MODE_SKIP_FRAME = 3;
        this.currentCoreMode = this.MODE_PHONE_DETECTING;

        this.skippedFrame = 0;
    }

    init() {
        let constraints;
        if(Utils.isAndroid()){
            constraints = {
                video: {
                    optional: [
                        {maxWidth: 1024},
                        {minWidth: 1280},
                        // {minWidth: 1920},
                        // {minWidth: 2560},
                    ]
                }
            };
        }else {
            constraints = {
                video: {
                    width: {max: 480},
                }
            };
        }

        navigator.mediaDevices.getUserMedia(constraints)
            .then(this.handleStreamSuccess)
            .catch(this.handleStreamError);
    }

    handleStreamSuccess(stream) {
        window.stream = stream; 
        video.srcObject = stream;  
    }

    handleStreamError(error) {
        Utils.showPreloader("getUserMedia error: " + error, "visible");
        console.log(TAG + 'getUserMedia error: ', error);
    }

    detectPhone(customCanvas, QrScanner) {
        if(
            this.videoWidth && this.videoHeight &&
            this.currentCoreMode != this.MODE_UNHANDLED
        ){
            customCanvas.ctxFrame.drawImage(video, 0, 0, this.videoWidth, this.videoHeight, 0, 0, this.videoWidth, this.videoHeight);
            let imgData = customCanvas.ctxFrame.getImageData(0, 0, this.videoWidth, this.videoHeight);

            if(this.currentCoreMode == this.MODE_PHONE_DETECTING){
                let aimTL = [
                    (this.videoWidth / customCanvas.AIM_CONSTANT_TOP_X),
                    (this.videoHeight - this.videoHeight / customCanvas.AIM_CONSTANT_TOP_Y)
                ];
                let aimTR = [
                    (this.videoWidth - this.videoWidth / customCanvas.AIM_CONSTANT_TOP_X),
                    (this.videoHeight - this.videoHeight / customCanvas.AIM_CONSTANT_TOP_Y)
                ];
                let aimBR = [
                    (this.videoWidth - this.videoWidth / customCanvas.AIM_CONSTANT_BOTTOM_X),
                    (this.videoHeight / customCanvas.AIM_CONSTANT_BOTTOM_Y)
                ];
                let aimBL = [
                    (this.videoWidth / customCanvas.AIM_CONSTANT_BOTTOM_X),
                    (this.videoHeight / customCanvas.AIM_CONSTANT_BOTTOM_Y)
                ];

                let screenDetected = Utils.screenDetected(customCanvas, imgData, aimTL, aimTR, aimBR, aimBL, this.videoWidth, this.videoHeight);
                
                QrScanner.scanImage(document.getElementById("video"))
                    .then(result => {
                        // console.log(result);
                        document.getElementById("qrText").innerText = result;
                    })
                    .catch(error => {
                        // console.log(error || 'No QR code found.');
                        document.getElementById("qrText").innerText = "err";
                    })

                if(screenDetected){
                    if(document.getElementById("qrText").innerText == "Ver1"){
                        customCanvas.fillScreenWithColor("#FFFFFF");
                        // customCanvas.drawAims(["#00FF00", "#00FF00", "#00FF00", "#00FF00"]);
                        this.currentCoreMode = this.MODE_SKIP_FRAME;
                    }
                }
            }

            if(this.currentCoreMode == this.MODE_SKIP_FRAME){
                while(this.skippedFrame < 10){
                    this.skippedFrame++;
                    return;
                }
                this.currentCoreMode = this.MODE_SEND_DATA;
            }

            if(this.currentCoreMode == this.MODE_SEND_DATA){
                this.currentCoreMode = this.MODE_UNHANDLED;
                
                Utils.showPreloader("Sending to server", "visible");
                Utils.sendImage2Server(customCanvas.canvasForFrame.toDataURL());
            }
        }
    }
}