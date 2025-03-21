import Disaster from "../models/Disaster.js";

export default {
    getAllDisasters(filter = null) {
        const search = filter?.nameOfTheDisaster ? {
            nameOfTheDisaster: { $regex: filter["nameOfTheDisaster"], $options: "i" },
            typeOfDisaster: { $regex: filter["typeOfDisaster"], $options: "i" },
        } : {};
        return Disaster.find(search, "nameOfTheDisaster image location typeOfDisaster");
    },
    createDisaster(disasterData) {
        for (const key in disasterData) disasterData[key] = disasterData[key].trim();
        return Disaster.create(disasterData);
    },
    getOneDisaster(params) {
        return Disaster.findOne(params);
    },
    interestedToDisaster(disasterId, newFanId) {
        return Disaster.findByIdAndUpdate(disasterId, { $push: { interestedList: newFanId } }, { new: true });
    },
    deleteOneDisaster(_id, owner) {
        return Disaster.findOneAndDelete({ _id, owner });
    },
    updateOneDisaster(_id, owner, disaster, formData) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != disaster[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;
        return Disaster.findOneAndUpdate({ _id, owner }, options, { new: true, runValidators: true });
    }
};