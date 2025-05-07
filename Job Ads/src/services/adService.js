import Ad from "../models/Ad.js";

export default {
    getAllAds() {
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
    }
};