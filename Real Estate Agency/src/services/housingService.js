import Housing from "../models/Housing.js";

export default {
    getAllHousings() {
        return Housing.find({}, "name description image location typeOfHousing");
    }
};