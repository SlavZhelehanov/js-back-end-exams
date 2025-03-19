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
    },
    deleteOneStone(_id, owner) {
        return Stone.findOneAndDelete({ _id, owner });
    },
    updateOneStone(_id, owner, stone, formData) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != stone[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;
        return Stone.findOneAndUpdate({ _id, owner }, options, { new: true, runValidators: true });
    }
};