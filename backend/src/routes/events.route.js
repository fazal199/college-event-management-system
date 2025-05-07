const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { createEventController, getOnlyEventDataController,getAllCancelEventRequestController,
    getCancelEventDataController, cancelEventController, cancelRequestEventController, updateEventController, getAllEventsController, getRecentEventsController, getEventInsideDetailController, 
    DashboardController,
    getAllEventsForUsersController,
    getEventByIdController,
    getUserJoinedEventsController,
    makeFreeUserRegisterController,
    createOrderIdforEventPaymentController,
    paymentVerificationforEventController,
    getTicketInfoController,
    cancelUserRegistrationController,
    markEventasCompletedController,
    moveMoneytoOrganiserWalletController} = require("../controllers/events.controller");
const upload = require("../middlewares/multer.middleware");

const eventsRouter = Router();

eventsRouter.route("/create").post(authMiddleware, upload.single('eventthumbnail'), createEventController);
eventsRouter.route("/update/:eventId").post(authMiddleware, upload.single('eventthumbnail'), updateEventController);
eventsRouter.route("/allrecentevents").get(authMiddleware, getAllEventsController);
eventsRouter.route("/allrecenteventsorganiser").get(authMiddleware, getRecentEventsController);
eventsRouter.route("/eventinsidedetail").get(authMiddleware, getEventInsideDetailController);
eventsRouter.route("/event/updatestatus/:eventId").put(authMiddleware, markEventasCompletedController);
eventsRouter.route("/event/movemoneytoorganiserwallet").put(authMiddleware, moveMoneytoOrganiserWalletController);
eventsRouter.route("/geteventdata/:eventId").get(authMiddleware, getOnlyEventDataController);
eventsRouter.route("/canceleventrequest").put(authMiddleware, cancelRequestEventController);
eventsRouter.route("/cancel/:eventId").put(authMiddleware, cancelEventController);
eventsRouter.route("/getcanceleventrequests").get(authMiddleware, getAllCancelEventRequestController);
eventsRouter.route("/getcanceleventdata/:cancelEventId").get(authMiddleware, getCancelEventDataController);
eventsRouter.route("/dashboard").get(authMiddleware, DashboardController);
eventsRouter.route("/allevents").get(getAllEventsForUsersController);
eventsRouter.route("/allevents/:eventId").get(getEventByIdController);
eventsRouter.route("/allevents/events/userjoinevents").get(authMiddleware,getUserJoinedEventsController);
eventsRouter.route("/allevents/events/register/:eventId").post(authMiddleware,makeFreeUserRegisterController);
eventsRouter.route("/allevents/events/session").post(authMiddleware,createOrderIdforEventPaymentController);
eventsRouter.route("/allevents/event/verify").post(authMiddleware,paymentVerificationforEventController);
eventsRouter.route("/event/ticket/:eventId").get(authMiddleware,getTicketInfoController);
eventsRouter.route("/event/cancel").put(authMiddleware,cancelUserRegistrationController);

module.exports = eventsRouter;

