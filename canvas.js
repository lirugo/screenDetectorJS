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
        const greenLengthX = WIDNWDOW_HEIGHT / 14 * 1.5;
        const greenLengthY = WIDNWDOW_WIDTH / 8 * 1.5;
        const lengthX = WIDNWDOW_HEIGHT / 14 * 1.8;
        const lengthY = WIDNWDOW_WIDTH / 8 * 1.8;


        //Temp black contour
        const offset = 50;
        this.ctxMarker.beginPath();
        this.ctxMarker.strokeStyle = "#000000";
        this.ctxMarker.rect(offset, offset, WIDNWDOW_WIDTH - offset * 2, WIDNWDOW_HEIGHT - offset * 2);
        this.ctxMarker.lineWidth = 5;
        this.ctxMarker.stroke();

        let aimTLX = (WIDNWDOW_WIDTH - WIDNWDOW_WIDTH / 1.3);
        let aimTLY = (WIDNWDOW_HEIGHT - WIDNWDOW_HEIGHT / 1.25);
        // Draw red aims
        this.ctxMarker.beginPath();
        this.ctxMarker.strokeStyle = "#FF0000";
        this.ctxMarker.lineWidth = 5;
        this.ctxMarker.rect(aimTLX-lengthX/2, aimTLY-lengthY/2, lengthX, lengthY)
        this.ctxMarker.stroke();


        

        this.ctxMarker.beginPath();
        this.ctxMarker.rect(WIDNWDOW_WIDTH/2-offset/2, WIDNWDOW_HEIGHT/2-offset/2, offset, offset);
        this.ctxMarker.lineWidth = 5;
        this.ctxMarker.strokeStyle = "#FF0000";
        this.ctxMarker.stroke();

        //Draw green side markers
        //Top left
        this.ctxMarker.beginPath();
        this.ctxMarker.fillStyle = "#00FF00";
        this.ctxMarker.fillRect(0, 0, greenLengthX, greenLengthY)
        this.ctxMarker.stroke();
        //Top right
        this.ctxMarker.beginPath();
        this.ctxMarker.fillStyle = "#00FF00";
        this.ctxMarker.fillRect(WIDNWDOW_WIDTH-greenLengthX, 0, WIDNWDOW_WIDTH, greenLengthY)
        this.ctxMarker.stroke();
        //Bottom right
        this.ctxMarker.beginPath();
        this.ctxMarker.fillStyle = "#00FF00";
        this.ctxMarker.fillRect(WIDNWDOW_WIDTH-greenLengthX, WIDNWDOW_HEIGHT-greenLengthY, greenLengthX, greenLengthY)
        this.ctxMarker.stroke();
        //Bottom left
        this.ctxMarker.beginPath();
        this.ctxMarker.fillStyle = "#00FF00";
        this.ctxMarker.fillRect(0, WIDNWDOW_HEIGHT-greenLengthY, greenLengthX, greenLengthY)
        this.ctxMarker.stroke();
    }

    fillScreenWithColor(color){
        this.ctxMarker.beginPath();
        this.ctxMarker.rect(0, 0, WIDNWDOW_WIDTH, WIDNWDOW_HEIGHT);
        this.ctxMarker.fillStyle = color;
        this.ctxMarker.fill();
    }
}