angular.module('Pundit2.Core')

.service('HttpRequestsDispatcher', function(BaseComponent, NameSpace, EventDispatcher, $http, $cookies, $q) {
    var disp = new BaseComponent('HttpRequestsDispatcher');
    
    var isEmbedded = true;

    if (typeof chrome != "undefined") {
       isEmbedded = false;
    }



    disp.testFunction = function() {

        if(isEmbedded) alert('sending http normally!!!!!');
        else alert('sending http in chrome extension!!!!!');

    };



    disp.getAsUsersCurrent = function(extraData){
        var promise = extraData.promise;
        var annotationServerBaseURLHash = extraData.annotationServerBaseURLHash;
        var expirationDate = extraData.expirationDate;
        var dispatchDocumentEvent = extraData.dispatchDocumentEvent;

        if(isEmbedded) return embedded_getAsUsersCurrent(promise, 
                                                         annotationServerBaseURLHash,
                                                         expirationDate,
                                                         dispatchDocumentEvent);
        else return chromeExt_getAsUsersCurrent(promise,
                                                annotationServerBaseURLHash,
                                                expirationDate,
                                                dispatchDocumentEvent);
    }





    function embedded_getAsUsersCurrent(promise,annotationServerBaseURLHash,expirationDate,dispatchDocumentEvent){
        //alert('GET CURRENT USER EMBEDDED VERSION');

        httpCall = $http({
            headers: {
                'Accept': 'application/json'
            },
            method: 'GET',
            url: NameSpace.get('asUsersCurrent'),
            withCredentials: true

        }).success(function (data) {

            // user is not logged in
            if (data.loginStatus === 0) {
                EventDispatcher.sendEvent('MyPundit.handleUserIsLoggedFalse');
                promise.resolve(false);
            }
            else {
                EventDispatcher.sendEvent('MyPundit.handleUserIsLoggedTrue',data, expirationDate);
                // user is logged in
                promise.resolve(true);
            }
            EventDispatcher.sendEvent('MyPundit.updateUserLoggedStatus');

        }).error(function () {
            EventDispatcher.sendEvent('MyPundit.showGenericAlertError');
            promise.reject('check logged in promise error');
        });

        return promise.promise;
    }






    function chromeExt_getAsUsersCurrent(promise,annotationServerBaseURLHash,expirationDate,dispatchDocumentEvent){
        //alert('GET CURRENT USER EXTENSION VERSION');

        var httpObject = {
             headers: {
                 'Accept': 'application/json'
             },
             method: 'GET',
             urlSuffix: NameSpace.get('asUsersCurrentSuffix'),
             withCredentials: true
        }

        chrome.runtime.sendMessage({isHttpRequest: true, httpObject: httpObject}, function(response){
                console.log();
                console.log("################ HTTP GET response ----------> " + JSON.stringify(response));
                console.log();
                if(response.error==true){
                        EventDispatcher.sendEvent('MyPundit.showGenericAlertError');
                        promise.reject('check logged in promise error');
                }else{
                    var data = response;

                    // user is not logged in
                    if (data.loginStatus === 0) {
                        EventDispatcher.sendEvent('MyPundit.handleUserIsLoggedFalse');
                        promise.resolve(false);
                    }
                    else {
                        EventDispatcher.sendEvent('MyPundit.handleUserIsLoggedTrue',data, expirationDate);
                        // user is logged in
                        promise.resolve(true);
                    }
                    EventDispatcher.sendEvent('MyPundit.updateUserLoggedStatus');
                }
        });

        return promise.promise;
    }


    return disp;
});








