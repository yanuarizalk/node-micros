module.exports = async function (error, req, res, next) {
    if (error) {
        let statusCode = 500;
        let errorMessage = error.message;

        if (error?.httpStatusCode) {
            statusCode = error.httpStatusCode;
        } else if (error.name == 'SequelizeValidationError') {
            statusCode = 400
        } else if (error.name == 'SequelizeForeignKeyConstraintError') {
            statusCode = 400
            errorMessage = `unable to find specified field of ${error.fields} from ${error.table}`
        }

        let body = {
            message: errorMessage,
        }
        if (!process.env.IS_PRODUCTION) body.error = error;

        res.status(statusCode).json(body);
    } else
        next();
}