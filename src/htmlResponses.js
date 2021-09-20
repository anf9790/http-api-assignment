// Pulling in the file system module.
const fs = require('fs');

// Load files into memory
// This is a synchronous operation, so it's best done on startup.
// This method of file-loading only works because we have very few to load.
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// Function to get the index page:
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// Function to get css page:
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// Set out public exports to be used in other files (mainly server.js).
module.exports = {
  getIndex,
  getCSS,
};
