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
		    loginServer = data.loginServer;
		    editProfile = data.editProfile;
		    // user is not logged in

		    if (data.loginStatus === 0) {
		        isUserLogged = false;
		        EventDispatcher.sendEvent('MyPundit.isUserLogged', isUserLogged);
		        $cookies.remove('pundit_' + annotationServerBaseURLHash + '_User', {
		            path: '/'
		        });
		        $cookies.remove('pundit_' + annotationServerBaseURLHash + '_Info', {
		            path: '/'
		        });
		        promise.resolve(false);
		    }
		    else {
		        // user is logged in
		        isUserLogged = true;
		        loginStatus = 'loggedIn';
		        userData = data;
		        $cookies.putObject('pundit_' + annotationServerBaseURLHash + '_User', data, {
		            expires: expirationDate,
		            path: '/'
		        });
		        EventDispatcher.sendEvent('MyPundit.userLoggedData', userData);
		        promise.resolve(true);
		    }
		    EventDispatcher.sendEvent('MyPundit.isUserLogged', isUserLogged);
		    
		    if (dispatchDocumentEvent) {
		        EventDispatcher.sendEvent('Pundit.dispatchDocumentEvent', {
		            event: 'Pundit.userLoggedStatusChanged',
		            data: null
		        });
		    }
		}).error(function () {
		    myPundit.err('Server error');
		    EventDispatcher.sendEvent('Pundit.alert', {
		        title: 'Oops! Something went wrong.',
		        id: 'ERROR',
		        timeout: null,
		        message: 'There was an error while trying to communicate with server. Please reaload the page in few minutes'
		    });
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
		               myPundit.err('Server error');
		               EventDispatcher.sendEvent('Pundit.alert', {
		                   title: 'Oops! Something went wrong.',
		                   id: 'ERROR',
		                   timeout: null,
		                   message: 'There was an error while trying to communicate with server. Please reaload the page in few minutes'
		               });
		               promise.reject('check logged in promise error');
		        }else{
		              var data = response;
		              loginServer = data.loginServer;
		              editProfile = data.editProfile;

		              // user is not logged in
		              if (data.loginStatus === 0) {
		                  isUserLogged = false;
		                  EventDispatcher.sendEvent('MyPundit.isUserLogged', isUserLogged);
		                  $cookies.remove('pundit_' + annotationServerBaseURLHash + '_User', {
		                      path: '/'
		                  });
		                  $cookies.remove('pundit_' + annotationServerBaseURLHash + '_Info', {
		                      path: '/'
		                  });
		                  promise.resolve(false);
		              } else {
		                  // user is logged in
		                  isUserLogged = true;
		                  loginStatus = 'loggedIn';
		                  userData = data;
		                  $cookies.putObject('pundit_' + annotationServerBaseURLHash + '_User', data, {
		                      expires: expirationDate,
		                      path: '/'
		                  });
		                  EventDispatcher.sendEvent('MyPundit.userLoggedData', userData);
		                  promise.resolve(true);
		              }
		              EventDispatcher.sendEvent('MyPundit.isUserLogged', isUserLogged);

		              if (dispatchDocumentEvent) {
		                  EventDispatcher.sendEvent('Pundit.dispatchDocumentEvent', {
		                      event: 'Pundit.userLoggedStatusChanged',
		                      data: null
		                  });
		              }
		        }
		});

		return promise.promise;
	}






































    return disp;
});








