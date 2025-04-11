import Game from "../models/Game.js";

export default {
    createGame(gameData) {
        for (const key in gameData) gameData[key] = gameData[key].trim();
        return Game.create(gameData);
    },
    getAllGames() {
        return Game.find({}, "name image platform genre price");
    },
    getOneGame(params) {
        return Game.findOne(params);
    },
    buyGame(gameId, newFanId) {
        return Game.findByIdAndUpdate(gameId, { $push: { boughtBy: newFanId } }, { new: true });
    },
    deleteOneGame(_id, owner) {
        return Game.findOneAndDelete({ _id, owner });
    },
    updateOneGame(_id, owner, game, formData) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != game[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;
        return Game.findOneAndUpdate({ _id, owner }, options, { new: true, runValidators: true });
    }
};