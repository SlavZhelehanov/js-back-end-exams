import Auction from "../models/Auction.js";

export default {
    publishAuction(auctionData) {
        for (const key in auctionData) auctionData[key] = auctionData[key].trim();

        if (isNaN(+auctionData.price)) throw ["The price should be a positive number"];

        return Auction.create(auctionData);
    },
    getAllAuctions() {
        return Auction.find({}, "title image price");
    },
    getOneAuction(params) {
        return Auction.findOne(params).populate("bidder").populate("author");
    },
    bidAuction(auctionId, newFanId, price) {
        return Auction.findByIdAndUpdate(auctionId, { bidder: newFanId, price }, { new: true });
    }
};