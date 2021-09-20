/* --- Function to respond with a JSON object. ---*/
//  This function takes a request, response, status code and an object to send.
//  This function is used by all other JSON functions in this file.
const respondJSON = (request, response, status, object) => {
  // Content-Type for json.
  const headers = {
    'Content-Type': 'application/json',
  };

  // Sending the response with the json object.
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

/* --- Function to respond with an XML object. ---*/
//  This function takes a request, response, status code and an object to send.
//  This function is used by all other XML functions in this file.
const respondXML = (request, response, status, object) => {
  // Content-Type for xml.
  const headers = {
    'Content-Type': 'text/xml',
  };

  // Sending the response with the xml object.
  response.writeHead(status, headers);
  response.write(object);
};

/* --- Function for a successful response. ---*/
const success = (request, response, type) => {
  console.log(type);
  if (type === 'text/xml') {
    // Creating a success message for the response.
    const responseXML = `<response>
      <message>This is a successful response.</message>                  
      </response>`;
      console.log(responseXML);
    // Return a 200 with the proper response.
    respondXML(request, response, 200, responseXML);
  } else {
    // Creating a success message for the response.
    const responseJSON = {
      message: 'This is a successful response.',
    };

    // Return a 200 with the proper response.
    respondJSON(request, response, 200, responseJSON);
  }
};

/* --- Function for a bad request. ---*/
const badRequest = (request, response, type, parameter) => {
  // Figuring out which status code and message to send.
  let messageString = '';
  let responseNum = 0;

  if (parameter.valid || parameter.valid === 'true') {
    messageString = "This is a successful response (there's no missing query peram).";
    responseNum = 200;
  } else {
    messageString = 'Missing valid query parameter set to true.';
    responseNum = 400;
  }

  // Formatting the response with the correct type.
  if (type === 'text/xml') {
    // Creating a message for the response.
    const responseXML = `<response>
      <message>${messageString}</message>     
      <id>badRequest</id>             
      </response>`;

    // Return the proper response.
    respondXML(request, response, responseNum, responseXML);
  } else {
    // Creating a message for the response.
    const responseJSON = {
      message: messageString,
      id: 'badRequest',
    };

    // Return the proper response.
    respondJSON(request, response, responseNum, responseJSON);
  }
};

/* --- Function for an unauthorized request. ---*/
const unauthorized = (request, response, type, parameter) => {
  // Figuring out which status code and message to send.
  let messageString = '';
  let responseNum = 0;

  if (parameter.loggedIn || parameter.loggedIn === 'true') {
    messageString = "This is a successful response (there's no missing query peram).";
    responseNum = 200;
  } else {
    messageString = 'Missing loggedIn query parameter set to yes.';
    responseNum = 401;
  }

  // Formatting the response with the correct type.
  if (type === 'text/xml') {
    // Creating a message for the response.
    const responseXML = `<response>
      <message>${messageString}</message>     
      <id>unauthorized</id>             
      </response>`;

    // Return the proper response.
    respondXML(request, response, responseNum, responseXML);
  } else {
    // Creating a message for the response.
    const responseJSON = {
      message: messageString,
      id: 'unauthorized',
    };

    // Return the proper response.
    respondJSON(request, response, responseNum, responseJSON);
  }
};

/* --- Function for a forbidden response. ---*/
const forbidden = (request, response, type) => {
  if (type === 'text/xml') {
    // Creating a message for the response.
    const responseXML = `<response>
      <message>You do not have access to this content.</message>                  
      <id>forbidden</id>
      </response>`;

    // Return a 403 with the proper response.
    respondXML(request, response, 403, responseXML);
  } else {
    // Creating a message for the response.
    const responseJSON = {
      message: 'You do not have access to this content.',
      id: 'forbidden',
    };

    // Return a 403 with the proper response.
    respondJSON(request, response, 403, responseJSON);
  }
};

/* --- Function for an internal error response. ---*/
const internal = (request, response, type) => {
  if (type === 'text/xml') {
    // Creating a message for the response.
    const responseXML = `<response>
      <message>Internal Server Error: Something went wrong..</message>                  
      <id>internalError</id>
      </response>`;

    // Return a 500 with the proper response.
    respondXML(request, response, 500, responseXML);
  } else {
    // Creating amessage for the response.
    const responseJSON = {
      message: 'Internal Server Error: Something went wrong.',
      id: 'internalError',
    };

    // Return a 500 with the proper response.
    respondJSON(request, response, 500, responseJSON);
  }
};

/* --- Function for a not implemented response. ---*/
const notImplemented = (request, response, type) => {
  if (type === 'text/xml') { // else if the type === 'text/xml'
    // Creating a message for the response.
    const responseXML = `<response>
      <message>A get request for this page has not been implemented yet. Check again later for updated content.</message>                  
      <id>notImplemented</id>
      </response>`;

    // Return a 501 with the proper response.
    respondXML(request, response, 501, responseXML);
  } else {
    // Creating a message for the response.
    const responseJSON = {
      message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
      id: 'notImplemented',
    };

    // Return a 501 with the proper response.
    respondJSON(request, response, 501, responseJSON);
  }
};

/* --- Function for 404 not found requests with message. ---*/
const notFound = (request, response, type) => {
  if (type === 'text/xml') { // else if the type === 'text/xml'
    // Creating an error message for the response.
    const responseXML = `<response>
      <message>The page you are looking for was not found.</message>                  
      <id>notFound</id>
      </response>`;

    // Return a 404 with an error message.
    respondXML(request, response, 404, responseXML);
  } else {
    // Creating error message for the response.
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };

    // Return a 404 with an error message.
    respondJSON(request, response, 404, responseJSON);
  }
};

// Set out public exports to be used in other files (mainly server.js).
module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
