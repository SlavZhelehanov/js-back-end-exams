import Creature from "../models/Creature.js";

export default {
    createCreature(creatureData) {
        for (const key in creatureData) creatureData[key] = creatureData[key].trim();

        return Creature.create(creatureData);
    },
    getAllCreatures() {
        return Creature.find({}, "image name species description");
    },
    getOneCreature(params) {
        return Creature.findOne(params).populate("owner");
    }
};