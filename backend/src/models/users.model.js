const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcyrpt = require("bcrypt");
const { JWTCONSTANTS } = require('../constants');


const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }
}, { timestamps: true });


//just before saving the data to database (don't use this keyoword)
UserSchema.pre("save", async function (next) {

  //hashing the password if it is modified!
  if (this.isModified("password")) {
    this.password = await bcyrpt.hash(this.password, 10);
  }
  next();
});

//method to check whether the password is right or not
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcyrpt.compare(password, this.password);
}

//method to generate token
UserSchema.methods.generateAcessToken = function () {
  const token = jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
  },
    JWTCONSTANTS.SECRETKEY
    ,
    {
      expiresIn: JWTCONSTANTS.EXPIRESDAY
    });

  return token;
}

const UsersModel = mongoose.model('User', UserSchema);
module.exports = UsersModel;
