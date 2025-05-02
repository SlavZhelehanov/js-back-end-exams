import Auction from "../models/Auction.js";

export default {
    publishAuction(auctionData) {
        for (const key in auctionData) auctionData[key] = auctionData[key].trim();

        if (isNaN(+auctionData.price)) throw ["The price should be a positive number"];

        return Auction.create(auctionData);
    },
    getAllAuctions(filter = {}, author = null) {
        if (author) return Auction.find(filter).populate("bidder");
        return Auction.find(filter, "title image price");
    },
    getOneAuction(params) {
        return Auction.findOne(params).populate("bidder").populate("author");
    },
    bidAuction(auctionId, newFanId, price) {
        return Auction.findByIdAndUpdate(auctionId, { bidder: newFanId, price }, { new: true });
    },
    closeAuction(auctionId) {
        return Auction.findByIdAndUpdate(auctionId, { isClosed: true }, { new: true });
    },
    updateOneAuction(_id, author, auction, formData) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != auction[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;
        return Auction.findOneAndUpdate({ _id, author }, options, { new: true, runValidators: true });
    }
};