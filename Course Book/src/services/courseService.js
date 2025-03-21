import Course from "../models/Course.js";

export default {
    createCourse(courseData) {
        for (const key in courseData) courseData[key] = courseData[key].trim();

        if (isNaN(+courseData.price)) throw ["The price should be a number"];

        return Course.create(courseData);
    }
};