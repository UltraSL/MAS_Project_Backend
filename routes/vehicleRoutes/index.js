const routes = require('express').Router();

const VehicleController = require("../../controllers/vehicle.controller");


routes.post("/addVehicle", VehicleController.addVehicle);
routes.get("/getAllVehicles", VehicleController.getAllVehicles);
routes.get("/getAvailableVehicles/:date", VehicleController.getAvailableVehicles);


module.exports = routes;