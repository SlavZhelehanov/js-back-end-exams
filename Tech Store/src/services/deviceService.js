import Device from "../models/Device.js";

export default {
    createDevice(deviceData) {
        for (const key in deviceData) deviceData[key] = deviceData[key].trim();

        if (isNaN(+deviceData.price)) throw ["The price should be a positive number"];

        return Device.create(deviceData);
    }
};