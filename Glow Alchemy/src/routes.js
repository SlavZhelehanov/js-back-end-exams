import { Router } from "express";

import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import cosmeticController from "./controllers/cosmeticController.js";

const routes = Router();

routes.use("/", homeController);

routes.use("/auth", authController);

routes.use("/cosmetics", cosmeticController);

routes.all("*", (req, res) => { return res.render("404") });

export default routes;