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
    },
    deleteOneElectronic(_id, owner) {
        return Electronic.findOneAndDelete({ _id, owner });
    },
    updateOneElectronic({ _id, owner, formData, electronic }) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != electronic[key]) options[key] = formData[key].trim();

        return Electronic.findOneAndUpdate({ _id, owner }, options, { runValidators: true });
    }
};