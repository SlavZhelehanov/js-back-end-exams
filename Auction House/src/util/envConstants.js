export const PORT = process.env.PORT || 3000;

export const COOKIE_NAME = "Authentication";

export const SUPER_SECRET = "62m2VP/6SuquFeNiMRSvytFDfUy3b6qCaQA/ePs8RUN3YGRxTX3/vmP3aiUJU+ns";

// // Generate SUPER_SECRET
// import { randomBytes } from "crypto";
// randomBytes(48, (err, buff) => console.log(buff.toString("base64")));

const DB_NAME = "auctionHouse";
export const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;