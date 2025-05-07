import Ad from "../models/Ad.js";

export default {
    getAllAds() {
        return Ad.find({}, "headline company location");
    }
};