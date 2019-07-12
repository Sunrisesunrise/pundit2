angular.module('Pundit2.Communication')

.service('AnnotationsExchange', function(BaseComponent, NameSpace, MyPundit, Analytics, $q,
                                         HttpRequestsDispatcher) {

    // TODO: inherit from a Store()? Annotations, items, ...
    var annotationExchange = new BaseComponent("AnnotationsExchange");

    var annList = [],
        annListById = {},
        annByItemUri = {};

    annotationExchange.wipe = function() {
        annotationExchange.log('Wiping every loaded annotation.');
        annList = [];
        annListById = {};
    };

    // Returns a promise which gets resolved by an array of IDS of the annotations found.
    // If the user is logged in, the authenticated API is called, otherwise
    annotationExchange.searchByUri = function(uris) {
        var id;

        if (!angular.isArray(uris)) {
            uris = [uris];
        }

        annotationExchange.log('Searching for annotations with ' + uris.length + ' URIs from the server');

        var promise = $q.defer(),
            httpPromise,
            nsKey = (MyPundit.isUserLogged()) ? 'asAnnMetaSearch' : 'asOpenAnnMetaSearch',
            nsKeySuffx = (MyPundit.isUserLogged()) ? 'asAnnMetaSearchSuffix' : 'asOpenAnnMetaSearchSuffix';

        var httpPromise = HttpRequestsDispatcher.sendHttpRequest({
			headers: {
				'Accept': 'application/json'
			},
			method: 'GET',
			url: NameSpace.get(nsKey), // url used for normal embedded calls
            urlSuffix: NameSpace.get(nsKeySuffx), // urlSuffix used for the chrome extension
            // note: urlSuffix gets ignored when called by the embedded app
            cache: false,
            params: {
                scope: "all",
                query: {
                    resources: uris
                }
            },
			withCredentials: true
        });

		httpPromise.then(function(data) {
            Analytics.track('api', 'get', 'search');

            // TODO: check for emptyness? More edge cases?
            if (typeof(data) === "undefined") {
                promise.reject("Any data found on the response");
                return;
            }

            var ids = [];
            if (data.hasOwnProperty('AnnotationIDs')) {
                for (var i in data.AnnotationIDs) {
                    id = data.AnnotationIDs[i].match(/[a-z0-9]*$/);
                    if (id !== null) {
                        ids.push(id[0]);
                    }
                }
            } else {
                for (var annURI in data) {
                    id = annURI.match(/[a-z0-9]*$/);
                    if (id !== null) {
                        ids.push(id[0]);
                    }
                }
            }


            promise.resolve(ids);
            annotationExchange.log("Retrieved annotations IDs searching by URIs");
        }, function(error) {
            var err = "Error from server while searching for annotations by URIs: " + error.statusCode;
            promise.reject(err);
            annotationExchange.err(err);
            Analytics.track('api', 'error', 'get ' + nsKey, error.statusCode);
		});

        return promise.promise;
    };

    annotationExchange.addAnnotation = function(ann) {
        // TODO: sanity checks?
        if (ann.id in annListById) {
            annotationExchange.log('Not adding annotation ' + ann.id + ': already present.');
        } else {
            ann._q.promise.then(function(a) {
                if (typeof(a) !== "undefined" &&
                    typeof(a.graph) !== "undefined" &&
                    typeof(a.items) !== "undefined") {
                    annListById[ann.id] = a;
                    annList.push(a);
                    var uris = {};
                    for (var uri in a.items) {
                        if (uris[uri]) {
                            continue;
                        }
                        if (typeof annByItemUri[uri] === 'undefined') {
                            annByItemUri[uri] = [];
                        }
                        annByItemUri[uri].push(ann);
                        uris[uri] = true;
                    }
                }
            });
        }
    };

    annotationExchange.removeAnnotation = function(id) {
        var index;
        if (id in annListById) {
            var ann = annListById[id];
            for (var uri in ann.items) {
                if (typeof annByItemUri[uri] !== 'undefined') {
                    annByItemUri[uri] = annByItemUri[uri].filter(function(e) {
                        return e.id !== id;
                    });
                    if (annByItemUri[uri].length === 0) {
                        delete annByItemUri[uri];
                    }
                }
            }
            index = annList.indexOf(annListById[id]);
            annList.splice(index, 1);
            delete annListById[id];
        } else {
            annotationExchange.log('Impossible to remove annotation ' + id + ': not exist.');
        }
    };

    annotationExchange.updateAnnotationStructureInfo = function(id, oldItems) {
        var removedItems = {};

        if (id in annListById) {
            var ann = annListById[id];
            for (var i in oldItems) {
                if (typeof ann.items[i] === 'undefined') {
                    removedItems[i] = oldItems[i];
                    annByItemUri[i] = annByItemUri[i].filter(function(e) {
                        return e.id !== id;
                    });
                    if (annByItemUri[i].length === 0) {
                        delete annByItemUri[i];
                    }
                }
            }
            // TODO: check the previous structure of annByItemUri
            // to verify if the annotation was already present.
            var uris = {};
            for (var uri in ann.items) {
                if (uris[uri]) {
                    continue;
                }
                if (typeof annByItemUri[uri] === 'undefined') {
                    annByItemUri[uri] = [];
                }
                annByItemUri[uri].push(ann);
                uris[uri] = true;
            }
        }

        return removedItems;
    };

    annotationExchange.getAnnotations = function() {
        return annList;
    };

    annotationExchange.getAnnotationsHash = function() {
        return annListById;
    };

    annotationExchange.getAnnotationById = function(id) {
        if (id in annListById) {
            return annListById[id];
        }
        // If the item is not found, it will return undefined
    };

    annotationExchange.getAnnotationsByItem = function(uri) {
        var ret = [];

        ret = typeof annByItemUri[uri] !== 'undefined' ? annByItemUri[uri] : [];

        //for (var i in annList) {
        //    if (typeof(annList[i].items[uri]) !== 'undefined') {
        //        ret.push(annList[i]);
        //    }
        //}

        return ret;
    };

    annotationExchange.log('Component up and running');
    return annotationExchange;
});
