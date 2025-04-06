import { Router } from "express";

import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import animalController from "./controllers/animalController.js";

const routes = Router();

routes.use("/", homeController);

routes.use("/auth", authController);

routes.use("/animals", animalController);

routes.all("*", (req, res) => { return res.render("404"); });

export default routes;