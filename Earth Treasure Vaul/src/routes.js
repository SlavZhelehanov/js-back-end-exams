import { Router } from "express";

import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import stoneController from "./controllers/stoneController.js";

const routes = Router();

routes.use("/", homeController);

routes.use("/auth", authController);

routes.use("/stones", stoneController);

routes.all("*", (req, res) => { return res.render("404") });

export default routes;