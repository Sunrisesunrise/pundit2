
const annotationServerBaseURL = null; // this url is replaced by grunt using the extension_conf.js file


function handleHttpRequest(httpRequestObject,sendResponse){

   var url = new URL( httpRequestObject.url );
   var urlSuffix = httpRequestObject.urlSuffix;
   if( httpRequestObject.params != null )
     Object.keys(httpRequestObject.params)
     .forEach(function(key){ url.searchParams.append(key, JSON.stringify(httpRequestObject.params[key])) });

   var method = httpRequestObject.method;
   var headers = httpRequestObject.headers;
   var body = httpRequestObject.body;
   var withCredentials = httpRequestObject.withCredentials;
   httpRequestObject = { 'method': method , 'headers': headers, 'data':body, 'withCredentials':withCredentials};

   fetch(url,httpRequestObject).then(function(response) {
           response.json().then(function(data){
            sendResponse(data);
           });
      }).catch(function(error) {
        sendResponse({'error':true,'status':error.status});
    });

   return true;
}
