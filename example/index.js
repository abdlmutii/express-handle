const express = require('express');

const { handler } = require('express-handle');

const app = express();

const options = {

folder: './routes',

middlewares: [ /* array of middleware functions */ ],

params: { param1: "value1", param2: "value2" },

notfound: (req, res) => { /* custom 404 handler function */ },

tree: true // display route table

};

handler(app, options);

app.listen(3000, () => console.log('App is listening on port 3000'));
