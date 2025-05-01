import { Router } from "express";

import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import auctionController from "./controllers/auctionController.js";

const routes = Router();

routes.use("/", homeController);

routes.use("/auth", authController);

routes.use("/auctions", auctionController);

routes.all("*", (req, res) => { return res.render("404"); });

export default routes;