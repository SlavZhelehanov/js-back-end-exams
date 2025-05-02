import Auction from "../models/Auction.js";

export default {
    publishAuction(auctionData) {
        for (const key in auctionData) auctionData[key] = auctionData[key].trim();

        if (isNaN(+auctionData.price)) throw ["The price should be a positive number"];

        return Auction.create(auctionData);
    }
};