import Recipe from "../models/Recipe.js";

export default {
    createRecipe(recipeData) {
        for (const key in recipeData) recipeData[key] = recipeData[key].trim();

        return Recipe.create(recipeData);
    },
    getAllRecipes() {
        return Recipe.find({}, "title image description");
    },
    getLastTreeAddedRecipes() {
        return Recipe.find({}).sort({ createdAt: -1 }).limit(3);
    },
    getOneRecipe(params) {
        return Recipe.findOne(params);
    },
    recommendRecipe(recipeId, newFanId) {
        return Recipe.findByIdAndUpdate(recipeId, { $push: { recommendList: newFanId } }, { new: true });
    }
};