import { Router } from "express";

// import parseErrorMessage from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
// import postService from "../services/postService.js";
// import { getTypeOfpost } from "../util/getTypeOfpost.js";
// import { validateQuery } from "../util/validateUrls.js";
// import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

const postController = Router();

// ALL POSTS
postController.get("/", async (req, res) => {
    return res.render("post/all-posts");
});

// DETAILS
postController.get("/:id/details", async (req, res) => {
    return res.render("post/details");
});

// CREATE
postController.get("/create", isUser, (req, res) => {
    return res.render("post/create");
});

// EDIT
postController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("post/edit");
});

export default postController;