const routes = require('express').Router();

const DriverController = require("../../controllers/driver.controller");


routes.post("/addDriver", DriverController.addDriver);
routes.get("/getAllDrivers", DriverController.getAllDrivers);
routes.get("/getAvailableDrivers/:date", DriverController.getAvailableDrivers);



module.exports = routes;