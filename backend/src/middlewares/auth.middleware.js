const { JWTCONSTANTS } = require("../constants.js");
const ApiError = require("../lib/utils/apiError.js");
const ApiResponse = require("../lib/utils/apiResponse.js");
const tryCatchBlock = require("../lib/utils/tryCatchBlock")
const UsersModel = require('../models/users.model.js');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const authMiddleware = tryCatchBlock(async (req, res, next) => {



    const token = req?.cookies?.accessToken || req.headers?.authorization?.replace("Bearer", "").trim();


    //if token is not given then send error
    if (!token)
        throw new ApiError(401, "Unauthorized request!");

    let decodedToken;

    //verifying token
    try {

        decodedToken = jwt.verify(token, JWTCONSTANTS.SECRETKEY);

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new ApiError(401, "Jwt Token has Expired!", { isTokenExpired: true }, "Your Session has Expired! Plzz Login again!")
        }
    }

    //finding the user through the id which was sent in the token
    const user = await UsersModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(decodedToken._id)
            }
        },
        {
            $lookup: {
                from: "roles",
                localField: "roleId",
                foreignField: "_id",
                as: "userData"
            }
        },
        {
            $project: {
                usertype: {
                    $first: "$userData.usertype"
                },
                username: 1,
                email: 1,

            }
        },
        {
            $unset: ["usertype._id"]
        }
    ]);

    //if user didn't exist then the error would be sent
    if (!user)
        throw new ApiError(401, "Invalid token Access!");

    //perform join here to get the user role
    // console.log(user);

    req.user = user[0];

    next();

})

module.exports = {
    authMiddleware
}