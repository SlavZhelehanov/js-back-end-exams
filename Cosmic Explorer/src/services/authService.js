import User from "../models/User.js";

export default {
    findOneUser(params) {
        return User.findOne(params);
    },
    createUser({ username, email, password, rePassword }) {
        username = username.trim();
        email = email.trim();
        password = password.trim();
        return User.create({ username, email, password, rePassword });
    }
};