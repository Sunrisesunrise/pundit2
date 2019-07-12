
// Note: The following url is replaced by grunt using the extension_conf.js file at build time
const annotationServerBaseURL = 'https://thepund.it/annotationserver/';


function handleHttpRequest(httpRequestObjectTuple,sendResponse){

   var url = annotationServerBaseURL + httpRequestObjectTuple.urlSuffix;
   var httpRequestObject = httpRequestObjectTuple.httpRequestObject;
   httpRequestObject.mode = 'cors';

   //alert('sending ' + JSON.stringify(httpRequestObject) + ' to ' + url );
   fetch(url,JSON.parse(JSON.stringify(httpRequestObject))).then(function(response) {
           response.text().then(function(data){
            //alert('OK! ('+url.toString()+') got response: ' + JSON.stringify(data));
            sendResponse(JSON.parse(data));
           });
      }).catch(function(error) {
        //alert('NO! ('+url.toString()+') got response: ' + JSON.stringify(error));
        sendResponse({'error':true,'status':error.status});
    });

   return true;
}
