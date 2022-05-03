const routes = require('express').Router();

const TransportRequestController = require("../../controllers/transportRequest.controller");


routes.post("/sendRequest", TransportRequestController.sendRequest);
routes.get("/getAllRequests", TransportRequestController.getAllRequests);
routes.put("/updateRequestById/:id", TransportRequestController.updateRequestById);
routes.delete("/deleteRequestById/:id", TransportRequestController.deleteRequestById);




module.exports = routes;