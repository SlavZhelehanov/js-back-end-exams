import Game from "../models/Game.js";

export default {
    createGame(gameData) {
        for (const key in gameData) gameData[key] = gameData[key].trim();
        return Game.create(gameData);
    }
};