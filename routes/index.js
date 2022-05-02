const routes = require('express').Router();
const stickerHistoryRoutes = require("./mainRoute/stikerHistoryRoute/index");
const userRoutes = require("./mainRoute/userRoute/index");
const videoRoutes = require("./mainRoute/videoRoute/index");
const StickerRoutes = require("./mainRoute/stickerRoute/index");
const PointRoutes = require("./mainRoute/pointRoute/index");
const productRoutes = require("./mainRoute/productRoutes/index");
const scheduledRoutes = require("./mainRoute/scheduleRoute/index")


const notificationRoutes = require("./mainRoute/notificationRoute/index");
const withdrawRoutes = require("./mainRoute/withdrawRoute/index");

const callFCMRoutes = require("./mainRoute/callFCMRoutes/index");
const live = require("./mainRoute/liveRoute/index");
const orderRoutes = require("./mainRoute/orderRoute/index");
const giftRoutes = require("./mainRoute/giftRoute")
const cartRoutes = require("./mainRoute/cartRoutes/index");



routes.use("/user", userRoutes);
routes.use('/video', videoRoutes);
routes.use('/product', productRoutes);
routes.use('/schedule', scheduledRoutes);

routes.use('/notification', notificationRoutes);
routes.use('/withdraw', withdrawRoutes)

routes.use('/', callFCMRoutes);
routes.use('/live', live);
routes.use('/sticker', StickerRoutes);
routes.use('/point', PointRoutes);
routes.use('/order', orderRoutes);
routes.use('/gift' , giftRoutes);
routes.use('/historySticker', stickerHistoryRoutes);
routes.use('/cart' , cartRoutes);



module.exports = routes;
