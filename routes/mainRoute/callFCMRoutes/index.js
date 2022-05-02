const callFcmController = require("../../../controllers/callFCM.controller");
const routes = require("express").Router();
const utils = require("../../../lib/utils");

routes.get('/getfcmCall', callFcmController.getfcmCall);

module.exports = routes;