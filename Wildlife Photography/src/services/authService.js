import User from "../models/User.js";

export default {
    async register(userData) {
        for (const key in userData) if (userData[key]) userData[key] = userData[key].trim();

        if (userData.password != userData.rePassword) throw new Error("Password and repeat password must match!");

        const user = await User.findOne({ username: userData.username });
        if (user) throw new Error("This username is already registered!");

        return User.create(userData);
    },
    async login(userData) {
        let messages = [];
        if (!userData.username || userData.username.length < 1) messages.push("username field can't be empty!");
        if (!userData.password || userData.password.length < 1) messages.push("Password field can't be empty!");
        if (0 < messages.length) throw messages;

        const user = await User.findOne({ username: userData.username });
        if (!user) throw new Error("Wrong username or password");

        const isValidPassword = await user.comparePassword(userData.password);
        if (!isValidPassword) throw new Error("Wrong username or password");

        return user;
    },
    // async profile(userId) {
    //     const user = await User.findById(userId, "username address myPublications");

    //     const [authored, shared] = await Promise.all([
    //         Publication.find({ _id: { $in: user.myPublications } }).select('title').lean(),
    //         Publication.find({ usersShared: userId }).select('title').lean()
    //     ]);

    //     return {
    //         username: user.username,
    //         address: user.address,
    //         authoredTitles: authored.map(p => p.title).join(", "),
    //         sharedTitles: shared.map(p => p.title).join(", ")
    //     };
    // }
};