const dir = `${__dirname}/../store`;
const fs = require("fs");

module.exports = {
    /**
     * Loads Base for canvacord endpoints
     * @param {string} name Base name
     * @returns {Buffer}
     */
    loadBuffer: (name) => {
        return fs.readFileSync(`${dir}/${name}.png`);
    }
};