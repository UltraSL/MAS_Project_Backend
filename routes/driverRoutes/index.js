const routes = require('express').Router();

const DriverController = require("../../controllers/driver.controller");


routes.post("/addDriver", DriverController.addDriver);
routes.put("/updateWorkingDates/:driverId", DriverController.updateWorkingDates);
routes.get("/getAllDrivers", DriverController.getAllDrivers);
routes.get("/getAvailableDrivers/:date", DriverController.getAvailableDrivers);
routes.put("/updateVehicleTotalMilage/:driverId", DriverController.updateVehicleTotalMilage);
routes.put("/updateVehicleTotalMilageByUsername/:username", DriverController.updateVehicleTotalMilageByUsername);



module.exports = routes;