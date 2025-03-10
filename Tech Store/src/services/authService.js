import User from "../models/User.js";

export default {
    findOneUser(params) {
        return User.findOne(params);
    },
    createUser({ name, email, password, rePassword }) {
        name = name.trim();
        email = email.trim();
        password = password.trim();

        if(password != rePassword) throw ["The repeat password should be equal to the password"];
        
        return User.create({ name, email, password, rePassword });
    }
};