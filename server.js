const express = require('express');
const fs = require('fs');
const app = express();
const hbs = require('hbs');

// middlewares
hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');
app.use(express.static(`${__dirname}/public`));

app.use((request, response, next) => {
    const now = new Date();
    const info = `${now } ${ request.hostname +request.method} ${request.url}`;

    fs.appendFileSync('./server.log', `${info + '\n\n'}`);
    next();
});

hbs.registerHelper('currentYear', () => new Date().getFullYear());


// routes
app.get('/', (request, response) => {
    const title = "Home";
    response.render('pages/home.hbs', {title});
});


app.get('/about', (request, response) => {
    const title = "About";
    response.render('pages/about.hbs', {title});
});

app.listen(3000);