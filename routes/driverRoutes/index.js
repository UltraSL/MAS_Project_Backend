const routes = require('express').Router();

const DriverController = require("../../controllers/driver.controller");


routes.post("/addDriver", DriverController.addDriver);
routes.get("/getAllDrivers", DriverController.getAllDrivers);


module.exports = routes;