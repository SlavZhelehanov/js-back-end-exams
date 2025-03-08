import Cosmetic from "../models/Cosmetic.js";

export default {
    getLastTreeAddedCosmetics() {
        return Cosmetic.find({}, "name image skin").sort({ createdAt: -1 }).limit(3);
    },
    getAllCosmetics() {
        return Cosmetic.find({}, "name image skin");
    }
};