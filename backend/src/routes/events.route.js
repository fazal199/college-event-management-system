const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { createEventController, getOnlyEventDataController,getAllCancelEventRequestController,
    getCancelEventDataController, deleteEventController,cancelEventController, cancelRequestEventController, updateEventController, getAllEventsController, getRecentEventsController, getEventInsideDetailController } = require("../controllers/events.controller");
const upload = require("../middlewares/multer.middleware");

const eventsRouter = Router();

eventsRouter.route("/create").post(authMiddleware, upload.single('eventthumbnail'), createEventController);
eventsRouter.route("/update/:eventId").post(authMiddleware, upload.single('eventthumbnail'), updateEventController);
eventsRouter.route("/allrecentevents").get(authMiddleware, getAllEventsController);
eventsRouter.route("/allrecenteventsorganiser").get(authMiddleware, getRecentEventsController);
eventsRouter.route("/eventinsidedetail").get(authMiddleware, getEventInsideDetailController);
eventsRouter.route("/geteventdata/:eventId").get(authMiddleware, getOnlyEventDataController);
eventsRouter.route("/canceleventrequest").put(authMiddleware, cancelRequestEventController);
eventsRouter.route("/delete/:eventId").delete(authMiddleware, deleteEventController);
eventsRouter.route("/getcanceleventrequests").get(authMiddleware, getAllCancelEventRequestController);
eventsRouter.route("/getcanceleventdata/:eventId").get(authMiddleware, getCancelEventDataController);
eventsRouter.route("/cancelevent").put(authMiddleware, cancelEventController);



module.exports = eventsRouter;