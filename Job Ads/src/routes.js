import { Router } from "express";

import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import adsController from "./controllers/adController.js";

const routes = Router();

routes.use("/", homeController);

routes.use("/auth", authController);

routes.use("/ads", adsController);

routes.all("*", (req, res) => { return res.render("404") });

export default routes;