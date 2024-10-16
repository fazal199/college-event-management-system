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

    // console.log(response);

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
        isfree: ticketprice == "0" ? true : false,
        categoryId: new mongoose.Types.ObjectId(category),
        languageId: new mongoose.Types.ObjectId(language),
        organiserId: new mongoose.Types.ObjectId(req.user._id),
        status: 'upcoming'
    });

    res.json(new ApiResponse(200, [], "Organiser Event Created!", "Event Created Successfully!"));

})

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

})

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
})

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
})

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
})

const getOnlyEventDataController = tryCatchBlock(async (req, res) => {

    const { eventId } = req.params;

    const eventsData = await EventModel.findById(eventId);

    res.status(200).json(new ApiResponse(200, eventsData, "Event Data Sent!", "Event Data Fetched Successfully!"));
});

const cancelRequestEventController = tryCatchBlock(async (req, res) => {
    const { eventId, reason } = req.body;

    await CancelEventModel.create({
        eventId: new mongoose.Types.ObjectId(eventId),
        organiserId: new mongoose.Types.ObjectId(req.user._id),
        reason
    })

    res.status(200).json(new ApiResponse(200, [], "Cancel Event Request Created!", "Cancel Event Request Sent to Admin!"));

})

const deleteEventController = tryCatchBlock(async (req, res) => {

    let { eventId } = req.params;
    eventId = new mongoose.Types.ObjectId(eventId)


    await EventModel.findByIdAndDelete(eventId);
    await JoinUsersModel.deleteMany({ eventId })
    await TransactionModel.deleteMany({ eventId })
    res.status(200).json(new ApiResponse(200, [], "Organiser Event Deleted!", "Event Deleted Successfully!"));

})

const getAllCancelEventRequestController = tryCatchBlock(async (req, res) => {
    const cancelEventsData = await EventModel.aggregate([
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
                date: {
                    $dateToString: { format: "%Y-%m-%d", date: { $first: "$eventData.date" } }
                }
            }
        }
    ])

    res.status(200).json(new ApiResponse(200, cancelEventsData, "Cancel Events Data Sent!", "Cancel Events Data Fetched Successfully!"));

});

const getCancelEventDataController = tryCatchBlock(async (req, res) => {
    //eventname,location,date
});

const cancelEventController = tryCatchBlock(async (req, res) => {
//1.joins evnets,orgainserinformations, joinusers
//2.count the no. of users
//3.date format thing
//4.projection the fields
});






module.exports = {
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
    cancelEventController
}