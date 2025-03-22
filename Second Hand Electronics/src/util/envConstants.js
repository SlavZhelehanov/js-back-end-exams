export const PORT = process.env.PORT || 3000;

export const COOKIE_NAME = "Authentication";

export const SUPER_SECRET = "k6drpzM4rWQqD0tzzJ5ppD4vbwsuegBz4AqW5gm1B1x44l2S8bf4PSUSyt7P8X08";

// // Generate SUPER_SECRET
// import { randomBytes } from "crypto";
// randomBytes(48, (err, buff) => console.log(buff.toString("base64")));

const DB_NAME = "secondHandElectronics";
export const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;