export const PORT = process.env.PORT || 3000;

export const COOKIE_NAME = "Authentication";

export const SUPER_SECRET = "z49Q/LDM77zX1tZijztYlsQDuzZ5E3meNfulByPR/cE3ZWEu5ha7/YApaPZOBGOI";

// Generate SUPER_SECRET
// import { randomBytes } from "crypto";
// randomBytes(48, (err, buff) => console.log(buff.toString("base64")));

const DB_NAME = "techStore";
export const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;