import Trip from "../models/Trip.js";

export default {
    createTrip(tripData) {
        let messages = [];

        for (const key in tripData) tripData[key] = tripData[key].trim();

        if (isNaN(+tripData.price)) messages.push("The price should be a positive number");
        if (isNaN(+tripData.seats)) messages.push("The seats should be a positive number");
        if (0 < messages.length) throw messages;
        
        return Trip.create(tripData);
    },
    getAllTrips() {
        return Trip.find({}, "price time date startPoint endPoint image");
    }
};