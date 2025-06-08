import { Router } from "express";

import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import postController from "./controllers/postController.js";

const routes = Router();

routes.use("/", homeController);

routes.use("/auth", authController);

routes.use("/posts", postController);

routes.all("*", (req, res) => { return res.render("404"); });

export default routes;