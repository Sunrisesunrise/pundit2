angular.module('Pundit2.Core')

.service('HttpRequestsDispatcher', function(BaseComponent, $q) {
    var disp = new BaseComponent('HttpRequestsDispatcher');

    var isEmbedded = true;

    if (window.chrome && chrome.runtime && chrome.runtime.id) {
       isEmbedded = false;
    }

    disp.sendHttpRequest = function(httpRequestObject){
        if(isEmbedded) return sendHttpRequest_embedVersion(convertHttpRequestForFetch(httpRequestObject));
        else return sendHttpRequest_chromeExtensionVersion(convertHttpRequestForFetch(httpRequestObject));
    }

    function convertHttpRequestForFetch(httpRequestObject){
        var newHttpRequestObject = {};

        //if(httpRequestObject.params!=null) alert('params ==== ' + JSON.stringify(httpRequestObject.params));

        //console.log('=======');console.log('=======');console.log('=======');console.log('=======');console.log('=======');console.log('=======');
        //console.log(httpRequestObject.params);
        //console.log('=======');console.log('=======');console.log('=======');console.log('=======');console.log('=======');console.log('=======');

        var url = httpRequestObject.url;

        var paramsAngularJson = false;
        if( httpRequestObject.paramsAngularJson ){
            paramsAngularJson = true;
            //alert('paramsAngularJson is True');
        }

        if( httpRequestObject.params!=null ){
            url += '?';
            Object.keys(httpRequestObject.params)
            .forEach(function(key){
                var paramKeyValue = httpRequestObject.params[key];

                if(!paramsAngularJson) paramKeyValue = JSON.stringify(paramKeyValue);

                url += key + '=' + encodeURI(paramKeyValue) + '&';
            });
            url = url.substring(0,url.length-1);
        }

        var urlSuffix = httpRequestObject.urlSuffix;
        urlSuffix = url.substring(url.indexOf(urlSuffix));
        // //     var url = httpRequestObject.url;
        //      var url = new URL(httpRequestObject.url);
        //      var urlSuffix = httpRequestObject.urlSuffix;
        //      if( httpRequestObject.params != null ){
        //        alert('params to serialize = ' + JSON.stringify(JSON.stringify(httpRequestObject.params)));
        // //       var parameters = $.param(httpRequestObject.params);
        // //       url += '?' + parameters;
        //        Object.keys(httpRequestObject.params)
        //        .forEach(function(key){
        //            url.searchParams.append(key, JSON.stringify(httpRequestObject.params[key]));
        //            //var value = httpRequestObject.params[key];
        //            //if(value === Object(value)){
        //            // Object.keys(value)
        //            // .forEach(function(innerKey){
        //            //     url.searchParams.append( key+'['+innerKey+']', value[innerKey]);
        //            // });
        //            //} else
        //            //url.searchParams.append(key, httpRequestObject.params[key]);
        //        });
        //      }

        //      urlSuffix = url.toString().substring(url.toString().indexOf(urlSuffix));
        // //   urlSuffix = url.substring(url.indexOf(urlSuffix));

        var relevantFields = ['method', 'headers', 'body', 'withCredentials', 'cache'];
        relevantFields.forEach(function(fieldName) {
          if(httpRequestObject.hasOwnProperty(fieldName)){
             if(fieldName=='cache'){
                 if(httpRequestObject[fieldName]==false)
                    httpRequestObject[fieldName] = 'no-cache';
                 else if(httpRequestObject[fieldName]==true)
                    httpRequestObject[fieldName] = 'default';
             }


               if(fieldName=='body' && (  typeof(httpRequestObject[fieldName])!=='string' ) ){
                // newHttpRequestObject.body={};
                // Object.keys(httpRequestObject.body)
                // .forEach(function(key){
                //    newHttpRequestObject.body[key] = JSON.stringify(httpRequestObject.body[key]); });
                newHttpRequestObject[fieldName] = JSON.stringify(httpRequestObject[fieldName]);
              } else
                 newHttpRequestObject[fieldName] = httpRequestObject[fieldName];
          }
        });

       return {
        'url':url,
        'urlSuffix':urlSuffix,
        'httpRequestObject':newHttpRequestObject
       };
    }


    function sendHttpRequest_embedVersion(httpRequestObjectTuple){
        var promise = $q.defer();

        var httpRequestObject = httpRequestObjectTuple.httpRequestObject;
        var url = httpRequestObjectTuple.url;
        var urlSuffix = httpRequestObjectTuple.urlSuffix;

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


    function sendHttpRequest_chromeExtensionVersion(httpRequestObjectTuple){
        var promise = $q.defer();
        chrome.runtime.sendMessage({isHttpRequest: true, httpRequestObjectTuple: httpRequestObjectTuple}, function(response){
                if(response.error==true){
                    promise.reject();
                }else{
                    var data = response;
                    //console.log('');console.log('');console.log('');console.log('');console.log('');
                    //console.log('----http request ('+httpRequestObjectTuple.urlSuffix+') response = ' + JSON.stringify(data));
                    //console.log('');console.log('');console.log('');console.log('');console.log('');
                    promise.resolve(data);
                }
        });
        return promise.promise;
    }


    return disp;
});