import User from "../models/User.js";

export default {
    async register(userData) {
        let messages = [];

        for (const key in userData) userData[key] = userData[key].trim();

        if (userData.firstName.length === 0) messages.push("First name is required");
        if (userData.lastName.length === 0) messages.push("Last name is required");
        if (userData.password != userData.rePassword) messages.push("Password and repeat password must match!");
        if (0 < messages.length) throw messages;

            const user = await User.findOne({ email: userData.email });
        if (user) throw new Error("This email is already registered!");

        return User.create(userData);
    },
    async login(userData) {
        let messages = [];
        if (!userData.email || userData.email.length < 1) messages.push("Email field can't be empty!");
        if (!userData.password || userData.password.length < 1) messages.push("Password field can't be empty!");
        if (0 < messages.length) throw messages;

        const user = await User.findOne({ email: userData.email });
        if (!user) throw new Error("Wrong email or password");

        const isValidPassword = await user.comparePassword(userData.password);
        if (!isValidPassword) throw new Error("Wrong email or password");

        return user;
    }
};