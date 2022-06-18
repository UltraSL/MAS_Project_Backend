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
routes.put("/EditUser/:id", UserController.updateUserDetailsByID);
routes.get("/profile/:id", UserController.getUser);
routes.get("/getAllUsers", UserController.getAllUsers);
routes.delete("/deleteUser/:id", UserController.deleteUser);
routes.get("/getMngByDepart/:department", UserController.getAllSupervisorsByDepartment);
routes.get("/resetPassword/:email", UserController.resetPassword);
// routes.get("/changePassword/:email", UserController.changePassword);
routes.get("/getDriverByUserName/:username", UserController.getDriverByUserName);
 

//resetPassword
module.exports = routes;