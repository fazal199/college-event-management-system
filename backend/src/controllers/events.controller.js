const ApiError = require('../lib/utils/apiError.js');
const tryCatchBlock = require('../lib/utils/tryCatchBlock.js');
const OrganizerInfomationModel = require('../models/organisersinfo.model.js');
const ApiResponse = require('../lib/utils/apiResponse.js');
const EventModel = require('../models/events.model.js');
const uploadOnCloudinary = require('../lib/cloudinary/cloudinaryUpload.js');
const mongoose = require('mongoose');
const JoinUsersModel = require('../models/joinsusers.model.js');
const TransactionModel = require('../models/transactions.model.js');
const CancelEventModel = require('../models/cancelevents.model.js');
const UsersModel = require('../models/users.model.js');
const { fillMissingDates } = require('../lib/utils/utilityfunctions.js');
const { refundPayment } = require("../lib/utils/utilityfunctions.js");
const CategoryModel = require('../models/categories.model.js');
const LanguageModel = require('../models/languages.model.js');
const { JWTCONSTANTS, ROLESID } = require('../constants.js');
const jwt = require("jsonwebtoken");
const razorpay = require("../lib/razorpay/index.js");
const crypto = require("crypto");

const createEventController = tryCatchBlock(async (req, res) => {
    const {
        name,
        location,
        speakers,
        date,
        description,
        address,
        capacity,
        ticketprice,
        category,
        language,
    } = req.body;

    console.log(ticketprice);
    
    const organiser = await OrganizerInfomationModel.findOne({ userId: new mongoose.Types.ObjectId(req.user._id) }).select("activityStatus");

    if (organiser.activityStatus == "pending")
        throw new ApiError(401, "Admin has not Allowed to Create Events!", "Your Request is still is Pending, Thats Because Your Can't Create Events!");

    if (organiser.activityStatus == "rejected")
        throw new ApiError(401, "Admin has Rejected The Organiser!", "You have been Rejected by the Admin, Plzz Contact to know more!");

    if (organiser.activityStatus == "not-allowed")
        throw new ApiError(401, "Admin has took back the permission from The Organiser!", "Admin has took back the permission from you, Now You can't create events. Contact to know more!");

    // Get image file from multer
    const eventthumbnail = req.file.path;

    const response = await uploadOnCloudinary(eventthumbnail);


    // Create a new event document
    await EventModel.create({
        name,
        eventThumbnail: response?.url || "", // Save the filename of the uploaded image
        location,
        speakers,
        date: new Date(date),
        description,
        address,
        capacity: Number(capacity),
        ticketprice: Number(ticketprice),
        isFree: ticketprice == "0" ? true : false,
        categoryId: new mongoose.Types.ObjectId(category),
        languageId: new mongoose.Types.ObjectId(language),
        organiserId: new mongoose.Types.ObjectId(req.user._id),
        status: 'upcoming'
    });

    res.json(new ApiResponse(200, [], "Organiser Event Created!", "Event Created Successfully!"));
}, "something went wrong while creating event | events.controller.js -> createEventController!")

const updateEventController = tryCatchBlock(async (req, res) => {
    const { eventId } = req.params;
    const {
        name,
        location,
        speakers,
        date,
        time,
        description,
        address,
        capacity,
        ticketprice,
        category,
        language,
        eventthumbnail
    } = req.body;

    // Get image file from multer
    const newEventThumbnail = req.file?.path;
    let response, imgSrc;

    if (newEventThumbnail)
        response = await uploadOnCloudinary(newEventThumbnail);

    if (eventthumbnail)
        imgSrc = eventthumbnail

    else if (response?.url)
        imgSrc = response.url;

    else
        imgSrc = ""

    // Create a new event document
    await EventModel.findByIdAndUpdate(eventId, {
        name,
        eventThumbnail: imgSrc, // Save the filename of the uploaded image
        location,
        speakers,
        date: new Date(date),
        time,
        description,
        address,
        capacity: Number(capacity),
        ticketprice: Number(ticketprice),
        isfree: ticketprice == "0" ? true : false,
        categoryid: new mongoose.Types.ObjectId(category),
        languageid: new mongoose.Types.ObjectId(language),
        organiserId: new mongoose.Types.ObjectId(req.user._id),

    });

    res.json(new ApiResponse(200, [], "Organiser Event Updated!", "Event Information Updated Successfully!"));
}, "something went wrong while updating event | events.controller.js -> updateEventController!")

const getAllEventsController = tryCatchBlock(async (req, res) => {
    const allRecentEvents = await EventModel.aggregate(
        [
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryData"
                }
            },
            {
                $project: {
                    categoryname: { $first: "$categoryData.categoryname" },
                    name: 1,
                    date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" }
                    },
                    location: 1,
                    createdAt: 1,
                }
            },
            {
                $sort: {
                    createdAt: -1,
                }
            },
            {
                $addFields: {
                    status: {
                        $cond: [
                            { $gt: ["$date", "$currentDate"] }, // Check if eventDate is greater than current date (upcoming)
                            "upcoming",
                            {
                                $cond: [
                                    { $lt: ["$eventDate", "$currentDate"] }, // Check if eventDate is less than current date (expired)
                                    "expired",
                                    "ongoing" // If neither condition is true, it is ongoing
                                ]
                            }
                        ]
                    }
                }
            },
        ]
    )
    res.json(new ApiResponse(200, allRecentEvents, "All Recent Event Data Sent!", "All Recent Events Fetched Successfully!"));
}, "something went wrong while fetching all events | events.controller.js -> getAllEventsController!")

const getEventInsideDetailController = tryCatchBlock(async (req, res) => {

    const eventId = new mongoose.Types.ObjectId(req.query.eventId);

    const eventData = await EventModel.aggregate([
        {
            $match: {
                _id: eventId
            }
        },
        {
            $project: {
                date: {
                    $dateToString: { format: "%Y-%m-%d", date: "$date" }
                },
                capacity: 1,
                name: 1,
                organiserId: 1
            }
        },
        {
            $addFields: {
                status: {
                    $cond: [
                        { $gt: ["$date", "$currentDate"] }, // Check if eventDate is greater than current date (upcoming)
                        "upcoming",
                        {
                            $cond: [
                                { $lt: ["$eventDate", "$currentDate"] }, // Check if eventDate is less than current date (expired)
                                "expired",
                                "ongoing" // If neither condition is true, it is ongoing
                            ]
                        }
                    ]
                }
            }
        }
    ])
    const totalUsers = await JoinUsersModel.find({ eventId }).countDocuments();
    const orgData = await OrganizerInfomationModel.findOne({ userId: eventData[0].organiserId }, { organisername: 1 });
    const totalRupeesDocument = await TransactionModel.aggregate([
        {
            $match: {
                eventId: new mongoose.Types.ObjectId(eventId)
            }
        },
        {
            $group: {
                _id: null,
                totalRupees: {
                    $sum: "$ticketprice"
                }
            }
        }
    ])

    const totalRupees = totalRupeesDocument[0]?.totalRupees || 0;

    const registeredUsers = await JoinUsersModel.aggregate([

        {
            $match: {
                eventId: new mongoose.Types.ObjectId(eventId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userData"
            }
        },
        {
            $project: {
                username: {
                    $first: "$userData.username"
                },
                email: {
                    $first: "$userData.email"
                },
                date: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                }
            }
        }
    ]);

    res.status(200).json(new ApiResponse(200, { organiserName: orgData.organisername, capacity: eventData[0].capacity, eventName: eventData[0].name, status: eventData[0].status, totalRupees, totalUsers, registeredUsers }, "EventInside Data Sent!", "Event Inside Fetched Successfully!"));
}, "something went wrong while fetching event details | events.controller.js -> getEventInsideDetailController!")

const getRecentEventsController = tryCatchBlock(async (req, res) => {
    const allRecentEvents = await EventModel.aggregate(
        [
            {
                $match: {
                    organiserId: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryData"
                }
            },
            {
                $project: {
                    categoryname: { $first: "$categoryData.categoryname" },
                    name: 1,
                    date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" }
                    },
                    location: 1,
                    createdAt: 1,
                }
            },
            {
                $sort: {
                    createdAt: -1,
                }
            },
            {
                $addFields: {
                    status: {
                        $cond: [
                            { $gt: ["$date", "$currentDate"] }, // Check if eventDate is greater than current date (upcoming)
                            "upcoming",
                            {
                                $cond: [
                                    { $lt: ["$eventDate", "$currentDate"] }, // Check if eventDate is less than current date (expired)
                                    "expired",
                                    "ongoing" // If neither condition is true, it is ongoing
                                ]
                            }
                        ]
                    }
                }
            },
        ]
    )
    res.status(200).json(new ApiResponse(200, allRecentEvents, "Organiser Recent Event Data Sent!", "Organiser Recent Events Fetched Successfully!"));
}, "something went wrong while fetching recent events | events.controller.js -> getRecentEventsController!")

const getOnlyEventDataController = tryCatchBlock(async (req, res) => {

    const { eventId } = req.params;

    const eventsData = await EventModel.findById(eventId);

    res.status(200).json(new ApiResponse(200, eventsData, "Event Data Sent!", "Event Data Fetched Successfully!"));
}, "something went wrong while fetching single event data | events.controller.js -> getOnlyEventDataController!")

const cancelRequestEventController = tryCatchBlock(async (req, res) => {
    const { eventId, reason } = req.body;

    await CancelEventModel.create({
        eventId: new mongoose.Types.ObjectId(eventId),
        organiserId: new mongoose.Types.ObjectId(req.user._id),
        reason
    })

    res.status(200).json(new ApiResponse(200, [], "Cancel Event Request Created!", "Cancel Event Request Sent to Admin!"));
}, "something went wrong while creating cancel event request | events.controller.js -> cancelRequestEventController!")

const deleteEventController = tryCatchBlock(async (req, res) => {

    let { eventId } = req.params;
    eventId = new mongoose.Types.ObjectId(eventId)

    console.log(eventId);

    const event = await EventModel.aggregate([
        {
            $match: {
                _id: eventId
            }
        },
        {
            $lookup: {
                from: "joinusers",
                localField: "_id",
                foreignField: "eventId",
                as: "joinedUsers"
            }
        },
        {
            $addFields: {
                totalJoinedUsers: { $size: "$joinedUsers" },
            }
        }
    ]);

    // Check if the event exists
    if (!event.length) {
        throw new ApiError(404, "Event not found");
    }

    // Check if the event is paid and upcoming and has joined users
    if (!event[0].isFree && event[0].totalJoinedUsers > 0 && event[0].status != "upcoming") {

        const transactions = await TransactionModel.find({
            eventId
        }, { paymentId: 1, amount: 1 });

        //refunding all payments
        const refundAllPaymentPromises = transactions.map((transaction) => refundPayment(transaction.razorPayPaymentId, transaction.amount))

        await Promise.all(refundAllPaymentPromises);
    }

    // Clean up related data
    await TransactionModel.deleteMany({ eventId });
    await JoinUsersModel.deleteMany({ eventId });
    await EventModel.findByIdAndDelete(eventId);
    await CancelEventModel.findOneAndDelete({ eventId })

    res.status(200).json(new ApiResponse(200, [], "Organiser Event Deleted!", "Event Deleted Successfully!"));

}, "something went wrong while deleting event by admin | events.controller.js -> deleteEventController!")

const getAllCancelEventRequestController = tryCatchBlock(async (req, res) => {

    const cancelEventsData = await CancelEventModel.aggregate([
        {
            $match: {
                isCanceled: false
            }

        },
        {
            $lookup: {
                from: "events",
                localField: "eventId",
                foreignField: "_id",
                as: "eventData"
            }
        },
        {
            $project: {
                name: { $first: "$eventData.name" },
                location: { $first: "$eventData.location" },
                eventId: 1,
                date: {
                    $dateToString: { format: "%Y-%m-%d", date: { $first: "$eventData.date" } }
                }
            }
        }
    ])

    res.status(200).json(new ApiResponse(200, cancelEventsData, "Cancel Events Data Sent!", "Cancel Events Data Fetched Successfully!"));

}, "something went wrong while fetching all cancel event requests | events.controller.js -> getAllCancelEventRequestController!")

const getCancelEventDataController = tryCatchBlock(async (req, res) => {

    const { cancelEventId } = req.params;

    const cancelEventData = await CancelEventModel.findOne({ eventId: new mongoose.Types.ObjectId(cancelEventId) });

    const data = await CancelEventModel.aggregate([
        {
            $match: {
                eventId: new mongoose.Types.ObjectId(cancelEventData.eventId)
            }
        },
        {
            $lookup: {
                from: "events",
                localField: "eventId",
                foreignField: "_id",
                as: "eventData"
            }
        },
        {
            $lookup: {
                from: "organizerinformations",
                localField: "organiserId",
                foreignField: "userId",
                as: "organiserData"
            }
        },
        {
            $lookup: {
                from: "joinusers",
                localField: "eventId",
                foreignField: "eventId",
                as: "joinusersData"
            }
        },


        {
            $addFields: {
                categoryId: { $first: "$eventData.categoryId" }
            }
        },
        {
            $addFields: {
                languageId: { $first: "$eventData.languageId" }
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "categoryData"
            }
        },
        {
            $lookup: {
                from: "languages",
                localField: "languageId",
                foreignField: "_id",
                as: "languageData"
            }
        },

        {
            $project: {
                organisername: { $first: "$organiserData.organisername" },
                location: { $first: "$eventData.location" },
                language: { $first: "$eventData.language" },
                languagename: { $first: "$languageData.languagename" },
                categoryname: { $first: "$categoryData.categoryname" },
                address: { $first: "$eventData.address" },
                name: { $first: "$eventData.name" },
                capacity: { $first: "$eventData.capacity" },
                ticketprice: { $first: "$eventData.ticketprice" },
                description: { $first: "$eventData.description" },
                totalUsers: { $size: "$joinusersData" },
                reason: 1,

                date: {
                    $dateToString: {
                        format: "%B %d, %Y - %H:%M",
                        date: { $first: "$eventData.date" }
                    }
                }
            }
        }
    ]
    )

    res.status(200).json(new ApiResponse(200, data[0] || [], "Cancel Event Data Sent!", "Cancel Event Data Fetched Successfully!"));

}, "something went wrong while fetching cancel event data | events.controller.js -> getCancelEventDataController!")


const DashboardController = tryCatchBlock(async (req, res) => {
    const totalUsers = await UsersModel.aggregate([
        {
            $match : {
                roleId : ROLESID.USERID
            }
        },
        {
            $group: {
                _id: null,
                totalUsers: {
                    $sum: 1,
                }
            }
        }
    ])

    const totalOrganisers = await OrganizerInfomationModel.aggregate([
        {
            $group: {
                _id: null,
                totalOrganisers: {
                    $sum: 1,
                }

            }
        }
    ])

    const totalUpcomingEventRupees = await EventModel.aggregate([
        {
            $lookup: {
                from: "transactions",
                localField: "_id",
                foreignField: "eventId",
                as: "eventData"
            }
        },
        {
            $addFields: {
                ticketPrice: {
                    $first: "$eventData.ticketprice"
                }
            }
        },
        {
            $match: {
                status: "upcoming"
            }
        },
        {
            $group: {
                _id: null,
                totalRupees: {
                    $sum: "$ticketPrice"
                }
            }
        },
        {
            $project: {
                _id: 0,
            }
        }
    ]);



    const ArrayofTotalUsersLast7Days = await UsersModel.aggregate([
        {
            $match: {
                roleId: new mongoose.Types.ObjectId('66e98878d3520766f537a52a'),
                createdAt: {
                    $gt: new Date(new Date().setDate(new Date().getDate() - 7))
                }

            }
        },
        {

            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                "createdAt": 1
            }
        }

    ])

    let totalUsersLast7Days = fillMissingDates(ArrayofTotalUsersLast7Days);


    const ArrayofTotalOrganisersLast7Days = await UsersModel.aggregate([
        {
            $match: {
                roleId: new mongoose.Types.ObjectId('66e988b6d3520766f537a52b'),
                createdAt: {
                    $gt: new Date(new Date().setDate(new Date().getDate() - 7))
                }
            }
        },
        {
            // Group by the day and count the registrations
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                },
                count: { $sum: 1 } // Count the number of users per day
            }
        },
        {
            $sort: {
                "createdAt": 1
            }
        }

    ]);

    let totalOrganisersLast7Days = fillMissingDates(ArrayofTotalOrganisersLast7Days);


    res.status(200).json(new ApiResponse(200, {
        totalUsers: totalUsers[0]?.totalUsers || 0, totalOrganisers: totalOrganisers[0]?.totalOrganisers || 0, totalRupees: totalUpcomingEventRupees[0]?.totalRupees || 0, totalUsersLast7Days,
        totalOrganisersLast7Days
    }));
}, "something went wrong while fetching dashboard data | events.controller.js -> DashboardController!")

const getAllEventsForUsersController = tryCatchBlock(async (req, res) => {

    const options = {
        page: req.query.page || 1,
        limit: 9,
    };


    const myAggregate = EventModel.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $lookup: {
                from: "languages",
                localField: "languageId",
                foreignField: "_id",
                as: "language"
            }
        },
        {
            $addFields: {
                categoryname: { $first: "$category.categoryname" },
                languagename: { $first: "$language.languagename" },
            }
        },
        {
            $project: {
                category: 0,
                language: 0
            }
        },
        {
            $match: {
                $and: [
                    { date: { $gt: new Date(Date.now()) } },
                    {
                        languagename: {
                            $in: !req.query.language
                                ? await LanguageModel.distinct('languagename')
                                : req.query.language.split(",")
                        }
                    },
                    {
                        categoryname: {
                            $in: !req.query.category
                                ? await CategoryModel.distinct('categoryname')
                                : req.query.category.split(",")
                        }
                    },
                    {
                        isFree: !req.query.isfree
                            ? { $in: [true, false] }
                            : req.query.isfree.toLowerCase() === 'true'
                    },
                    {
                        ticketprice: {
                            $lte: req.query.ticketprice ? req.query.ticketprice == '0' ? Infinity : Number.parseFloat(req.query.ticketprice) : Infinity
                        }
                    }
                ]
            }
        },
        {
            $match: {
                $or: [
                    !req.query.search ? {} : {
                        name: {
                            $regex: req.query.search,
                            $options: 'i'
                        }
                    },
                    !req.query.search ? {} : {
                        description: {
                            $regex: req.query.search,
                            $options: 'i'
                        }
                    }
                ]
            }
        }
    ]);


    const results = await EventModel.aggregatePaginate(myAggregate, options);
    const maximumPriceCalculate = await EventModel.aggregate([
        {
            $group: {
                _id: null,
                maximumprice: {
                    $max: "$ticketprice"
                }
            }
        },
        {
            $project: {
                _id: 0,
                maximumprice: 1
            }
        }
    ]);

    res.json(new ApiResponse(200, { ...results, maximumprice: maximumPriceCalculate[0].maximumprice || null }, "Event Data Fetched Successfully!", "Events Fetched Successfully!"));
}, "something went wrong while fetching events filters data | events.controller.js -> getAllEventsForUsersController!")

const getEventByIdController = tryCatchBlock(async (req, res) => {
    const { eventId } = req.params;
    let isTokenExpired = true;
    let userId;
    const token = req?.cookies?.accessToken || req.headers?.authorization?.replace("Bearer", "").trim();


    //verifying token

    if (token) {
        try {
            let decodedToken = jwt.verify(token, JWTCONSTANTS.SECRETKEY);

            userId = decodedToken._id
            isTokenExpired = false;
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                isTokenExpired = true;
            }
        }
    }



    if (!eventId) {
        throw new ApiError(400, "Event ID is required", "something went wrong!");
    }




    const event = await EventModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(eventId)
            }
        },
        {
            $lookup: {
                from: "languages",
                localField: "languageId",
                foreignField: "_id",
                as: "language"
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $addFields: {
                languagename: { $first: "$language.languagename" },
                categoryname: { $first: "$category.categoryname" }
            }
        },
        {
            $project: {
                category: 0,
                language: 0
            }
        },
        {
            $lookup: {
                from: "joinusers",
                localField: "_id",
                foreignField: "eventId",
                as: "joinedUsers"
            }
        },
        {
            $addFields: {
                totalJoinedUsers: { $size: "$joinedUsers" },
                //here we are checking whether the current user has joined the requested event or not
                isJoined: !isTokenExpired ? (await JoinUsersModel.find({ userId: new mongoose.Types.ObjectId(userId), eventId: new mongoose.Types.ObjectId(eventId) })).length == 0 ? false : true : false
            }
        }
    ]);


    if (!event.length) {
        throw new ApiError(404, "Event not found");
    }

    res.json(new ApiResponse(200, event[0], "Event Data Fetched Successfully!", "Event Fetched Successfully!"));
}, "Something went wrong while fetching event data | events.controller.js -> getEventByIdController!")

//route ke saath controller attach nhi hai?
const getUserJoinedEventsController = tryCatchBlock(async (req, res) => {

    const userId = new mongoose.Types.ObjectId(req.user._id);

    const joinedEvents = await JoinUsersModel.aggregate([
        {
            $match: {
                userId: userId
            }
        },
        {
            $lookup: {
                from: "events",
                localField: "eventId",
                foreignField: "_id",
                as: "eventData"
            }
        },
        {
            $project: {
                eventId: 1,
                eventName: { $first: "$eventData.name" },
                location: { $first: "$eventData.location" },
                date: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: { $first: "$eventData.date" }
                    }
                }
            }
        },
        {
            $sort: {
                date: -1
            }
        }
    ]);

    res.status(200).json(new ApiResponse(
        200,
        joinedEvents,
        "User Joined Events Data Sent!",
        "User Joined Events Fetched Successfully!"
    ));
}, "something went wrong while fetching user joined events | events.controller.js -> getUserJoinedEventsController!")

//handle event registeration
const makeFreeUserRegisterController = tryCatchBlock(async (req, res) => {

    const userId = new mongoose.Types.ObjectId(req.user._id);
    const { eventId } = req.body;

    if (!userId)
        throw new ApiError(401, "User is not LoggedIn!", "Unathourized User!");

    await JoinUsersModel.create({
        userId,
        eventId: new mongoose.Types.ObjectId(eventId)
    })
    res.status(200).json(new ApiResponse(
        200,
        [],
        "User Registered Successfully!",
        "You have successfully registered in the Event!"
    ));
}, "something went wrong while registering the user for the free event | events.controller.js -> makeFreeUserRegisterController!")

//create orderId for the event payment
const createOrderIdforEventPaymentController = tryCatchBlock(async (req, res) => {
    const { amount } = req.body;

    const options = {
        amount: amount * 100, // Convert INR to paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,

    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(new ApiResponse(
        200,
        { order, keyId: process.env.RAZORPAY_KEY_ID, },
        "OrderId Generated Successfully!",
        "Payment Session Started!"
    ));
}, "something went wrong while generating orderId for the payment of the event | events.controller.js -> createOrderIdforEventPaymentController!")

//
const paymentVerificationforEventController = tryCatchBlock(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, eventId, amount, ticketprice } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');

    if (expectedSignature !== razorpay_signature)
        throw new ApiError(401, "Invalid Signature!", "Something Went Wrong!");

    const userId = req.user._id;

    await JoinUsersModel.create({
        userId,
        eventId
    })

    await TransactionModel.create({
        eventId,
        userId,
        ticketprice,
        amount,
        razorPayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_order_id,
        razorpayOrderId: razorpay_signature
    })

    res.status(200).json(new ApiResponse(
        200,
        [],
        "Payment Verified Successfully!",
        "Payment Successfully Verified!"
    ));
}, "something went wrong while verification of the event payment | events.controller.js -> paymentVerificationforEventController!")

const getTicketInfoController = tryCatchBlock(async (req, res) => {

    const eventId = new mongoose.Types.ObjectId(req.params.eventId);
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const joinInfo = await JoinUsersModel.findOne({
        eventId,
        userId
    })

    if (!joinInfo)
        throw new ApiError(401, "Event Not Found!", "Something Went Wrong!");

    const user = await UsersModel.findById(req.user._id);
    const event = await EventModel.aggregate([
        {
            $match: {
                _id: eventId,
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $lookup: {
                from: "languages",
                localField: "languageId",
                foreignField: "_id",
                as: "language"
            }
        },

        {
            $project: {
                categoryname: {
                    $first: "$category.categoryname"
                },
                languagename: {
                    $first: "$language.languagename"
                },

                name: 1,
                speakers: 1,
                location: 1,
                date: 1,
                address: 1,
                ticketprice: 1,

            }
        }

    ]);

    res.status(200).json(new ApiResponse(
        200,
        {
            username: user.username,
            useremail: user.email,
            ...event[0]
        },
        "Ticket Data Sent!",
        "Ticket Info Fetched!"
    ));
}, "something went wrong while fetching ticket info. of the event | events.controller.js -> getTicketInfoController!")


const cancelUserRegistrationController = tryCatchBlock(async (req, res) => {

    let { isfree, eventId } = req.body;
    let userId = req.user._id;

    userId = new mongoose.Types.ObjectId(userId);
    eventId = new mongoose.Types.ObjectId(eventId);

    //if the event is not free, then refund
    if (!isfree) {
        const transaction = await TransactionModel.findOne({
            userId,
            eventId
        })


        await refundPayment(transaction.razorPayPaymentId, transaction.amount)
    }

    //deleting the event joining entry
    await JoinUsersModel.deleteOne({
        eventId,
        userId
    })

    await TransactionModel.deleteMany({ eventId, userId })

    res.status(200).json(new ApiResponse(
        200,
        [],
        "Event Cancel Successfully!",
        "Event Cancellation Done Successfully!!"
    ));
}, "something went wrong while cancelling User Registration of the event | events.controller.js -> cancelUserRegistrationController!")

module.exports = {
    getAllEventsForUsersController,
    createEventController,
    updateEventController,
    getAllEventsController,
    getEventInsideDetailController,
    getRecentEventsController,
    getOnlyEventDataController,
    cancelRequestEventController,
    deleteEventController,
    getAllCancelEventRequestController,
    getCancelEventDataController,
    DashboardController,
    getEventByIdController,
    getUserJoinedEventsController,
    makeFreeUserRegisterController,
    createOrderIdforEventPaymentController,
    paymentVerificationforEventController,
    getTicketInfoController,
    cancelUserRegistrationController
}