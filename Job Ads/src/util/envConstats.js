// ------------------------- Change to your preference -------------------------

export const PORT = 3000;

export const COOKIE_NAME = "Authentication";

export const SUPER_SECRET = "U7zv82fxPOAPXxhD0y8AVHmP/BkTwuteRdHUg31dSzfZY/ttLmz/UML5cYMYBLeX";

const DB_NAME = "jobAds";
export const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;

import {randomBytes} from "crypto";
randomBytes(48, (err, buff) => console.log(buff.toString("base64")));