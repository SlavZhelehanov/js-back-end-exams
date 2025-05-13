export const PORT = process.env.PORT || 3000;

export const COOKIE_NAME = "Authentication";

export const SUPER_SECRET = "hxflyzw9HITzWovbhdcthD7s3wZEayPkBXhFxZTZdTZDUrxtfUNQ26H1s1Va58mM";

// // Generate SUPER_SECRET
// import { randomBytes } from "crypto";
// randomBytes(48, (err, buff) => console.log(buff.toString("base64")));

const DB_NAME = "shatedTrip";
export const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;