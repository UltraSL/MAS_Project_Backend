const routes = require("express").Router();
//const utils = require('../../../lib/utils');
const ScheduleController = require("../../../controllers/schedule.controller");

routes.post("/addSchedule", ScheduleController.addSchedule);
routes.get("/getAllSchedule", ScheduleController.getAllSchedule);

module.exports = routes;