import express from 'express';
import { engine } from 'express-handlebars';
import cookieParser from "cookie-parser";

// DEFINE __dirname
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import routes from './routes.js';
import { PORT } from './util/envConstants.js';
import { dbConnection } from './util/dbConnection.js';
import { auth } from './middlewares/authMiddleware.js';
import parseErrorMessage from './util/parseErrorMessage.js';

try {
    await dbConnection();
} catch (error) {
    console.log(parseErrorMessage(error));
}

const app = express();

// SET VIEW ENGINE
app.engine('hbs', engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main',
    runtimeOptions: { allowProtoPropertiesByDefault: true },
    helpers: { setPageTitle(title) { this.pageTitle = title; } },
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// MIDDLEWARES
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(routes);

app.listen(PORT, console.log(`Server listening on: http://localhost:${PORT}/...`));