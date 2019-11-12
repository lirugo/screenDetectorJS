class Utils {

    static isGreenXY(imgData, x, y) {
        let hsv = this.getHSVXY(imgData, x, y);
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
                image: image
            })
            .then(res => { 
                console.log(TAG + "SEND STATUS " + res.status)
                Utils.showPreloader("Processing...");
            })
            .catch(error => {
                console.log(TAG + error)
            });
    }

    static showPreloader(message){
        document.getElementById("processing").style.visibility = "visible";
        document.getElementById("alert-message").innerHTML = message;
    }

};
