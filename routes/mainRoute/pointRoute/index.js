const routes=require("express").Router();
const PointController = require("../../../controllers/point.controller");

routes.put("/updatePoint/:id",PointController.updatePoint);

module.exports=routes;