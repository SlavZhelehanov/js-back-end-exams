export const PORT = process.env.PORT || 3000;

export const COOKIE_NAME = "Authentication";

export const SUPER_SECRET = "dyhJXIhdRov35NPb2ZfNDyK8tgWkB1pk2FlIi434RDh7KB5dDY59KcD/qIEDYSBi";

// // Generate SUPER_SECRET
// import { randomBytes } from "crypto";
// randomBytes(48, (err, buff) => console.log(buff.toString("base64")));

const DB_NAME = "bookTalk";
export const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;