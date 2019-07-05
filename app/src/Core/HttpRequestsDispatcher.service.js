angular.module('Pundit2.Core')

.service('HttpRequestsDispatcher', function(BaseComponent, $http, $q) {
    var disp = new BaseComponent('HttpRequestsDispatcher');

    var isEmbedded = true;

    if (window.chrome && chrome.runtime && chrome.runtime.id) {
       isEmbedded = false;
    }

    disp.sendHttpRequest = function(httpRequestObject){
        if(isEmbedded) return sendHttpRequest_embedVersion(httpRequestObject);
        else return sendHttpRequest_chromeExtensionVersion(httpRequestObject);
    }


    function sendHttpRequest_embedVersion(httpRequestObject){
       var promise = $q.defer();
   
	   var url = new URL( httpRequestObject.url );
	   var urlSuffix = httpRequestObject.urlSuffix;
	   if( httpRequestObject.params != null )
		 Object.keys(httpRequestObject.params)
		 .forEach(function(key){ url.searchParams.append(key, JSON.stringify(httpRequestObject.params[key])) });

	   var method = httpRequestObject.method;
	   var headers = httpRequestObject.headers;
	   var body = httpRequestObject.body;
	   httpRequestObject = { 'method': method , 'headers': headers, 'body':body };

	   fetch(url,httpRequestObject).then(function(response) {
			   response.json().then(function(data){
			       //console.log('');console.log('');console.log('');console.log('');console.log('');
			       //console.log('--#--http request ('+urlSuffix+') response = ' + JSON.stringify(data));
			       //console.log('');console.log('');console.log('');console.log('');console.log('');
			       promise.resolve(data); 
			   });
		  }).catch(function(error) {
			promise.reject();
		});

        return promise.promise;
    }


    function sendHttpRequest_chromeExtensionVersion(httpRequestObject){
        var promise = $q.defer();
        chrome.runtime.sendMessage({isHttpRequest: true, httpRequestObject: httpRequestObject}, function(response){
                if(response.error==true){
                    promise.reject();
                }else{
                    var data = response;
				    //console.log('');console.log('');console.log('');console.log('');console.log('');
				    //console.log('----http request ('+httpRequestObject.urlSuffix+') response = ' + JSON.stringify(data));
				    //console.log('');console.log('');console.log('');console.log('');console.log('');
                    promise.resolve(data); 
                }
        });
        return promise.promise;
    }


    return disp;
});








