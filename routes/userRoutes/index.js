const routes = require("express").Router();

const UserController = require("../../controllers/user.controller");


routes.post("/AddUser",  UserController.addUser);
routes.post("/LoginUser",  UserController.loginUser);


module.exports = routes;