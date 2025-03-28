import Creature from "../models/Creature.js";

export default {
    createCreature(creatureData) {
        for (const key in creatureData) creatureData[key] = creatureData[key].trim();

        return Creature.create(creatureData);
    },
};