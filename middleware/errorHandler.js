const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode
    let error = ""
    switch(statusCode) {
        case 404 :
            error = "NOT FOUND"
            break
        case 500 :
            error = "Internal Server Error"
            break
        case 401 :
            error = "Unauthorized"
            break
        default : 
            error = "Unknown Error"

    }

     const errorJson = {
        success: false,
        error,
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    };

    return res.status(statusCode).json(errorJson)
} 

export default errorHandler