export const PORT = process.env.PORT || 3000;

export const COOKIE_NAME = "Authentication";

export const SUPER_SECRET = "etMJ6NAJHHubpAnhcn6ZehY7CAQsnoANnhbkPSxcqfdDbWpKuRN+Ov1PW1NZM7LB";

// // Generate SUPER_SECRET
// import { randomBytes } from "crypto";
// randomBytes(48, (err, buff) => console.log(buff.toString("base64")));

const DB_NAME = "friendlyWorld";
export const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;