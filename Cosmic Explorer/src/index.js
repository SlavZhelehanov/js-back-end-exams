import express from 'express';
import { engine } from 'express-handlebars';

// DEFINE __dirname
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import routes from './routes.js';

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
app.use(express.urlencoded({extended:false}));
app.use(routes);

app.listen(3000);