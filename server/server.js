const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 5000;

// Setup body parser to translate request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));

// Serve "static assets" (html, css, client-side js)
// from the server/public folder
app.use(express.static('server/public'));

// Setup the songs router
// to respond to requests from the `/songs` URL
let songsRouter = require('./routes/songs');
app.use('/songs', songsRouter);

// Start the server
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});

