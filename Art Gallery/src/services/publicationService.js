import Publication from "../models/Publication.js";

export default {
    getAllPublications() {
        return Publication.find({}, "title usersShared");
    }
};