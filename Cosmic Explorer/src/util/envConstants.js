export const PORT = process.env.PORT || 3000;

export const COOKIE_NAME = "Authentication";

export const SUPER_SECRET = "TZF97O5OXWO5ZvOCTxxGOfbE2FjRIqZVAGPi5Py9ceELspv13QZ7ySOnn4wtHUGR";

// Generate SUPER_SECRET
// import { randomBytes } from "crypto";
// randomBytes(48, (err, buff) => console.log(buff.toString("base64")));

const DB_NAME = "cosmicExplorer";
export const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;