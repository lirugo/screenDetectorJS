class CustomCanvas {
    constructor(canvasMarker, canvasForFrame, ctxMarker, ctxFrame) {
        this.canvasMarker = canvasMarker;
        this.canvasForFrame = canvasForFrame;

        this.ctxMarker = ctxMarker;
        this.ctxFrame = ctxFrame;

        this.canvasForFrameCreated = false;
    }

    init(WIDNWDOW_WIDTH, WIDNWDOW_HEIGHT) {
        this.canvasMarker.width  = WIDNWDOW_WIDTH;
        this.canvasMarker.height = WIDNWDOW_HEIGHT;
        this.canvasMarker.style.width = WIDNWDOW_WIDTH;
        this.canvasMarker.style.height = WIDNWDOW_HEIGHT;

        console.log(TAG + `CanvasMarker width: ${this.canvasMarker.width}px, height: ${this.canvasMarker.height}px`);
   }

    drawSideMarkers() {
        let colors = ["#00FF00","#00FF00","#00FF00","#00FF00"];
        //TODO:: shake colors array
        //Top left
        this.ctxMarker.beginPath();
        this.ctxMarker.fillStyle = colors[0];
        this.ctxMarker.fillRect(WIDNWDOW_WIDTH-greenLengthX, 0, WIDNWDOW_WIDTH, greenLengthY)
        this.ctxMarker.stroke();
        //Top right
        this.ctxMarker.beginPath();
        this.ctxMarker.fillStyle = colors[1];
        this.ctxMarker.fillRect(0, 0, greenLengthX, greenLengthY)
        this.ctxMarker.stroke();
        //Bottom right
        this.ctxMarker.beginPath();
        this.ctxMarker.fillStyle = colors[2];
        this.ctxMarker.fillRect(0, WIDNWDOW_HEIGHT-greenLengthY, greenLengthX, greenLengthY)
        this.ctxMarker.stroke();
        //Bottom left
        this.ctxMarker.beginPath();
        this.ctxMarker.fillStyle = colors[3];
        this.ctxMarker.fillRect(WIDNWDOW_WIDTH-greenLengthX, WIDNWDOW_HEIGHT-greenLengthY, greenLengthX, greenLengthY)
        this.ctxMarker.stroke();
    }

    drawAims(){
        const aimTR = [
            (WIDNWDOW_WIDTH - WIDNWDOW_WIDTH / 1.3),
            (WIDNWDOW_HEIGHT - WIDNWDOW_HEIGHT / 1.25)
        ];

        //Top right
        this.ctxMarker.beginPath();
        this.ctxMarker.strokeStyle = "#FF0000";
        this.ctxMarker.lineWidth = 5;
        this.ctxMarker.rect(aimTR[0]-lengthX/2, aimTR[1]-lengthY/2, lengthX, lengthY)
        this.ctxMarker.stroke();
    }

    fillScreenWithColor(color){
        this.ctxMarker.beginPath();
        this.ctxMarker.rect(0, 0, WIDNWDOW_WIDTH, WIDNWDOW_HEIGHT);
        this.ctxMarker.fillStyle = color;
        this.ctxMarker.fill();
    }
}