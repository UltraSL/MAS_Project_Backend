const routes = require("express").Router();
const utils = require("../../../lib/utils");
const UserController = require("../../../controllers/user.controller");
const storage = require("../../../lib/multerConfig");

routes.post("/AddUser", storage.single("image"), UserController.addUser);
routes.put("/EditUser/:id", storage.single("image"), UserController.updateUserProfileByID);
routes.post("/Login", UserController.loginUser);
routes.post("/forgotpassword", UserController.forgotPassword);
routes.put("/resetpassword", UserController.resetPassword);
routes.get("/profile/:id", UserController.getUser);
routes.post("/googlelogin", UserController.googlelogin);

routes.get("/followUser/:followUserId/:userId", UserController.followUser);
routes.get(
  "/getFollowersCount",
  utils.authMiddleware,
  UserController.getFollowers
);
routes.get(
  "/getFollowingsCount",
  utils.authMiddleware,
  UserController.getFollowings
);
routes.get("/getAllUsers", UserController.getAllUsers);

module.exports = routes;
