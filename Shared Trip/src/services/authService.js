import User from "../models/User.js";

export default {
    async register(userData) {
        for (const key in userData) if (userData[key]) userData[key] = userData[key].trim();

        if (userData.password != userData.rePassword) throw new Error("Password and repeat password must match!");

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
    },
    profile(userId) {
        return User.findById(userId).populate("tripsHistory", "startPoint endPoint date time");
    }
};