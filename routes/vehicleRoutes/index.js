const routes = require('express').Router();
const storage = require("../../lib/multerConfig")
const VehicleController = require("../../controllers/vehicle.controller");


routes.post("/addVehicle",storage.single('image'), VehicleController.addVehicle);
routes.get("/getAllVehicles", VehicleController.getAllVehicles);
routes.get("/getAvailableVehicles/:date", VehicleController.getAvailableVehicles);


module.exports = routes;