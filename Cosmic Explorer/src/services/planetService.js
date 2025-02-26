import Planet from "../models/Planet.js";

export default {
    getAllPlanets(filter = null) {
        const search = filter?.name && filter?.solarSystem ? {
            name: { $regex: filter["name"], $options: "i" },
            solarSystem: { $regex: filter["solarSystem"], $options: "i" },
        } : {};

        return Planet.find(search, "name solarSystem image");
    },
    createPlanet(planet) {
        for (const key in planet) planet[key] = planet[key].trim();

        return Planet.create(planet);
    },
    findOnePlanet(id) {
        return Planet.findById(id);
    },
    likeOnePlanet(_id, fanId) {
        return Planet.findOneAndUpdate({ _id }, { $push: { likedList: fanId } });
    }
};