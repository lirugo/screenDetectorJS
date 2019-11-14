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

        this.videoWidth = 100;
    }

    init() {
        let constraints = {
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
        console.log(TAG + 'getUserMedia error: ', error);
    }
}