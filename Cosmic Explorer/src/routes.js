import { Router } from "express";

const routes = Router();

routes.all("*", (req, res) => { return res.render("404"); });

export default routes;