const routes = require('express').Router();

const userRoutes = require("./userRoutes/index");
const requestRoutes = require("./transportRequestRoutes/index");
const driverRoutes = require("./driverRoutes/index")
const vehicleRoutes = require("./vehicleRoutes/index")
const emergencyRoutes = require("./emergencyRoutes/index")

routes.use("/user", userRoutes);
routes.use("/request", requestRoutes);
routes.use("/driver", driverRoutes);
routes.use("/vehicle", vehicleRoutes);
routes.use("/emergency", emergencyRoutes);



module.exports = routes;
