
const annotationServerBaseURL = null; // this url is replaced by grunt using the extension_conf.js file

function handleHttpRequest(httpObject,sendResponse){

   //alert('GET /users/current from HTTP REQUESTS HANDLER!');

   var url = annotationServerBaseURL + httpObject.urlSuffix ;
   fetch(url,{
     method: httpObject.method,// as 'GET' or 'POST'
     mode: 'cors', // for CORS communications
     headers: httpObject.headers, // tipically : {'Content-Type': 'application/json'}
     withCredentials: httpObject.withCredentials
   }).then(function(response) {
           response.json().then(function(data){
               sendResponse(data);
           });
      }).catch(function(error) {
        sendResponse({'error':true});
    });

   return true;
}

