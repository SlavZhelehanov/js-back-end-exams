import { Router } from "express";

import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import gameController from "./controllers/gameController.js";

const routes = Router();

routes.use("/", homeController);

routes.use("/auth", authController);

routes.use("/games", gameController);

routes.all("*", (req, res) => { return res.render("404") });

export default routes;