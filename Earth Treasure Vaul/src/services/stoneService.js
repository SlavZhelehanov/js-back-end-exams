import Stone from "../models/Stone.js";

export default {
    createStone(stoneData) {
        for (const key in stoneData) stoneData[key] = stoneData[key].trim();
        return Stone.create(stoneData);
    },
};