const routes = require("express").Router();
const utils = require("../../../lib/utils");
const UserController = require("../../../controllers/user.controller");
const storage = require("../../../lib/multerConfig");

routes.post("/AddUser", storage.single("image"), UserController.addUser);
routes.post("/LoginUser", storage.single("image"), UserController.loginUser);


module.exports = routes;
