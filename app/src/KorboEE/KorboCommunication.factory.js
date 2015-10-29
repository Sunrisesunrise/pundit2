/*jshint camelcase: false*/

angular.module('KorboEE')
.factory('KorboCommunicationFactory', function($q, $http, Item, ItemsExchange){
    // selector instance constructor
    var KorboCommFactory = function(){

    };

    // this method accept the following parameters
    // param = {
    //   endpoint
    //   label
    //   provider
    //   offset
    //   limit
    //   language
    // }
    //
    // container: where add items
    //
    KorboCommFactory.prototype.search = function(param, container, useCredentialInHttpCalls){
        var promise = $q.defer();
        if (typeof useCredentialInHttpCalls !== 'boolean') {
            useCredentialInHttpCalls = false;
        }
        $http({
            //headers: { 'Content-Type': 'application/json' },
            method: 'GET',
            url: param.endpoint + "/search/items",
            cache: false,
            withCredentials: useCredentialInHttpCalls,
            params: {
                q: param.label,
                p: param.provider,
                limit: param.limit,
                offset: param.offset,
                lang: param.language,
                basketId: param.basketID
            }

        }).success(function(res){
            // wipe container
            ItemsExchange.wipeContainer(container);
            // for each results...
            for(var i=0; i<res.data.length; i++){
                var item = {
                        uri: res.data[i].id,
                        label: res.data[i].label,
                        description: "",
                        depiction: "",
                        type: ['']
                        };
                // ... create an item...
                var itemToAdd = new Item(item.uri, item);
                // ... and add it to container
                ItemsExchange.addItemToContainer(itemToAdd, container);
            }

            promise.resolve();
        }).error(function(){
            promise.reject();
        });

        return promise.promise;
    };

    // this method accept the following parameters
    // param = {
    //   endpoint
    //   item
    //   provider
    //   basketID
    //   language
    // }
    //

    KorboCommFactory.prototype.getItem = function(param, useCache, useCredentialInHttpCalls){
        var promise = $q.defer();
        var currentLanguage = angular.copy(param.language);
        if (typeof useCredentialInHttpCalls !== 'boolean') {
            useCredentialInHttpCalls = false;
        }
        $http({
            headers: { 'Accept-Language': param.language, 'Accept': 'application/json' },
            method: 'GET',
            url: param.endpoint + "/baskets/"+param.basketID+"/items/"+param.item.uri+"",
            cache: useCache,
            withCredentials: useCredentialInHttpCalls,
            params: {
                p: param.provider
            }
        }).success(function(res){
            res.reqLanguage = currentLanguage;
            promise.resolve(res);
        }).error(function(){
            promise.reject();
        });

        return promise.promise;
    };

    // save an entity
    KorboCommFactory.prototype.save = function(entity, lan, baseURL, basketID, useCredentialInHttpCalls){
        var promise = $q.defer();
        if (typeof useCredentialInHttpCalls !== 'boolean') {
            useCredentialInHttpCalls = false;
        }
        $http({
            headers: {'Access-Control-Expose-Headers': "Location", 'Content-Language': lan},
            method: 'POST',
            async: false,
            url: baseURL + "/baskets/" + basketID + "/items",
            withCredentials: useCredentialInHttpCalls,
            data: entity
        }).success(function(data, status, headers){
            var location = headers('Location');
            promise.resolve(location);
        }).error(function(){
            promise.reject();
        });

        return promise.promise;
    };

    // save an entity
    KorboCommFactory.prototype.saveAllLanguages = function(entityID, languagesData, baseURL, basketID, useCredentialInHttpCalls){
        var promise = $q.defer();
        if (typeof useCredentialInHttpCalls !== 'boolean') {
            useCredentialInHttpCalls = false;
        }
        $http({
            headers: {'Access-Control-Expose-Headers': "Location"},
            method: 'POST',
            async: false,
            url: baseURL + "/baskets/" + basketID + "/languages/" + entityID,
            withCredentials: useCredentialInHttpCalls,
            data: languagesData
        }).success(function(data, status, headers){
            var location = headers('Location');
            promise.resolve(location);
        }).error(function(){
            promise.reject();
        });

        return promise.promise;
    };

    // save an entity
    KorboCommFactory.prototype.addItemCustomFields = function(baseURL, language, basketID, triplesData, useCredentialInHttpCalls) {
        var promise = $q.defer();
        if (typeof useCredentialInHttpCalls !== 'boolean') {
            useCredentialInHttpCalls = false;
        }
        $http({
            headers: {'Access-Control-Expose-Headers': "Location", 'Content-Language': language},
            method: 'POST',
            async: false,
            url: baseURL + "/baskets/" + basketID + "/items/add",
            withCredentials: useCredentialInHttpCalls,
            data: triplesData
        }).success(function(data, status, headers){
            var location = headers('Location');
            promise.resolve(location);
        }).error(function(){
            promise.reject();
        });

        return promise.promise;
    };

    return KorboCommFactory;
});