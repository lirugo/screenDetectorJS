class VideoStream {    
    FPS;
    URL;
    videoElement;
    videoWidth; videoHeight;
    current_core_mode;

    constructor(TAG, FPS, URL, videoElement){
        console.log(TAG + "Init Video Stream")
        this.FPS = FPS;
        this.URL = URL;
        this.videoElement = videoElement;

        this.current_core_mode = "SEND_DATA";
    }

    async setupVideoStream(customCanvas){
        
        let classThis = this;
        this.videoElement.addEventListener('loadedmetadata', function() {
            classThis.videoWidth = this.videoWidth;
            classThis.videoHeight = this.videoHeight;
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
            if(this.current_core_mode == "SEND_DATA"){
            let ctxFrame = customCanvas.ctxFrame;
            ctxFrame.drawImage(video, 0, 0, this.videoWidth, this.videoHeight, 0, 0, this.videoWidth, this.videoHeight);
                            
            let imgData = ctxFrame.getImageData(0, 0, this.videoWidth, this.videoHeight);
            let isGreen = Utils.isGreenXY(imgData, this.videoWidth/2, this.videoHeight/2);

            console.log(TAG + isGreen)
            if(isGreen){
                customCanvas.fillScreenWithColor();
                this.current_core_mode = "";
                Utils.sendImage2Server(customCanvas.canvasFrame.toDataURL());
            }
            }
        }
    }

}