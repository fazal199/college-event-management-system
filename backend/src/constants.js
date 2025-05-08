const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;


const userDatabaseId = `${process.env.USERID}`;
const organiserDatabaseId = `${process.env.ORGANISERID}`;


const ROLESID = {
    USERID: new mongoose.Types.ObjectId(userDatabaseId),
    ORGANISERID: new mongoose.Types.ObjectId(organiserDatabaseId),
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