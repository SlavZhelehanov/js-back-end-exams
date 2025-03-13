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
    }
};