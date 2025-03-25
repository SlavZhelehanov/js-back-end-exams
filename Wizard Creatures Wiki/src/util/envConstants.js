export const PORT = process.env.PORT || 3000;

export const COOKIE_NAME = "Authentication";

export const SUPER_SECRET = "fxkB6RfI9zTHkSyG5aJR28LdJERyqStx9w95E/+2iONPMiYTYfV9RFQPgbRyeR82";

// // Generate SUPER_SECRET
// import { randomBytes } from "crypto";
// randomBytes(48, (err, buff) => console.log(buff.toString("base64")));

const DB_NAME = "wizardCreaturesWiki";
export const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;