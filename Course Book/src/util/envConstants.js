export const PORT = process.env.PORT || 3000;

export const COOKIE_NAME = "Authentication";

export const SUPER_SECRET = "f/KB1sF8DEUf5Z9+zLDkObFaV2z7lzA3VZXnbubyqDVcMhLuBE/Wiu0OusBbUUmi";

// Generate SUPER_SECRET
// import { randomBytes } from "crypto";
// randomBytes(48, (err, buff) => console.log(buff.toString("base64")));

const DB_NAME = "courseBook";
export const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;