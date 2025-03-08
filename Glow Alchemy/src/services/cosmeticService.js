import Cosmetic from "../models/Cosmetic.js";

export default {
    getAllcosmetics() {
        return Cosmetic.find({}, "name image skin");
    }
};