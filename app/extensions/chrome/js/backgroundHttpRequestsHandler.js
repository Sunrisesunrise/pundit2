// Javascript file used for the handling of http request from 
// the chrome-extension version of pundit


// Note: The following url is hard-coded for development purposes,
// it gets replaced by grunt using the extension_conf.js file at build time
const annotationServerBaseURL = 'https://thepund.it/annotationserver/';


// Function used to send an httpRequest to the annotation server
// Takes as input an httpRequestObjectTuple containing the request's parameters
// and a standard sendResponse callback function used to send the response to the caller.
// The function returns true which is used to prevent the termination of the sending event.
function handleHttpRequest(httpRequestObjectTuple,sendResponse){

   var url = annotationServerBaseURL + httpRequestObjectTuple.urlSuffix;
   var httpRequestObject = httpRequestObjectTuple.httpRequestObject;
   httpRequestObject.mode = 'cors';

   fetch(url,JSON.parse(JSON.stringify(httpRequestObject))).then(function(response) {
           response.text().then(function(data){
            sendResponse(JSON.parse(data));
           });
      }).catch(function(error) {
        sendResponse({'error':true,'status':error.status});
    });

   return true;
}
