const tryCatchBlock = (func,processandlocation) => async (req, res, next) => {
    try {
        await func(req, res, next);

    } catch (error) {
       
        console.log(error.message);
        console.log(processandlocation);
        
        res.status(error.statusCode || 500).json({
            success: false,
            devMessage: error.message,
            statusCode : error.statusCode || 500,
            clientMessage: error.clientMessage || "",
        })
    }
}

module.exports = tryCatchBlock;

