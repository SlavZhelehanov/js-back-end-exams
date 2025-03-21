import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import courseService from "../services/courseService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";
import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

const courseController = Router();

// CREATE
courseController.get("/create", isUser, (req, res) => {
    return res.render("course/create");
});
courseController.post("/create", isUser, async (req, res) => {
    const { title, type, certificate, image, description, price } = req.body;

    try {
        await courseService.createCourse({ title, type, certificate, image, description, price, owner: req.user.id });
        return res.redirect("/courses");
    } catch (error) {
        return res.render("course/create", { messages: parseErrorMessage(error), title, type, certificate, image, description, price });
    }
});

// CATALOG
courseController.get("/", async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();

        return res.render("course/catalog", { courses });
    } catch (error) {
        return res.render("course/catalog", { messages: parseErrorMessage(error) });
    }
});

// DETAILS
courseController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const course = await courseService.getOneCourse({ _id: req.params.id }, true);

        if (!course) return res.redirect("/404");

        const signedBy = 0 < course.signUpList.length ? course.signUpList.map(usr => usr = usr.username).join(", ") : false;
        const isOwner = course.owner.equals(req.user?.id);
        const isSignUp = req.user && !isOwner && course.signUpList.some(id => id.equals(req.user.id));

        return res.render("course/details", { course, isOwner, isSignUp, signedBy });
    } catch (error) {
        return res.render("course/details", { messages: parseErrorMessage(error) });
    }
});

// SIGN-Up
courseController.get("/:id/signUp", isUser, isValidId, async (req, res) => {
    try {
        const course = await courseService.getOneCourse({ _id: req.params.id }, false);

        if (!course) return res.redirect("/404");

        if (!req.user || course.owner.equals(req.user.id) || course.signUpList.some(id => id.equals(req.user.id))) return res.redirect("/404");

        await courseService.signUpToCourse(req.params.id, req.user.id);

        return res.redirect(`/courses/${req.params.id}/details`);
    } catch (error) {
        return res.render("course/details", { messages: parseErrorMessage(error) });
    }
});

// EDIT
courseController.get("/:id/edit", isUser, isValidId, async (req, res) => {
    try {
        const course = await courseService.getOneCourse({ _id: req.params.id, owner: req.user?.id }, false);

        if (!course) return res.redirect("/404");

        return res.render("course/edit", { course });
    } catch (error) {
        return res.render("course/edit", { messages: parseErrorMessage(error) });
    }
});
courseController.post("/:id/edit", isUser, isValidId, async (req, res) => {
    const formData = req.body;

    try {
        const course = await courseService.getOneCourse({ _id: req.params.id, owner: req.user?.id });

        if (!course) return res.redirect("/404");

        await courseService.updateOneCourse(req.params.id, req.user.id, course, formData);

        return res.redirect(`/courses/${req.params.id}/details`);
    } catch (error) {
        return res.render("course/edit", { course: formData, messages: parseErrorMessage(error) });
    }
});

// PROFILE
courseController.get("/profile", isUser, async (req, res) => {
    return res.render("course/profile");
});

export default courseController;