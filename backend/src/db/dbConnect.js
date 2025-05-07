const {connect} = require("mongoose");

const dbConnect = async()=>{
    try {
        
        return await connect(process.env.NODE_ENV == "prod" ? process.env.MONGO_URL_PROD : process.env.MONGO_URL_DEV);
    } catch (error) {
        console.log(error?.message);
        
        console.log("something went wrong while connecting to Database!",error.meessage);
        process.exit(1);
    }
}

module.exports = dbConnect;

