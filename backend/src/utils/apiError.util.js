class ApiError extends Error {
    constructor(
        statusCode = 401,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }

    }
}
export default ApiError
/*
write all the http standard codes and their meaning 
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

1xx - Informational
2xx - Success
3xx - Redirection
4xx - Client Error
5xx - Server Error

*/