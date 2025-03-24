import Electronic from "../models/Electronic.js";

export default {
    createElectronic(electronic) {
        for (const key in electronic) electronic[key] = electronic[key].trim();

        return Electronic.create(electronic);
    },
    getAllElectronics() {
        return Electronic.find({}, "name price image");
    },
    findOneElectronic(id) {
        return Electronic.findById(id);
    },
    buyOneElectronic(_id, fanId) {
        return Electronic.findOneAndUpdate({ _id }, { $push: { buyingList: fanId } });
    }
};