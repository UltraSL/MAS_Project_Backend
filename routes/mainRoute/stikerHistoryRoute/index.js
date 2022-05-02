const routes = require("express").Router();
const StikerHistoryController = require("../../../controllers/stikerHistory.controller");

routes.post("/save", StikerHistoryController.saveSticker);
routes.get("/history/:owenerId", StikerHistoryController.getStikersById);

//getStikersById

module.exports = routes;