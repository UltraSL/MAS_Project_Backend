const routes = require("express").Router();

const StickerController = require("../../../controllers/sticker.controller");

routes.get("/getSticker/:id", StickerController.getStickerForVideo);

module.exports = routes;
