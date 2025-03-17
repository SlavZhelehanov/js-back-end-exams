import express from "express";
import { engine } from 'express-handlebars';
import cookieParser from "cookie-parser";

import { dbConnection } from "./util/dbConnection.js";
import { parseErrorMessage } from "./util/parseErrorMessage.js";
import { PORT } from "./util/envConstats.js";
import { auth } from "./middlewares/authMiddleware.js";
import routes from "./routes.js";

// Define __dirname
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Establishing a database connection
try {
    await dbConnection();
} catch (error) {
    console.log(parseErrorMessage(error));
}

const app = express();

// Set view engine
app.engine('hbs', engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main',
    helpers: { setPageTitle(title) { this.pageTitle = title; } },
    runtimeOptions: { allowProtoPropertiesByDefault: true },
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Add middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(routes);

app.listen(PORT, console.log(`Server is listening on: http://localhost:${PORT}...`));