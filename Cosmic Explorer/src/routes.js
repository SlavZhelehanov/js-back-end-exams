import { Router } from "express";

import homeController from "./controllers/homeController.js";
import planetsController from "./controllers/planetsController.js";
import authController from "./controllers/authController.js";

const routes = Router();

routes.use("/", homeController);

routes.use("/auth", authController);

routes.use("/planets", planetsController);

routes.all("*", (req, res) => { return res.render("404"); });

export default routes;