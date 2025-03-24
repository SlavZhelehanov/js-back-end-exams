import Electronic from "../models/Electronic.js";

export default {
    createElectronic(electronic) {
        for (const key in electronic) electronic[key] = electronic[key].trim();

        return Electronic.create(electronic);
    },
    getAllElectronics() {
        return Electronic.find({}, "name price image");
    }
};