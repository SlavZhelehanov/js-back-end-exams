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
    },
    voteForCreature(creatureId, newFanId) {
        return Creature.findByIdAndUpdate(creatureId, { $push: { votes: newFanId } }, { new: true });
    },
    updateOneCreature(_id, owner, creature, formData) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != creature[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;
        return Creature.findOneAndUpdate({ _id, owner }, options, { new: true, runValidators: true });
    },
    deleteOneCreature(_id, owner) {
        return Creature.findOneAndDelete({ _id, owner });
    }
};