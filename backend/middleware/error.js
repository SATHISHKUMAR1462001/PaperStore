import HandleError from '../helpers/HandelError.js';

export default (err, req, res, next) => {

    err.statuscode = err.status || 500;
    err.message = err.message || " ";

    if (err.name === "CastError") {
        const message = `Resource not found .Invalid : ${err.path}`;
        err = new HandleError(message, 400);
    }
    if (err.code === 11000) {
        const message = `Already Reegister  ${Object.values(err.keyValue)} so login insted of register`;
        err = new HandleError(message, 400);
    }

    res.status(err.statuscode).json({
        success: false,
        message: err.message,
        statuscode: err.statuscode
    })

}