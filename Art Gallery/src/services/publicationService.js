import Publication from "../models/Publication.js";

export default {
    getAllPublications() {
        return Publication.find({}, "title usersShared");
    },
    createPublication(publicationData) {
        for (const key in publicationData) publicationData[key] = publicationData[key].trim();

        return Publication.create(publicationData);
    },
};