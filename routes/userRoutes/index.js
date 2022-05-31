const routes = require("express").Router();
const storage = require("../../lib/multerConfig")
const UserController = require("../../controllers/user.controller");


routes.post("/AddUser",UserController.addUser);

routes.put("/EditUserImage/:id", 

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
routes.put("/EditUser/:id", UserController.updateUserDetailsByID);
routes.get("/profile/:id", UserController.getUser);
routes.get("/getAllUsers", UserController.getAllUsers);
routes.delete("/deleteUser/:id", UserController.deleteUser);
routes.get("/getMngByDepart/:department", UserController.getAllSupervisorsByDepartment);
routes.get("/resetPassword/:email", UserController.resetPassword);
routes.get("/changePassword/:email", UserController.changePassword);
 

//resetPassword
module.exports = routes;