import Course from "../models/Course.js";

export default {
    createCourse(courseData) {
        for (const key in courseData) courseData[key] = courseData[key].trim();

        if (isNaN(+courseData.price)) throw ["The price should be a number"];

        return Course.create(courseData);
    },
    getLastTreeAddedCourses() {
        return Course.find({}, "title type certificate price").sort({ createdAt: -1 }).limit(3);
    },
    getAllCourses() {
        return Course.find({}, "image title type price");
    },
    getOneCourse(params, details) {
        if (details) return Course.findOne(params).populate("signUpList").populate("owner");

        return Course.findOne(params);
    },
    signUpToCourse(courseId, newFanId) {
        return Course.findByIdAndUpdate(courseId, { $push: { signUpList: newFanId } }, { new: true });
    },
    updateOneCourse(_id, owner, course, formData) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != course[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;

        return Course.findOneAndUpdate({ _id, owner }, options, { new: true, runValidators: true });
    },
    deleteOneCourse(_id, owner) {
        return Course.findOneAndDelete({ _id, owner });
    }
};