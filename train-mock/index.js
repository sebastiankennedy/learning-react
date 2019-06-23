const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.status(200);
    response.send('hello express');
    response.end();
});

app.get('/rest', (request, response) => {
    response.json({
        result: 1,
        message: 'hello'
    })
});

app.listen(5000);