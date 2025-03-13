import { Router } from "express";

import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import recipeController from "./controllers/recipeController.js";

const routes = Router();

routes.use("/", homeController);

routes.use("/auth", authController);

routes.use("/recipes", recipeController);

routes.all("*", (req, res) => { return res.render("404", { pageTitle: "Page Not Found - " }); });

export default routes;