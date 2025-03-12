import mongoose from "mongoose";
import { DB_URI } from "./envConstants.js";

export const dbConnection = async () => {
    mongoose.connection.on('connected', () => console.log('DB is connected'));
    mongoose.connection.on('open', () => console.log('DB connections is open'));
    mongoose.connection.on('disconnected', () => console.log('DB is disconnected'));
    mongoose.connection.on('reconnected', () => console.log('DB is reconnected'));
    mongoose.connection.on('disconnecting', () => console.log('Db is disconnecting'));
    mongoose.connection.on('close', () => console.log('Db connection is close'));

    return await mongoose.connect(DB_URI);
}