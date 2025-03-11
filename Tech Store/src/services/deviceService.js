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
    },
    getOneDevice(params) {
        return Device.findOne(params);
    },
    updateOneDevice(_id, owner, device, formData) {
        const options = {};

        for (const key in formData) if (formData[key] != device[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;
        return Device.findOneAndUpdate({ _id, owner }, options, { new: true, runValidators: true });
    }
};