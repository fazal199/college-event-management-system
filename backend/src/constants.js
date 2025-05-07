const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const ROLESID = {
    USERID: new mongoose.Types.ObjectId(`${process.env.USERID}`),
    ORGANISERID: new mongoose.Types.ObjectId(`${process.env.ORGANISERID}`),
};

const JWTCONSTANTS = {
    SECRETKEY: `${process.env.JWT_SECRET}`,
    EXPIRESDAY: `${process.env.JWT_EXPIRES}`
}

module.exports = {
    PORT,
    ROLESID,
    JWTCONSTANTS
}