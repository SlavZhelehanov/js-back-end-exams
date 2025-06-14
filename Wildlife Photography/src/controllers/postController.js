import { Router } from "express";

import parseErrorMessage from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import postService from "../services/postService.js";
// import { getTypeOfpost } from "../util/getTypeOfpost.js";
// import { validateQuery } from "../util/validateUrls.js";
import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

const postController = Router();

// ALL POSTS
postController.get("/", async (req, res) => {
    try {
        const posts = await postService.getAllPosts();

        return res.render("post/all-posts", { posts });
    } catch (error) {
        return res.render("post/all-posts", { messages: parseErrorMessage(error) });
    }
});

// DETAILS
postController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const post = await postService.getOnePost({ _id: req.params.id }).populate("author", "firstName lastName").populate("votes", "email").lean();

        
        console.log(post);
        

        if (!post) return res.redirect("/404");

        const isAuthor = post.author._id.equals(req?.user?.id);
        const isVoted = req.user && !isAuthor && post.votes.some(buddie => buddie._id.equals(req.user.id));

        post.votes = post.votes.join(", ");

        return res.render("post/details", { ...post, isAuthor, isVoted });
    } catch (error) {
        return res.render("post/details", { messages: parseErrorMessage(error) });
    }
});

// CREATE
postController.get("/create", isUser, (req, res) => {
    return res.render("post/create");
});
postController.post("/create", isUser, async (req, res) => {
    const { title, keyword, location, date, description, image } = req.body;

    try {
        await postService.createPost({ title, keyword, location, date, description, image, author: req.user.id });
        return res.redirect("/posts");
    } catch (error) {
        return res.render("post/create", { messages: parseErrorMessage(error), title, keyword, location, date, description, image });
    }
});

// EDIT
postController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("post/edit");
});

export default postController;