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
        let constraints = {
            video: {
                width: {min: 1280},
                // optional: [
                //     {minWidth: 1024},
                //     {minWidth: 1280},
                //     {minWidth: 1920},
                //     {minWidth: 2560},
                // ]
            }
        };

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

    detectPhone(customCanvas) {
        if(
            this.videoWidth && this.videoHeight &&
            this.currentCoreMode != this.MODE_UNHANDLED
        ){
            customCanvas.ctxFrame.drawImage(video, 0, 0, this.videoWidth, this.videoHeight, 0, 0, this.videoWidth, this.videoHeight);
            let imgData = customCanvas.ctxFrame.getImageData(0, 0, this.videoWidth, this.videoHeight);

            if(this.currentCoreMode == this.MODE_PHONE_DETECTING){
                let x = (this.videoWidth - this.videoWidth / 1.3);
                let y = (this.videoHeight - this.videoHeight / 1.25);

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

                let aimDetected = Utils.aimDetected(imgData, x, y, this.videoWidth, this.videoHeight);
                
                if(aimDetected){
                    // customCanvas.fillScreenWithColor("#FFFFFF");
                    customCanvas.drawAims("green");
                    // this.currentCoreMode = this.MODE_SKIP_FRAME;
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
                // Utils.sendImage2Server(customCanvas.canvasForFrame.toDataURL());
            }
        }
    }
}