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
    }
};