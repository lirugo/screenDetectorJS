class CustomCanvas{

    canvasFrameCreated;
    canvasMarker;
    canvasFrame;
    ctxMarker;
    ctxFrame;

    constructor(canvasMarker, canvasFrame){
        this.canvasMarker = canvasMarker;
        this.canvasFrame = canvasFrame;

        this.ctxMarker = canvasMarker.getContext("2d");
        this.ctxFrame = canvasFrame.getContext("2d");
        this.canvasFrameCreated = false;
    }

    setupCanvasFrame(width, height){
        if(!this.canvasFrameCreated){
            this.canvasFrame.style.width = width;
            this.canvasFrame.style.height = height;
            this.canvasFrame.width  = width;
            this.canvasFrame.height = height;

            console.log(TAG + "Canvas frame size " + width + "x" + height)
            this.canvasFrameCreated = true;
        }
    }

    setupCanvasMarker(){        
        this.canvasMarker.style.width = WIDNWDOW_WIDTH;
        this.canvasMarker.style.height = WIDNWDOW_HEIGHT;
        this.canvasMarker.width  = WIDNWDOW_WIDTH;
        this.canvasMarker.height = WIDNWDOW_HEIGHT;

        console.log(TAG + "Canvas marker size " + WIDNWDOW_WIDTH + "x" + WIDNWDOW_HEIGHT)
    }

    drawCanvasMarker(){
        const halfLengthX = WIDNWDOW_HEIGHT / 14 * 1.5;
        const halfLengthY = WIDNWDOW_WIDTH / 8 * 1.5;
        const offset = 50;
        this.ctxMarker.beginPath();
        this.ctxMarker.rect(offset, offset, WIDNWDOW_WIDTH - offset * 2, WIDNWDOW_HEIGHT - offset * 2);
        this.ctxMarker.lineWidth = 5;
        this.ctxMarker.stroke();

        this.ctxMarker.beginPath();
        this.ctxMarker.rect(WIDNWDOW_WIDTH/2-offset/2, WIDNWDOW_HEIGHT/2-offset/2, offset, offset);
        this.ctxMarker.lineWidth = 5;
        this.ctxMarker.strokeStyle = "#FF0000";
        this.ctxMarker.stroke();

        //Side markers
        //Top left
        this.ctxMarker.beginPath();
        this.ctxMarker.fillStyle = "#00FF00";
        this.ctxMarker.fillRect(0, 0, halfLengthX, halfLengthY)
        this.ctxMarker.stroke();
        //Top right
        this.ctxMarker.beginPath();
        this.ctxMarker.fillStyle = "#00FF00";
        this.ctxMarker.fillRect(WIDNWDOW_WIDTH-halfLengthX, 0, WIDNWDOW_WIDTH, halfLengthY)
        this.ctxMarker.stroke();
        //Bottom right
        this.ctxMarker.beginPath();
        this.ctxMarker.fillStyle = "#00FF00";
        this.ctxMarker.fillRect(WIDNWDOW_WIDTH-halfLengthX, WIDNWDOW_HEIGHT-halfLengthY, halfLengthX, halfLengthY)
        this.ctxMarker.stroke();
        //Bottom left
        this.ctxMarker.beginPath();
        this.ctxMarker.fillStyle = "#00FF00";
        this.ctxMarker.fillRect(0, WIDNWDOW_HEIGHT-halfLengthY, halfLengthX, halfLengthY)
        this.ctxMarker.stroke();
    }

    fillScreenWithColor(color){
        this.ctxMarker.beginPath();
        this.ctxMarker.rect(0, 0, WIDNWDOW_WIDTH, WIDNWDOW_HEIGHT);
        this.ctxMarker.fillStyle = color;
        this.ctxMarker.fill();
    }
}