const express = require('express');
const path = require('path');
const ServerRenderer = require(path.resolve(path.resolve(process.cwd(), '.' + '/dist'), 'server.js')).default;

const app = express();

app.use('/dist', express.static(path.resolve(process.cwd(), '.' + '/dist')))

// load static files
app.use(express.static('public'))

app.use(ServerRenderer());

const PORT = process.env.PORT || 3000;

app.listen(PORT, error => {
    if (error) {
        return console.error(error);
    } else {
        console.log(`Production Express server running at http://localhost:${PORT}`);
    }
});

