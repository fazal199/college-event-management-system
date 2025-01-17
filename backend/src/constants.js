const mongoose = require("mongoose");

const PORT = 3000;
const ROLESID = {
    USERID: new mongoose.Types.ObjectId('676d4b05ae7b9099698e8d32'),
    ORGANISERID: new mongoose.Types.ObjectId('676d4b15ae7b9099698e8d33')
};


const JWTCONSTANTS = {
    SECRETKEY: 'secretkey',
    EXPIRESDAY: '10d'
}

module.exports = {
    PORT,
    ROLESID,
    JWTCONSTANTS
}