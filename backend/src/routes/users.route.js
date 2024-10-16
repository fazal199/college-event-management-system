const { Router } = require("express");
const { userRegisterController, organisersRequestsController, getOrgainserDataController, organiserTakeorGivePermissionController, getAllUsersandOrganisersController, userLoginController, organisersRequestsPermissionController, userDataController, logoutUserController, organiserUpdateController } = require("../controllers/users.controller.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");

const usersRouter = Router();

usersRouter.route("/register").post(userRegisterController);
usersRouter.route("/login").post(userLoginController);
usersRouter.route("/user").get(authMiddleware, userDataController);
usersRouter.route("/logout").get(authMiddleware, logoutUserController);
usersRouter.route("/update/organiser").put(authMiddleware, organiserUpdateController);
usersRouter.route("/orgrequest").get(authMiddleware, organisersRequestsController);
usersRouter.route("/orgrequest/permission/:userId").put(authMiddleware, organisersRequestsPermissionController);
usersRouter.route("/getalluserandorganisers").get(authMiddleware, getAllUsersandOrganisersController);
usersRouter.route("/update/permission/:userId").put(authMiddleware, organiserTakeorGivePermissionController);
usersRouter.route("/getorganiser/:userId").get(authMiddleware, getOrgainserDataController);

module.exports = usersRouter;