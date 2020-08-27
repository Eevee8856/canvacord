const Canvas = require("canvas");
const GIFEncoder = require("gifencoder");
const Error = require("../lib/Error");
const loader = require("../lib/Loader");
const Constants = require("../lib/Constants");

class Canvacord {

    /**
     * You may not instantiate **Canvacord** class.
     */
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

    /**
     * This method can be used to apply triggered effect on any image.
     * @param {string|Buffer} image The image to be triggered. Image source must be a string or Buffer.
     * @returns {Promise<Buffer>}
     * @example const image = getImageSomehow();
     * const triggered = await canvacord.trigger(image);
     * fs.writeFileSync("./triggered.gif", triggered);
     */
    static async trigger(image) {
        if (!image) throw new Error(`Expected ImageSource, received ${typeof image}!`);
        const base = await Canvas.loadImage(loader.loadBuffer("triggered"));
        const img = await Canvas.loadImage(image);
        const GIF = new GIFEncoder(256, 310);
        GIF.start();
        GIF.setRepeat(0);
        GIF.setDelay(15);
        const canvas = Canvas.createCanvas(256, 310);
        const ctx = canvas.getContext("2d");
        const BR = 20;
        const LR = 10;
        let i = 0;
        while (i < 9) {
            ctx.clearRect(0, 0, 256, 310);
            ctx.drawImage(
                img,
                Math.floor(Math.random() * BR) - BR,
                Math.floor(Math.random() * BR) - BR,
                256 + BR,
                310 - 54 + BR
            );
            ctx.fillStyle = "#FF000033";
            ctx.fillRect(0, 0, 256, 310);
            ctx.drawImage(
                base,
                Math.floor(Math.random() * LR) - LR,
                310 - 54 + Math.floor(Math.random() * LR) - LR,
                256 + LR,
                54 + LR
            );
            GIF.addFrame(ctx);
            i++;
        }
        GIF.finish();
        return GIF.out.getData();
    }

    /**
     * Creates RGB GIF
     * @param {object} args Args for rgb method
     * @param {string[]} color Array of hex color code.
     * @param {number} height Height of the output gif
     * @param {number} width Width of the output gif
     * @param {number} delay Frames delay in ms
     * @returns {Buffer}
     * @example const data = {
     *     color: ["#FF0000", "#00FF00", "#0000FF"],
     *     height: 256,
     *     width: 256,
     *     delay: 15
     * };
     * const image = canvacord.rgb(data);
     * fs.writeFileSync("./rgb.gif", image);
     */
    static rgb(args = Constants.RGBArgs) {
        const encoder = new GIFEncoder(args.width, args.height);
        encoder.start();
        encoder.setRepeat(0);
        encoder.setDelay(args.delay);

        const canvas = Canvas.createCanvas(args.width, args.height);
        const ctx = canvas.getContext("2d");

        for (let i = 0; i < args.color.length; i++) {
            ctx.fillStyle = args.color[i];
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            encoder.addFrame(ctx);
        }

        GIF.finish();
        return GIF.out.getData();
    }

    /**
     * This method inverts color of any given image.
     * @param {string|Buffer} img Input image to invert
     * @returns {Promise<Buffer>}
     * @example const img = getImage();
     * const invert = await canvacord.invert(img);
     * fs.writeFileSync("invert.png", invert);
     */
    static async invert(img) {
        if (!img) throw new Error(`Expected ImageSource, received ${typeof img}!`);
        const image = await Canvas.loadImage(img);
        const canvas = await Canvas.createCanvas(image.width, image.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = 255 - imgData.data[i];
            imgData.data[i + 1] = 255 - imgData.data[i + 1];
            imgData.data[i + 2] = 255 - imgData.data[i + 2];
            imgData.data[i + 3] = 255;
        }

        ctx.putImageData(imgData, 0, 0);

        return canvas.toBuffer();
    }

    /**
     * This method can be used to create greyscale effect on your image.
     * @param {string|Buffer} img Input image
     * @returns {Promise<Buffer>}
     * @example const img = getImage();
     * const data = await canvacord.greyscale(img);
     * fs.writeFileSync("greyscale.png", data);
     */
    static async greyscale(img) {
        if (!img) throw new Error(`Expected ImageSource, received ${typeof img}!`);
        const image = await Canvas.loadImage(img);
        const canvas = await Canvas.createCanvas(image.width, image.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imgData.data.length; i += 4) {
            const brightness = 0.34 * imgData.data[i] + 0.5 * imgData.data[i + 1] + 0.16 * imgData.data[i + 2];
            imgData.data[i] = brightness;
            imgData.data[i + 1] = brightness;
            imgData.data[i + 2] = brightness;
        }

        ctx.putImageData(imgData, 0, 0);

        return canvas.toBuffer();
    }

    /**
     * This method can be used to create sepia wash effect on your image.
     * @param {string|Buffer} img Input image
     * @returns {Promise<Buffer>}
     * @example const img = getImage();
     * const data = await canvacord.sepia(img);
     * fs.writeFileSync("sepia.png", data);
     */
    static async sepia(img) {
        if (!img) throw new Error(`Expected ImageSource, received ${typeof img}!`);
        const image = await Canvas.loadImage(img);
        const canvas = await Canvas.createCanvas(image.width, image.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imgData.data.length; i += 4) {
            const brightness = 0.34 * imgData.data[i] + 0.5 * imgData.data[i + 1] + 0.16 * imgData.data[i + 2];
            imgData.data[i] = brightness + 100;
            imgData.data[i + 1] = brightness + 50;
            imgData.data[i + 2] = brightness;
        }

        ctx.putImageData(imgData, 0, 0);

        return canvas.toBuffer();
    }

}

module.exports = Canvacord;