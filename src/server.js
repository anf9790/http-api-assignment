const http = require('http'); // http module
const url = require('url'); // url module
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responseHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Creating an object to route requests to the proper handlers.
const urlStruct = {
  '/': htmlHandler.getIndex,
  '': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
  notFound: responseHandler.notFound,
};

// A function to handle requests.
const onRequest = (request, response) => {
  // First, parse information from the url (weirdly striked-through on my end).
  const parsedUrl = url.parse(request.url);

  // Getting the type and perameters from the request.
  const type = request.headers.accept.split(',');
  const params = query.parse(parsedUrl.query);

  // Checking to see if there is something in the urlStruct that can handle the input request.
  if (urlStruct[parsedUrl.pathname] && (parsedUrl.pathname === '/badRequest' || parsedUrl.pathname === '/unauthorized')) {
    console.log(parsedUrl.pathname);
    urlStruct[parsedUrl.pathname](request, response, type, params);
  } else if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, type);
  } else {
    urlStruct.notFound(request, response, type);
  }
};

// Start the server.
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
