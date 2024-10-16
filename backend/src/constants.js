const mongoose = require("mongoose");

const PORT = 3000;
const ROLESID = {
    USERID: new mongoose.Types.ObjectId('66e98878d3520766f537a52a'),
    ORGANISERID: new mongoose.Types.ObjectId('66e988b6d3520766f537a52b')
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