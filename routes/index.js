const routes = require('express').Router();

const userRoutes = require("./userRoutes/index");
const requestRoutes = require("./transportRequestRoutes/index");
const driverRoutes = require("./driverRoutes/index")
const vehicleRoutes = require("./vehicleRoutes/index")


routes.use("/user", userRoutes);
routes.use("/request", requestRoutes);
routes.use("/driver", driverRoutes);
routes.use("/vehicle", vehicleRoutes);



module.exports = routes;
