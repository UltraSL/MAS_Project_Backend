const routes = require('express').Router();

const userRoutes = require("./userRoutes/index");
const requestRoutes = require("./transportRequestRoutes/index");


routes.use("/user", userRoutes);
routes.use("/request", requestRoutes);




module.exports = routes;
