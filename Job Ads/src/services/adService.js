import Ad from "../models/Ad.js";

export default {
    getAllAds(email = null) {
        if (email === "home") return Ad.find({}, "headline usersApplied").limit(3);
        if (email) return Ad.find({}, "headline company").populate("author", "email");

        return Ad.find({}, "headline company location");
    },
    getOneAd(params) {
        return Ad.findOne(params).populate("author", "email").populate("usersApplied").lean();
    },
    createAd(adData) {
        for (const key in adData) adData[key] = adData[key].trim();
        return Ad.create(adData);
    },
    applyToAd(adId, newFanId) {
        return Ad.findByIdAndUpdate(adId, { $push: { usersApplied: newFanId } }, { new: true });
    },
    deleteOneAd(_id, author) {
        return Ad.findOneAndDelete({ _id, author });
    },
    updateOneAd(_id, author, ad, formData) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != ad[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;
        return Ad.findOneAndUpdate({ _id, author }, options, { new: true, runValidators: true });
    }
};