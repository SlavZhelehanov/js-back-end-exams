import Trip from "../models/Trip.js";
import User from "../models/User.js";

export default {
    async createTrip(tripData) {
        let messages = [];

        for (const key in tripData) tripData[key] = tripData[key].trim();

        if (isNaN(+tripData.price)) messages.push("The price should be a positive number");
        if (isNaN(+tripData.seats)) messages.push("The seats should be a positive number");
        if (0 < messages.length) throw messages;

        const trip = await Trip.create(tripData);
        return await User.findByIdAndUpdate(trip.creator, { $push: { tripsHistory: trip._id } }, { new: true });
    },
    getAllTrips() {
        return Trip.find({}, "price time date startPoint endPoint image");
    },
    getOneTrip(params) {
        return Trip.findOne(params);
    },
    }
};