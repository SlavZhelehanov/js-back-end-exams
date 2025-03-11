import Device from "../models/Device.js";

export default {
    getLastTreeAddedDevices() {
        return Device.find({}, "brand model price image").sort({ createdAt: -1 }).limit(3);
    },
    getAllDevices() {
        return Device.find({}, "brand model price cpu gpu screenSize price image");
    },
    createDevice(deviceData) {
        for (const key in deviceData) deviceData[key] = deviceData[key].trim();

        if (isNaN(+deviceData.price)) throw ["The price should be a positive number"];

        return Device.create(deviceData);
    }
};