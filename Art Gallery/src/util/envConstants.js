export const PORT = process.env.PORT || 3000;

export const COOKIE_NAME = "Authentication";

export const SUPER_SECRET = "/2l9GJ8IPS0iGC4oJVI57C7FoOdQ4wMM2rgZY9sH6l4GF0rRMuAIpqQvkNe+FCS9";

// // Generate SUPER_SECRET
// import { randomBytes } from "crypto";
// randomBytes(48, (err, buff) => console.log(buff.toString("base64")));

const DB_NAME = "artGallery";
export const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;