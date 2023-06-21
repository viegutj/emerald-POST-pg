const express = require('express');
// bring pool in from the pool.js file
// require(file-path-to-pool.js)
const pool = require('../modules/pool.js');
const router = express.Router();

let songs = [
    {
        rank: 355,
        artist: 'Ke$ha',
        track: 'Tik-Toc',
        published: '1/1/2009'
    },
    {
        rank: 356,
        artist: 'Gene Autry',
        track: 'Rudolph, the Red-Nosed Reindeer',
        published: '1/1/1949'
    },
    {
        rank: 357,
        artist: 'Oasis',
        track: 'Wonderwall',
        published: '1/1/1996'
    }
];




router.get('/', (req, res) => {
    // Get songs from the database
    // And send those database songs onto the client

    // Write our SQL query and save that in a variable
    let queryText = 'SELECT * FROM "songs" ORDER BY rank;';

    // Send SQL query to the database using pool.query
    pool.query(queryText)
        // Convention is to use the word 'result' to describe 
        // what we get back from the database
        .then((result) => {
            // result.rows is where the data we requested is 
            res.send(result.rows);
        })
        .catch((error) => {
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    console.log("Inside POST /, req.body:", req.body)

    let artist = req.body.artist
    let track = req.body.track
    let rank = req.body.rank
    let published = req.body.published

    // $Number is a placeholder for some value
        // Order doesnt matter, but the numbers do
    const queryText = `
        INSERT INTO "songs" (artist, track, rank, published)
        VALUES ($1, $2, $3, $4);
    `;

    const queryParams = [artist, track, rank, published]

    // To prevent SQL Injection, use parameters
        // Parameters have to be inside of an array
    pool.query(queryText, queryParams)
        .then((result) => {
            res.sendStatus(201)
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err)
            res.sendStatus(500)
        })
});

module.exports = router;