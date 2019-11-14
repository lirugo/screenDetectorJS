class Utils {

    static aimDetected(imgData, x, y, width, height){
        const halfLengthX = height / 14 * 1.8 / 2;
        const halfLengthY = width / 8 * 1.8 / 2;

        let count = 0;
                
        if(this.isGreenXY(imgData, x, y)) count++;

        if(this.isGreenXY(imgData, x, y+halfLengthY)) count++;
        if(this.isGreenXY(imgData, x, y-halfLengthY)) count++;
        if(this.isGreenXY(imgData, x+halfLengthX, y)) count++;
        if(this.isGreenXY(imgData, x-halfLengthX, y)) count++;
        if(this.isGreenXY(imgData, x+halfLengthX, y+halfLengthY)) count++;
        if(this.isGreenXY(imgData, x-halfLengthX, y-halfLengthY)) count++;
        if(this.isGreenXY(imgData, x+halfLengthX, y-halfLengthY)) count++;
        if(this.isGreenXY(imgData, x-halfLengthX, y+halfLengthY)) count++;

        if(this.isGreenXY(imgData, x, y+halfLengthY/2)) count++;
        if(this.isGreenXY(imgData, x, y-halfLengthY/2)) count++;
        if(this.isGreenXY(imgData, x+halfLengthX/2, y)) count++;
        if(this.isGreenXY(imgData, x-halfLengthX/2, y)) count++;
        if(this.isGreenXY(imgData, x+halfLengthX/2, y+halfLengthY/2)) count++;
        if(this.isGreenXY(imgData, x-halfLengthX/2, y-halfLengthY/2)) count++;
        if(this.isGreenXY(imgData, x+halfLengthX/2, y-halfLengthY/2)) count++;
        if(this.isGreenXY(imgData, x-halfLengthX/2, y+halfLengthY/2)) count++;

        return count >= 3;
    }

    static isGreenXY(imgData, x, y) {
        let hsv = this.getHSVXY(imgData, Math.round(x), Math.round(y));
        let isGreen = false;

        if(
            hsv[0] > 70 && hsv[0] < 160 &&
            hsv[1] > 40 &&
            hsv[2] > 30
        ){
            isGreen = true;
        }

        // console.log(TAG + hsv)
        return isGreen;
    };

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

    static sendImage2Server(image){
        axios
            .post(SEND_FRAME_URL, {
                deviceOS: Utils.getOSFromUserAgent(),
                deviceModel: Utils.getModelFromUserAgent(),
                image: image,
            })
            .then(res => { 
                Utils.showPreloader("Image was send", "visible");
                console.log(TAG + "SEND STATUS " + res.status);
            })
            .catch(error => {
                Utils.showPreloader("Error on send " + error, "visible");
                console.log(TAG + error);
            });
    }

    static showPreloader(message, visibility){
        document.getElementById("processing").style.visibility = visibility;
        document.getElementById("alert-message").innerHTML = message;
    }

    static getModelFromUserAgent(){
        let userAgentArray = navigator.userAgent.split(" ");

        let model = "UNKNOWN";

        if(this.isAndroid()){
            let buildIndex = userAgentArray.findIndex(el => el.includes(')'));
            model = "";
            for(let i = 4; i<buildIndex; i++){
                model += userAgentArray[i] + " ";
            }

            if(model == "")
                model = "UNKNOWN";
        }
        if(this.isIOS()){
            model = "iPhone";
        }

        return model;
    }

    static isAndroid(){ return /(android)/i.test(navigator.userAgent); }

    static isIOS(){ return /(iphone)/i.test(navigator.userAgent); }

    static getOSFromUserAgent(){
        if(this.isAndroid())
            return "Android";
        if(this.isIOS())
            return "IOS";

        return "UNKNOWN";
    }

};
