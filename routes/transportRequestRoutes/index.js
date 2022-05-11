const routes = require('express').Router();

const TransportRequestController = require("../../controllers/transportRequest.controller");


routes.post("/sendRequest", TransportRequestController.sendRequest);
routes.get("/getAllRequests", TransportRequestController.getAllRequests);
routes.put("/updateRequestById/:id", TransportRequestController.updateRequestById);
routes.put("/approveRejectRequestById/:id", TransportRequestController.ApproveRejectRequestById);
routes.delete("/deleteRequestById/:id", TransportRequestController.deleteRequestById);
routes.get("/getAllRequestsByUserId/:id", TransportRequestController.getAllRequestsByUserId);
routes.get("/getAllRequestsByStatus/:status", TransportRequestController.getAllRequestsByStatus);
routes.get("/getRequestById/:id", TransportRequestController.getRequestById);




module.exports = routes;