import Volcano from "../models/Volcano.js";

export default {
    createVolcano(volcanoData) {
        for (const key in volcanoData) volcanoData[key] = volcanoData[key].trim();
        return Volcano.create(volcanoData);
    },
    getAllVolcanos(filter = null) {
        const search = filter?.nameOfTheVolcano ? {
            nameOfTheVolcano: { $regex: filter["nameOfTheVolcano"], $options: "i" },
            typeOfVolcano: { $regex: filter["typeOfVolcano"], $options: "i" },
        } : {};

        return Volcano.find(search, "nameOfTheVolcano image location typeOfVolcano");
    },
    getOneVolcano(params) {
        return Volcano.findOne(params);
    },
    voteToVolcano(volcanoId, newFanId) {
        return Volcano.findByIdAndUpdate(volcanoId, { $push: { voteList: newFanId } }, { new: true });
    },
    deleteOneVolcano(_id, owner) {
        return Volcano.findOneAndDelete({ _id, owner });
    },
    updateOneVolcano(_id, owner, volcano, formData) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != volcano[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;
        return Volcano.findOneAndUpdate({ _id, owner }, options, { new: true, runValidators: true });
    }
};