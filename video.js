class VideoStream {    
    FPS;
    URL;
    videoElement;
    videoWidth; videoHeight;
    currentCoreMode;
    skippedFrame;
    MODE_PHONE_DETECTING;
    MODE_SEND_DATA;

    constructor(TAG, FPS, URL, videoElement){
        console.log(TAG + "Init Video Stream")
        this.FPS = FPS;
        this.URL = URL;
        this.videoElement = videoElement;
        
        this.MODE_PHONE_DETECTING = 1;
        this.MODE_SEND_DATA = 2;
        this.currentCoreMode = this.MODE_PHONE_DETECTING;
        this.skippedFrame = 0;
    }

    async setupVideoStream(customCanvas){
        
        let classThis = this;
        this.videoElement.addEventListener('loadedmetadata', function() {
            classThis.videoWidth = this.videoWidth;
            classThis.videoHeight = this.videoHeight;
            classThis.videoElement.style.width = "100%";
            classThis.videoElement.style.height = "100%";

            console.log(TAG + `Video stream width: ${classThis.videoWidth}px, height: ${classThis.videoHeight}px`);

            customCanvas.setupCanvasFrame(this.videoWidth, this.videoHeight);
        });

        try {
            const stream = await navigator.mediaDevices.getUserMedia(
                {
                    audio: false, 
                    video: {
                        optional: [
                            {minWidth: 320},
                            {minWidth: 640},
                            {minWidth: 1024},
                            {minWidth: 1280},
                            {minWidth: 1920},
                            {minWidth: 2560},
                        ]
                    }
                });


            console.log(TAG + 'Video stream setup');
            localVideo.srcObject = stream;
        } catch (e) {
            console.log(TAG + `Video stream error: ${e.name}`);
        }    
    }

    onEachFrame(customCanvas){
        if(this.videoWidth && this.videoWidth){
            let ctxFrame = customCanvas.ctxFrame;
            ctxFrame.drawImage(video, 0, 0, this.videoWidth, this.videoHeight, 0, 0, this.videoWidth, this.videoHeight);

            if(this.currentCoreMode == this.MODE_PHONE_DETECTING){
                let imgData = ctxFrame.getImageData(0, 0, this.videoWidth, this.videoHeight);
                let isGreen = Utils.isGreenXY(imgData, this.videoWidth/2, this.videoHeight/2);

                if(isGreen){
                    customCanvas.fillScreenWithColor();
                    this.currentCoreMode = this.MODE_SEND_DATA;
                   
                    console.log(TAG + "green filled");
                }
            }

            if(this.currentCoreMode == this.MODE_SEND_DATA){

                console.log(TAG + "MODE_SEND_DATA");
                while(skippedFrame < 10){
                    this.skippedFrame++;
                    return;                    
                }
                Utils.sendImage2Server(customCanvas.canvasFrame.toDataURL());
            }
        }
    }

}