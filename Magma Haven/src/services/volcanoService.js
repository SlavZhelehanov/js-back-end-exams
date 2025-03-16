import Volcano from "../models/Volcano.js";

export default {
    createVolcano(volcanoData) {
        for (const key in volcanoData) volcanoData[key] = volcanoData[key].trim();
        return Volcano.create(volcanoData);
    },
    getAllVolcanos() {
        return Volcano.find({}, "nameOfTheVolcano image location typeOfVolcano");
    },
    getOneVolcano(params) {
        return Volcano.findOne(params);
    },
    voteToVolcano(volcanoId, newFanId) {
        return Volcano.findByIdAndUpdate(volcanoId, { $push: { voteList: newFanId } }, { new: true });
    }
};