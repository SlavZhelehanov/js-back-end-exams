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
    joinToTrip(tripId, newFanId) {
        return Trip.findByIdAndUpdate(tripId, { $push: { buddies: newFanId }, $inc: { seats: -1 } }, { new: true });
    },
    deleteOneTrip(_id, creator) {
        return Trip.findOneAndDelete({ _id, creator });
    },
    updateOneTrip(_id, creator, trip, formData) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != trip[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;
        return Trip.findOneAndUpdate({ _id, creator }, options, { new: true, runValidators: true });
    }
};