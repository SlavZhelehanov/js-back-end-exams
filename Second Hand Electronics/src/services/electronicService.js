import Electronic from "../models/Electronic.js";

export default {
    createElectronic(electronic) {
        for (const key in electronic) electronic[key] = electronic[key].trim();

        return Electronic.create(electronic);
    },
    getAllElectronics(filter = null) {
        let search = {};

        if (filter && 0 < Object.keys(filter).length) {
            if (filter.name && 0 < filter.name.trim().length && 0 === filter.type.trim().length) search = { name: new RegExp(filter.name.trim(), 'i') }
            else if (filter.name && 0 === filter.name.trim().length && 0 < filter.type.trim().length) search = { type: new RegExp(filter.type.trim(), 'i') }
            else if (filter.name && 0 < filter.name.trim().length && 0 < filter.type.trim().length) search = {
                $or: [
                    { name: new RegExp(filter.name.trim(), 'i') },
                    { type: new RegExp(filter.type.trim(), 'i') }
                ]
            }
        } 
        
        return Electronic.find(search, "name price image");
    },
    findOneElectronic(id) {
        return Electronic.findById(id);
    },
    buyOneElectronic(_id, fanId) {
        return Electronic.findOneAndUpdate({ _id }, { $push: { buyingList: fanId } });
    },
    deleteOneElectronic(_id, owner) {
        return Electronic.findOneAndDelete({ _id, owner });
    },
    updateOneElectronic({ _id, owner, formData, electronic }) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != electronic[key]) options[key] = formData[key].trim();

        return Electronic.findOneAndUpdate({ _id, owner }, options, { runValidators: true });
    }
};