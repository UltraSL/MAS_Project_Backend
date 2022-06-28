const routes = require('express').Router();
const FeedbackController = require("../../controllers/feedback.controller");

routes.post("/addFeedback", FeedbackController.addFeedback);
routes.get("/getAllFeedbacks", FeedbackController.getAllFeedbacks);

module.exports = routes;