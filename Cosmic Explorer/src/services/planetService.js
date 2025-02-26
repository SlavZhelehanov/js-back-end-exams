import Planet from "../models/Planet.js";

export default {
    getAllPlanets(filter = null) {
        const search = filter?.name && filter?.solarSystem ? {
            name: { $regex: filter["name"], $options: "i" },
            solarSystem: { $regex: filter["solarSystem"], $options: "i" },
        } : {};

        return Planet.find(search, "name solarSystem image");
    }
};