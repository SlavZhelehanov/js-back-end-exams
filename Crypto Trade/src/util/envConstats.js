// ------------------------- Change to your preference -------------------------

export const PORT = 3000;

export const COOKIE_NAME = "Authentication";

export const SUPER_SECRET = "qMUFyMEWHxQlIW+DlubDZnuAnfC8fVwtiQsHKWNgVhNAWPJzhbl/DMukCS2tpdOj";

const DB_NAME = "cryptoTrade";
export const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;

// import { randomBytes } from "crypto";
// randomBytes(48, (err, buf) => console.log(buf.toString("base64")));