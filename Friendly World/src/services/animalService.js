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
    findOneAnimal(id) {
        return Animal.findById(id);
    },
    donateToOneAnimal(_id, fanId) {
        return Animal.findOneAndUpdate({ _id }, { $push: { donations: fanId } });
    },
    deleteOneAnimal(_id, owner) {
        return Animal.findOneAndDelete({ _id, owner });
    },
    updateOneAnimal({ _id, owner, animal, formData }) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != animal[key]) options[key] = formData[key].trim();

        if (options.years && isNaN(options.years)) throw new Error("The years should be a number between 1 and  100.");

        return Animal.findOneAndUpdate({ _id, owner }, options, { runValidators: true });
    }
};