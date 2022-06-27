const routes = require('express').Router();
const FeedbackController = require("../../controllers/feedback.controller");

router.post("/addFeedback", FeedbackController.addFeedback);
router.get("/getAllFeedbacks", FeedbackController.getAllFeedbacks);

module.exports = routes;