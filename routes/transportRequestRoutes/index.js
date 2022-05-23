const routes = require('express').Router();

const TransportRequestController = require("../../controllers/transportRequest.controller");


routes.post("/sendRequest", TransportRequestController.sendRequest);
routes.get("/getAllRequests", TransportRequestController.getAllRequests);
routes.put("/updateRequestById/:id", TransportRequestController.updateRequestById);
routes.put("/approveRejectRequestById/:id", TransportRequestController.ApproveRejectRequestById);
routes.delete("/deleteRequestById/:id", TransportRequestController.deleteRequestById);
routes.get("/getAllRequestsByUserId/:id", TransportRequestController.getAllRequestsByUserId);
routes.get("/getAllRequestsBySupervisor/:managerUserName", TransportRequestController.getAllRequestsBySupervisor);
routes.get("/getAllRequestsByStatus", TransportRequestController.getAllRequestsByStatus);
routes.get("/getRequestById/:id", TransportRequestController.getRequestById);
routes.put("/driverVehicleAssignById/:id", TransportRequestController.driverVehicleAssignById);
routes.put("/driverApproveRequestById/:id", TransportRequestController.driverApproveRequestById);
routes.get("/getAllRequestsByDriver/:assignedDriver", TransportRequestController.getAllRequestsByDriver);
routes.get("/getAllAcceptedRequests/:assignedDriver", TransportRequestController.getAllAcceptedRequests);

module.exports = routes;