const routes = require("express").Router();
const storage = require("../../lib/multerConfig")
const UserController = require("../../controllers/user.controller");


routes.post("/AddUser",UserController.addUser);
routes.put("/EditUser/:id", 

storage.fields([
    {
      name: "image",
      maxCount: 1,
    },

  ])
, UserController.updateUserProfileByID);
routes.post("/Login", UserController.loginUser);
routes.post("/forgotpassword", UserController.forgotPassword);
routes.put("/resetpassword", UserController.resetPassword);
routes.get("/profile/:id", UserController.getUser);
routes.get("/getAllUsers", UserController.getAllUsers);
routes.delete("/deleteUser/:id", UserController.deleteUser);

module.exports = routes;