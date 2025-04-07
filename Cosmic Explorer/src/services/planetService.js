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
    },
    deleteOnePlanet(_id, owner) {
        return Planet.findOneAndDelete({ _id, owner });
    },
    updateOnePlanet({ _id, owner, planet, formData }) {
		const options = {};
		
        for (const key in formData) if (formData[key].trim() != planet[key]) options[key] = formData[key].trim();

        return Planet.findOneAndUpdate({ _id, owner }, options, { runValidators: true });
    }
};