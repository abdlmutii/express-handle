# express-handle

This is a Node.js package that automatically loads routes in an Express app from files in a specified folder. It also allows for customization of middleware and parameters for the loaded routes.

## Installation

```sh

npm install express-handle

```

## Usage

```js

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

```

## Route File Example

Here is an example of a route file that can be loaded:

```js

module.exports = {

name: '/hello',

method: 'GET',

description: 'Returns a hello message',

disabled: false,

run: (req, res) => {

   res.send('Hello World!');

  }

}

```

## Explanation:

Suppose we have a route file `routes/hello.js` as shown above. When we run the Express app with the auto loader and navigate to `http://localhost:3000/hello`, we will see the message "Hello World!" displayed in the browser.

Additionally, if the `tree` option is set to true, a table showing all loaded routes will be displayed in the console when the app is started.

```

Commands

┌────────┬──────────────────────┬────────┬─────────┐

│ Name │ Description │ Method │ Disabled│

├────────┼──────────────────────┼────────┼─────────┤

│ /hello │ Returns a hello message │ GET │ false │

└────────┴──────────────────────┴────────┴─────────┘

```

**Note:** To use the `params` option to pass parameters to the route file's `run` function, make sure to pass a stringified JSON object as the value of the option.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
<br>

**Email**: [abdlmutii@outlook.com](mailto:abdlmutii@outlook.com)

<br>

**Business Email**: [abdlmutii.buz@outlook.com](mailto:abdlmutii.buz@outlook.com)
