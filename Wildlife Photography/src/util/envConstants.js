export const PORT = process.env.PORT || 3000;

export const COOKIE_NAME = "Authentication";

export const SUPER_SECRET = "qBYqYN+mDWh0WUpmdy3Ck7gvonm+v3Uzf65cn2SbfhjkIhBUvtDHhSniaHEh1GOb";

// // Generate SUPER_SECRET
// import { randomBytes } from "crypto";
// randomBytes(48, (err, buff) => console.log(buff.toString("base64")));

const DB_NAME = "wildlifePhotography";
export const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;