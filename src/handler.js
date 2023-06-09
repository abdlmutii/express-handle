const fs = require('fs');
const path = require('path');
const CliTable = require("cli-table");

async function handler(app, options) {
  let { folder = "./routes", middlewares = [], params = "{}", notfound, tree = true } = options;

  const readDirRecursive = async (dir) => {
    let result = [];
    const files = await fs.promises.readdir(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = await fs.promises.stat(filePath);
      if (stats.isDirectory()) {
        result = [...result, ...(await readDirRecursive(filePath))];
      } else if (stats.isFile()) {
        result.push(filePath);
      }
    }

    return result;
  };
  let files = await readDirRecursive(folder);
  middlewares.forEach(middleware => {
    app.use(middleware);
  });
  files.forEach(f => {
    f = `../../${f}`
    let ef = require(f);
console.log(ef)

    if(ef.disabled == true) return;
    if(!ef.run) throw Error("You should have `run` function. it have your route code.");
    if(!ef.name) throw Error("You should have `name` proprety. it is your route name.");
    if(!ef.method) ef.method = "GET";
    app[ef.method.toLowerCase()](ef.name, (req, res) => {
      try {
        const sendRegex = /res\.send\(['"](.*)['"]\)/;
  const sendMatch = ef.run.toString().match(sendRegex);
  if (sendMatch) {
    const responseString = sendMatch[1];
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
        body {
        font-family: Arial, nonoscape, sans-srif;
        }
        </style>
        <title>Express app</title>
      </head>
      <body>
        ${responseString}
      </body>
      </html>
    `);
        }
      if(params === "{}") ef.run(req, res);
      else ef.run(req,res, eval(params));
      } catch (error) {
        
      }
  });
});

  if(notfound) {
    app.use(notfound);
  } else {
    let frtyfour = (req, res) => {
      res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>404 - Unrecognizable</title>
          <meta name="viewport" content="width=device-width">
          <style>
            body {
              background-color: #000;
              color: #fff;
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 50px;
            }
            h1 {
              font-size: 72px;
              margin: 0;
              padding: 0;
            }
            .line {
              display: inline-block;
              background-color: #fff;
              width: 2px;
              height: 120px;
              margin: 0 20px;
              vertical-align: middle;
            }
          </style>
        </head>
        <body>
          <h1>404</h1>
          <div class="line"></div>
          <p>Unrecognizable route (${req.baseUrl || "/"})</p>
        </body>
        </html>
      `);
    };
    app.use(frtyfour);
  }
if (tree) {
  const table = new CliTable({
    head: ["Name", "Description", "Method", "Disabled"], 
  });

  files.forEach((f) => {
    f = `../../${f}`;
    let ef = require(f);
    if (ef.disabled == true) return;
    if (!ef.run) throw Error("You should have `run` function. it have your route code.");
    if (!ef.name) throw Error("You should have `name` proprety. it is your route name.");
    if (!ef.method) ef.method = "GET";

    table.push([`\u001b[1m${ef.name}\u001b[0m`, `\u001b[1m${ef.description || ""}\u001b[0m` || "", `\u001b[1m\u001b[34m${ef.method.toUpperCase()}\u001b[0m`, `\u001b[1m\u001b[31m${ef.disabled || false}\u001b[0m`]);
  });
const text = "\u001b[1mCommands\u001b[0m";
const width = process.stdout.columns;
const padding = " ".repeat(Math.floor((width - text.length) / 2));

console.log(padding + text.padStart(padding.length + text.length / 2));
  console.log(table.toString());
        }
}

module.exports = { handler };
