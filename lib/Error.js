class CanvaError extends Error {

    /**
     * Creates custom error message
     * @param {string} error Error message
     * @param {string} name Error name
     */
    constructor(error, name = "CanvaError") {
        super();
        Error.captureStackTrace(this, this.constructor);

        /**
         * Error message
         * @type {string}
         */
        this.message = error;

        /**
         * Error name
         * @type {string}
         */
        this.name = name;
    }

}

module.exports = CanvaError;