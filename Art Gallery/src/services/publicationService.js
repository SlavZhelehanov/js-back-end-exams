import User from "../models/User.js";
import Publication from "../models/Publication.js";

export default {
    getAllPublications() {
        return Publication.find({}, "title usersShared picture certificate");
    },
    async createPublication(publicationData) {
        for (const key in publicationData) publicationData[key] = publicationData[key].trim();

        const publication = await Publication.create(publicationData);
        return await User.findByIdAndUpdate(publicationData.author, { $push: { myPublications: publication._id } }, { new: true });
    },
    getOnePublication(params) {
        return Publication.findOne(params);
    },
    sharePublication(publicationId, newFanId) {
        return Publication.findByIdAndUpdate(publicationId, { $push: { usersShared: newFanId } }, { new: true });
    },
    updateOnePublication(_id, author, publication, formData) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != publication[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;
        return Publication.findOneAndUpdate({ _id, author }, options, { new: true, runValidators: true });
    },
    deleteOnePublication(_id, author) {
        return Publication.findOneAndDelete({ _id, author });
    }
};