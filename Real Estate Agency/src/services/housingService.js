import Housing from "../models/Housing.js";

export default {
    getAllHousings() {
        return Housing.find({}, "name description image location typeOfHousing");
    },
    createHousing(housingData) {
        for (const key in housingData) housingData[key] = housingData[key].trim();
        return Housing.create(housingData);
    },
    getOneHousing(params) {
        return Housing.findOne(params);
    },
    rentHousing(housingId, newFanId) {
        return Housing.findByIdAndUpdate(housingId, { $push: { rentedAhome: newFanId } }, { new: true });
    },
    deleteOneHousing(_id, owner) {
        return Housing.findOneAndDelete({ _id, owner });
    },
    updateOneHousing(_id, owner, housing, formData) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != housing[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;
        return Housing.findOneAndUpdate({ _id, owner }, options, { new: true, runValidators: true });
    }
};