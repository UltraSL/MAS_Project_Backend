const routes = require('express').Router();

const EmergencyController = require("../../controllers/emergency.controller");


routes.post("/AddEmergencies", EmergencyController.sendEmergency);
routes.put("/getAllEmergenciesByUserId/:id", EmergencyController.getAllEmergenciesByUserId);
routes.get("/getAllEmergencies", EmergencyController.getAllEmergencies);
routes.delete("/deleteEmergencyById/:id", EmergencyController.deleteEmergencyById);


module.exports = routes;