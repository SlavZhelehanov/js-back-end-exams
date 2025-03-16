import Volcano from "../models/Volcano.js";

export default {
    createVolcano(volcanoData) {
        for (const key in volcanoData) volcanoData[key] = volcanoData[key].trim();
        return Volcano.create(volcanoData);
    },
    getAllVolcanos() {
        return Volcano.find({}, "nameOfTheVolcano image location typeOfVolcano");
    }
};