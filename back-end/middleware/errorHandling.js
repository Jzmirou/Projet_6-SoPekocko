

const errorHandling = (error, req, res, next) => {
    console.log(error);
    res.status(error.statusCode || 500).json({
        success : false,
        error: error.message || "Server Error"
    }) 
}
module.exports = errorHandling