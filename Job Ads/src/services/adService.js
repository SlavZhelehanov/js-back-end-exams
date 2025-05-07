import Ad from "../models/Ad.js";

export default {
    getAllAds() {
        return Ad.find({}, "headline company location");
    createAd(adData) {
        for (const key in adData) adData[key] = adData[key].trim();
        return Ad.create(adData);
    }
};