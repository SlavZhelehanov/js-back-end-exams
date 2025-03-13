import Recipe from "../models/Recipe.js";

export default {
    createRecipe(recipeData) {
        for (const key in recipeData) recipeData[key] = recipeData[key].trim();

        return Recipe.create(recipeData);
    },
    getAllRecipes(filter = null) {
        const search = filter ? {
            title: { $regex: filter.trim(), $options: "i" }
        } : {};

        return Recipe.find(search, "title image description");
    },
    getLastTreeAddedRecipes() {
        return Recipe.find({}).sort({ createdAt: -1 }).limit(3);
    },
    getOneRecipe(params) {
        return Recipe.findOne(params);
    },
    recommendRecipe(recipeId, newFanId) {
        return Recipe.findByIdAndUpdate(recipeId, { $push: { recommendList: newFanId } }, { new: true });
    },
    updateOneRecipe(_id, owner, recipe, formData) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != recipe[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;
        return Recipe.findOneAndUpdate({ _id, owner }, options, { new: true, runValidators: true });
    },
    deleteOneRecipe(_id, owner) {
        return Recipe.findOneAndDelete({ _id, owner });
    }
};