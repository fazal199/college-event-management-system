const { ROLESID } = require('../constants.js');
const ApiError = require('../lib/utils/apiError.js');
const tryCatchBlock = require('../lib/utils/tryCatchBlock.js');
const OrganizerInfomationModel = require('../models/organisersinfo.model.js');
const UsersModel = require('../models/users.model.js');
const ApiResponse = require('../lib/utils/apiResponse.js');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//constants for following controllers
const options = {
    path: '/',
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: true, // Cookie is accessible only through HTTP (not JavaScript, e.g.)
}

const userRegisterController = tryCatchBlock(async (req, res) => {
    let { username, uemail, upassword, isUser, organiserName, organiserPhone, organiserUpiId } = req.body;

    let user = await UsersModel.findOne({ email: uemail });

    if (user)
        throw new ApiError(409, 'User Already Exist!', 'Email Already Exits');

    user = await UsersModel.create({
        username,
        email: uemail,
        password: upassword,
        roleId: isUser ? ROLESID.USERID : ROLESID.ORGANISERID
    })



    if (!isUser) {
        await OrganizerInfomationModel.create({
            organisername: organiserName,
            phoneno: organiserPhone,
            upiId: organiserUpiId,
            userId: user._id,
        })
    }


    const accessToken = await user.generateAcessToken();
    res.cookie('accessToken', accessToken, options);
    res
        .status(200)

        .json(
            new ApiResponse(200, {accessToken}, 'User Created Successfully!', 'Signup Successfully!')
        )
}, "something went wrong while registering user | users.controller.js -> userRegisterController!")

const userLoginController = tryCatchBlock(async (req, res) => {

    let { uemail, upassword } = req.body;

    const user = await UsersModel.findOne({ email: uemail });

    if (!user)
        throw new ApiError(409, "User Doesn't Exist", "User Doesn't Exist, Plzz Register first!");

    if (!user.isPasswordCorrect(upassword))
        throw new ApiError(409, "User Password is Wrong!", "Wrong Password, plzz Enter the correct password!");

    const accessToken = await user.generateAcessToken();
    console.log(accessToken);

    res.status(200)
        .cookie('accessToken', accessToken, options)
        .json(
            new ApiResponse(200,  {accessToken}, 'User Login Successfully!', 'Login Successfully!')
        )
}, "something went wrong while logging in user | users.controller.js -> userLoginController!")

const userDataController = tryCatchBlock(async (req, res) => {

    const organiserUser = await OrganizerInfomationModel.findOne({ userId: req.user._id }).select("-_id -userId -createdAt -updatedAt");
    res.json(new ApiResponse(200, { data: { username: req.user.username, userpassword: req.user.password, role: req.user.usertype, email: req.user.email, organiserData: organiserUser } }, "User Data Sent Successfully!", null))

}, "something went wrong while fetching user data | users.controller.js -> userDataController!")

const logoutUserController = tryCatchBlock(async (req, res) => {

    res.status(200).clearCookie('accessToken', options).json(new ApiResponse(200, null, "User Logged Out!", "User Logged out Successfully!"));
}, "something went wrong while logging out user | users.controller.js -> logoutUserController!")

const organiserUpdateController = tryCatchBlock(async (req, res) => {
    const { organiserName, organiserPhone, organiserUpiId } = req.body;

    // Find and update the organiser document, and return the updated document
    const updatedOrganiser = await OrganizerInfomationModel.findOneAndUpdate(
        { userId: new mongoose.Types.ObjectId(req.user._id) },
        {
            $set: {
                phoneno: organiserPhone,
                upiId: organiserUpiId,
                organisername: organiserName,

            },
        },
        { new: true, select: 'phoneno upiId organisername' } // This option returns the updated document with updated fields
    );

    // Return the updated organiser info in the response
    res.json(new ApiResponse(200, updatedOrganiser, "Organiser Information Successfully Updated!", "Your Information Successfully Updated!"));
}, "something went wrong while updating organiser information | users.controller.js -> organiserUpdateController!")


const organisersRequestsController = tryCatchBlock(async (req, res) => {

    const orgRequestsData = await UsersModel.aggregate([
        {
            $lookup: {
                from: "organizerinformations",
                localField: "_id",
                foreignField: "userId",
                as: "orgData"
            }
        },
        {
            $project: {
                "organiserData": {
                    $first: "$orgData"
                },
                email: 1,
                username: 1,
            }
        },
        {
            $match: {
                "organiserData.activityStatus": "pending"
            }
        },
        {
            $project: {
                "organisername": "$organiserData.organisername",
                email: 1,
                username: 1,
            }
        }

    ]);

    res.json(new ApiResponse(200, orgRequestsData, "Organiser Requests Data Sent Successfully!", "Fetched Organisers Pending Requests!"))

}, "something went wrong while fetching organiser requests | users.controller.js -> organisersRequestsController!")


const organisersRequestsPermissionController = tryCatchBlock(async (req, res) => {

    const userId = req.params.userId;
    const permission = Boolean(req.query.permission);


    if (permission) {
        await OrganizerInfomationModel.updateOne({ userId: new mongoose.Types.ObjectId(userId) }, {
            isPermissionAccepted: true,
            activityStatus: "allowed"
        });
    }

    else {
        await OrganizerInfomationModel.updateOne({ userId: orgId }, {
            isPermissionAccepted: true,
            activityStatus: "rejected"
        });
    }

    res.status(200).json(new ApiResponse(200, [], "Organiser Permssion Updated!", permission ? "Organiser Request Accepted!" : "Organiser Request Rejected!"))

}, "something went wrong while updating organiser permission | users.controller.js -> organisersRequestsPermissionController!")

const getAllUsersandOrganisersController = tryCatchBlock(async (req, res) => {

    const allUsersData = await UsersModel.aggregate(
        [
            {
                $lookup: {
                    from: "roles",
                    localField: "roleId",
                    foreignField: "_id",
                    as: "roleData"
                }
            },
            {
                $project: {
                    role: {
                        $first: "$roleData.usertype"
                    },
                    email: 1,
                    username: 1,
                    date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    }
                }
            },
            {
                $match: {
                    role: "user"
                }
            }
        ])

    const allOrganisersData = await UsersModel.aggregate(
        [
            {
                $lookup: {
                    from: "roles",
                    localField: "roleId",
                    foreignField: "_id",
                    as: "roleData"
                }
            },

            {
                $lookup: {
                    from: "organizerinformations",
                    localField: "_id",
                    foreignField: "userId",
                    as: "organiserData"
                }
            },
            {
                $project: {
                    role: {
                        $first: "$roleData.usertype"
                    },
                    email: 1,
                    username: 1,
                    organisername: { $first: "$organiserData.organisername" },
                    activityStatus: { $first: "$organiserData.activityStatus" },

                    date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    }
                }
            },
            {
                $addFields: {
                    isAllowed: {
                        $cond: [
                            { $eq: ["$activityStatus", "allowed"] },
                            true,
                            false
                        ]
                    }
                }
            },
            {
                $match: {
                    role: "organiser"
                }
            },

        ]
    );

    res.status(200).json(new ApiResponse(200, { usersData: allUsersData, organisersData: allOrganisersData }, "User and Organiser Data Sent!"))

}, "something went wrong while fetching all users and organisers | users.controller.js -> getAllUsersandOrganisersController!")

const organiserTakeorGivePermissionController = tryCatchBlock(async (req, res) => {

    const { userId } = req.params;
    const permission = req.query.permission === 'true' ? true : false;

    if (permission)
        await OrganizerInfomationModel.updateOne({ userId }, {
            $set: {
                activityStatus: "allowed"
            }
        })

    else
        await OrganizerInfomationModel.updateOne({ userId }, {
            $set: {
                activityStatus: "not-allowed"
            }
        })

    res.status(200).json(new ApiResponse(200, [], `Organiser Permission update and set to ${permission} !`))

}, "something went wrong while updating organiser permission status | users.controller.js -> organiserTakeorGivePermissionController!")

const getOrgainserDataController = tryCatchBlock(async (req, res) => {

    const { userId } = req.params;

    const userData = await UsersModel.findById(userId);

    const orgData = await OrganizerInfomationModel.findOne({ userId }, { userId: 0, activityStatus: 0, createdAt: 0, isPermissionAccepted: 0 })



    res.status(200).json(new ApiResponse(200, { name: orgData.organisername, username: userData.username, email: userData.email, phoneno: orgData.phoneno, upiId: orgData.upiId }, `Organiser Data Sent!`))

}, "something went wrong while fetching organiser data | users.controller.js -> getOrgainserDataController!")




module.exports = {
    userRegisterController,
    userLoginController,
    userDataController,
    logoutUserController,
    organiserUpdateController,
    organisersRequestsController,
    organisersRequestsPermissionController,
    getAllUsersandOrganisersController,
    organiserTakeorGivePermissionController,
    getOrgainserDataController
}