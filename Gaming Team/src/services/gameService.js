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
};