const notificationController = require("../../../controllers/notification.controller");
const routes = require("express").Router();
const utils = require("../../../lib/utils");

routes.post('/addNotification', utils.authMiddleware, notificationController.addNotification);
routes.get('/getUserNotification',utils.authMiddleware,  notificationController.getUserNotification);

module.exports = routes;