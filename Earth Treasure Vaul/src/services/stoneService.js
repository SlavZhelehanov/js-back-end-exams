import Stone from "../models/Stone.js";

export default {
    createStone(stoneData) {
        for (const key in stoneData) stoneData[key] = stoneData[key].trim();
        return Stone.create(stoneData);
    },
    getAllStones() {
        return Stone.find({}, "name image category formula");
    },
    getLastTreeAddedStones() {
        return Stone.find({}).sort({ createdAt: -1 }).limit(3);
    },
    getOneStone(params) {
        return Stone.findOne(params);
    },
    likeToStone(stoneId, newFanId) {
        return Stone.findByIdAndUpdate(stoneId, { $push: { likedList: newFanId } }, { new: true });
    }
};