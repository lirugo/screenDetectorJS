class CustomCanvas {
    constructor(canvasMarker, canvasForFrame, ctxMarker, ctxFrame) {
        this.canvasMarker = canvasMarker;
        this.canvasForFrame = canvasForFrame;

        this.ctxMarker = ctxMarker;
        this.ctxFrame = ctxFrame;

        
        this.markerLengthX = WIDNWDOW_HEIGHT / 14 * 1.5;
        this.markerLengthY = WIDNWDOW_WIDTH / 8 * 1.5;
        this.aimLengthX = WIDNWDOW_HEIGHT / 14 * 1.8;
        this.aimLengthY = WIDNWDOW_WIDTH / 8 * 1.8;

        this.aimTL = [
            (WIDNWDOW_WIDTH / 1.25),
            (WIDNWDOW_HEIGHT - WIDNWDOW_HEIGHT / 1.25)
        ];
        this.aimBR = [
            (WIDNWDOW_WIDTH - WIDNWDOW_WIDTH / 1.35),
            (WIDNWDOW_HEIGHT / 1.25)
        ];
        this.aimTR = [
            (WIDNWDOW_WIDTH - WIDNWDOW_WIDTH / 1.25),
            (WIDNWDOW_HEIGHT - WIDNWDOW_HEIGHT / 1.25)
        ];
        this.aimBL = [
            (WIDNWDOW_WIDTH / 1.35),
            (WIDNWDOW_HEIGHT / 1.25)
        ];
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
        this.ctxMarker.fillRect(WIDNWDOW_WIDTH-this.markerLengthX, 0, WIDNWDOW_WIDTH, this.markerLengthY)
        this.ctxMarker.stroke();
        //Top right
        this.ctxMarker.beginPath();
        this.ctxMarker.fillStyle = colors[1];
        this.ctxMarker.fillRect(0, 0, this.markerLengthX, this.markerLengthY)
        this.ctxMarker.stroke();
        //Bottom right
        this.ctxMarker.beginPath();
        this.ctxMarker.fillStyle = colors[2];
        this.ctxMarker.fillRect(0, WIDNWDOW_HEIGHT-this.markerLengthY, this.markerLengthX, this.markerLengthY)
        this.ctxMarker.stroke();
        //Bottom left
        this.ctxMarker.beginPath();
        this.ctxMarker.fillStyle = colors[3];
        this.ctxMarker.fillRect(WIDNWDOW_WIDTH-this.markerLengthX, WIDNWDOW_HEIGHT-this.markerLengthY, this.markerLengthX, this.markerLengthY)
        this.ctxMarker.stroke();
    }

    drawAims(){
        //Top left
        this.ctxMarker.beginPath();
        this.ctxMarker.strokeStyle = "#FF0000";
        this.ctxMarker.lineWidth = 5;
        this.ctxMarker.rect(this.aimTL[0]-this.aimLengthX/2, this.aimTL[1]-this.aimLengthY/2, this.aimLengthX, this.aimLengthY)
        this.ctxMarker.stroke();
        //Top right
        this.ctxMarker.beginPath();
        this.ctxMarker.strokeStyle = "#FF0000";
        this.ctxMarker.lineWidth = 5;
        this.ctxMarker.rect(this.aimTR[0]-this.aimLengthX/2, this.aimTR[1]-this.aimLengthY/2, this.aimLengthX, this.aimLengthY)
        this.ctxMarker.stroke();
        //Bottom left
        this.ctxMarker.beginPath();
        this.ctxMarker.strokeStyle = "#FF0000";
        this.ctxMarker.lineWidth = 5;
        this.ctxMarker.rect(this.aimBL[0]-this.aimLengthX/2, this.aimBL[1]-this.aimLengthY/2, this.aimLengthX, this.aimLengthY)
        this.ctxMarker.stroke();
        //Bottom right
        this.ctxMarker.beginPath();
        this.ctxMarker.strokeStyle = "#FF0000";
        this.ctxMarker.lineWidth = 5;
        this.ctxMarker.rect(this.aimBR[0]-this.aimLengthX/2, this.aimBR[1]-this.aimLengthY/2, this.aimLengthX, this.aimLengthY)
        this.ctxMarker.stroke();
    }

    fillScreenWithColor(color){
        this.ctxMarker.beginPath();
        this.ctxMarker.rect(0, 0, WIDNWDOW_WIDTH, WIDNWDOW_HEIGHT);
        this.ctxMarker.fillStyle = color;
        this.ctxMarker.fill();
    }
}