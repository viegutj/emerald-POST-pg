const pg = require('pg');

// Setup pg to connect to the database

// 'pool' is a pool of open connections with the database
// It's how we will talk to our database
const pool = new pg.Pool({
    // The name of your database. This will change for every app!
    database: 'music_library',
    // Where is your database? localhost === on your computer
    host: 'localhost',
    // Postgres is listening for connections at port 5432
    port: 5432
});

module.exports = pool;