import Animal from "../models/Animal.js";

export default {
    createAnimal(animal) {
        for (const key in animal) animal[key] = animal[key].trim();

        if (isNaN(animal.years)) throw new Error("The years should be a number between 1 and  100.");

        return Animal.create(animal);
    },
    getAllAnimals(search, filter) {
        return Animal.find(search, filter);
    },
};