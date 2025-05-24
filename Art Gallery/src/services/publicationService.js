import Publication from "../models/Publication.js";

export default {
    getAllPublications() {
        return Publication.find({}, "title usersShared picture certificate");
    },
    createPublication(publicationData) {
        for (const key in publicationData) publicationData[key] = publicationData[key].trim();

        return Publication.create(publicationData);
    },
    getOnePublication(params) {
        return Publication.findOne(params);
    },
    sharePublication(publicationId, newFanId) {
        return Publication.findByIdAndUpdate(publicationId, { $push: { usersShared: newFanId }, $inc: { seats: -1 } }, { new: true });
    }
};