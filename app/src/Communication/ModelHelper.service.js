angular.module('Pundit2.Communication')
.constant('modelHelperDEFAULTS', {
    annotationServerPrefix: 'http://purl.org/pundit/local/',
    mode: "mode1" // mode1 or mode2
})
.service('ModelHelper', function(BaseComponent, modelHelperDEFAULTS, Consolidation, XpointersHelper, MyPundit, NameSpace, TypesHelper, md5) {

    var modelHelper = new BaseComponent("ModelHelper", modelHelperDEFAULTS);

    var error = false,
        errorMessage = '';

    var targetURIs = function(uri) {
        var md5URI = md5.createHash(uri);
        return {
            'target': modelHelper.options.annotationServerPrefix + 'target/' + md5URI,
            'selector': modelHelper.options.annotationServerPrefix + 'selector/' + md5URI
        };
    };

    var addGraphElem = function(el, res) {
        var triple = el.scope.get();
        // skip incomplete triple
        if (triple.subject === null || triple.predicate === null || triple.object === null) {
            return;
        }
        if (typeof(res[triple.subject.uri]) === 'undefined') {
            // subject uri not exist (happy it's easy)
            res[triple.subject.uri] = {};
            // predicate uri not exist
            res[triple.subject.uri][triple.predicate.uri] = [modelHelper.buildObject(triple.object)];
        }
        else {
            // subject uri already exists
            if (typeof(res[triple.subject.uri][triple.predicate.uri]) === 'undefined') {
                // predicate uri not exist (happy it's easy)
                res[triple.subject.uri][triple.predicate.uri] = [modelHelper.buildObject(triple.object)];
            }
            else {
                // predicate uri already exists
                var u = triple.object.uri,
                arr = res[triple.subject.uri][triple.predicate.uri];
                // search object
                var found = arr.some(function(o) {
                    return angular.equals(o.value, u);
                });
                // object not eqaul (happy it's easy)
                if (!found) {
                    arr.push(modelHelper.buildObject(triple.object));
                }
            }
        }
    };

    var addItemElem = function(el, res, val) {
        var triple = el.scope.get();

        // skip incomplete triple
        if (triple.subject === null || triple.predicate === null || triple.object === null) {
            return;
        }

        // check if items are image fragment
        // in this case add the polygon to the items list
        if (typeof(triple.subject.polygon) !== 'undefined' && typeof(triple.subject.polygonUri) !== 'undefined') {
            // make a polygon rdf object
            res[triple.subject.polygonUri] = {};
            res[triple.subject.polygonUri][NameSpace.item.type] = [{
                type: 'uri',
                value: NameSpace.selectors.polygonType
            }];
            val = {
                type: 'polygon',
                points: triple.subject.polygon
            };
            res[triple.subject.polygonUri][NameSpace.rdf.value] = [{
                type: 'literal',
                value: angular.toJson(val)
            }];
        }
        if (typeof(triple.object.polygon) !== 'undefined' && typeof(triple.object.polygonUri) !== 'undefined') {
            // make a polygon rdf object
            res[triple.object.polygonUri] = {};
            res[triple.object.polygonUri][NameSpace.item.type] = [{
                type: 'uri',
                value: NameSpace.selectors.polygonType
            }];
            val = {
                type: 'polygon',
                points: triple.object.polygon
            };
            res[triple.object.polygonUri][NameSpace.rdf.value] = [{
                type: 'literal',
                value: angular.toJson(val)
            }];
        }

        // add item and its rdf properties
        res[triple.subject.uri] = triple.subject.toRdf();

        res[triple.predicate.uri] = triple.predicate.toRdf();

        // discard literals
        if (typeof(triple.object.uri) !== 'undefined') {
            res[triple.object.uri] = triple.object.toRdf();
            // add object types and its label
            triple.object.type.forEach(function(e, i) {
                var type = triple.object.type[i];
                res[type] = {};
                res[type][NameSpace.rdfs.label] = [{
                    type: 'literal',
                    value: TypesHelper.getLabel(e)
                }];
            });
        }

        // add subject types and its label
        triple.subject.type.forEach(function(e, i) {
            var type = triple.subject.type[i];
            res[type] = {};
            res[type][NameSpace.rdfs.label] = [{
                type: 'literal',
                value: TypesHelper.getLabel(e)
            }];
        });

        // add predicate types and its label
        triple.predicate.type.forEach(function(e, i) {
            var type = triple.predicate.type[i];
            res[type] = {};
            res[type][NameSpace.rdfs.label] = [{
                type: 'literal',
                value: TypesHelper.getLabel(e)
            }];
        });
    }

    var addTargetElem = function(el, res, flat) {
        var triple = el.scope.get(),
            uris;

        // Skip incomplete triple.
        if (triple.subject === null || triple.predicate === null || triple.object === null) {
            return;
        }

        // Subject.
        [triple.subject, triple.object].forEach(function (a, i, arr) {
            // TODO: add code to handle imageFragments.
            var statementPart = arr[i];
            if (typeof statementPart === 'string') {
                return;
            }
            if (statementPart.isTarget()) {
                uris = targetURIs(statementPart.uri);
                // If it's not already present.
                if (typeof res[uris.target] === 'undefined') {
                    var target = {};
                    var selector = {};

                    // Building target info.
                    // isPartOf.
                    if (statementPart.hasOwnProperty('isPartOf')) {
                        target[NameSpace.item.isPartOf] = [
                            {
                                "value": statementPart.isPartOf,
                                "type": "uri"
                            }
                        ];
                    }
                    if (!statementPart.isWebPage()) {
                        // hasSelector.
                        target[NameSpace.annotation.hasSelector] = [
                            {
                                "value": uris.selector,
                                "type": "uri"
                            }
                        ];

                        if (statementPart.hasOwnProperty('pageContext')) {
                            // hasScope.
                            target[NameSpace.annotation.hasScope] = [
                                {
                                    "value": statementPart.pageContext,
                                    "type": "uri"
                                }
                            ];
                            // hasSource.
                            target[NameSpace.annotation.hasSource] = [
                                {
                                    "value": statementPart.isImage() ? statementPart.image : statementPart.pageContext,
                                    "type": "uri"
                                }
                            ];
                        }
                        else {
                            error = true;
                            errorMessage = 'Page context missing! Cannot proceed with annotation build.';
                            return;
                        }
                    }

                    // type
                    target[NameSpace.rdf.type] = [];
                    for (var i in statementPart.type) {
                        target[NameSpace.rdf.type].push({
                            'value': statementPart.type[i],
                            'type': 'uri'
                        });
                    }

                    if (!statementPart.isWebPage()) {
                        // Building selector info.
                        // conformsTo.
                        selector[NameSpace.target.conformsTo] = [
                            {
                                "value": "http://tools.ietf.org/rfc/rfc3023",
                                "type": "uri"
                            }
                        ];

                        // Type
                        if (statementPart.isTextFragment() || statementPart.isImage()) {
                            selector[NameSpace.rdf.type] = [
                                {
                                    "value": NameSpace.target.fragmentSelector,
                                    "type": "uri"
                                }
                            ];

                            // Label
                            selector[NameSpace.rdfs.label] = [
                                {
                                    "value": statementPart.label,
                                    "type": "literal"
                                    // "lang": "it"
                                }
                            ];

                            // Value
                            selector[NameSpace.rdf.value] = [
                                {
                                    "value": statementPart.uri,
                                    "type": "literal"
                                    // "lang": "it"
                                }
                            ];
                        }
                        else {
                            // TODO check other types.
                        }

                        // Add selector info only if it's not a webpage.
                        res[uris.selector] = selector;
                    }

                    res[uris.target] = target;
                    flat.push(statementPart.uri);
                }
            }
        });
    };

    modelHelper.buildObject = function(item) {
        if (typeof(item) === 'string') {
            // date or literal
            return {
                type: 'literal',
                value: item
            };
        } else {
            return {
                type: 'uri',
                value: item.uri
            };
        }
    };

    modelHelper.buildGraph = function(statements) {
        var res = {};

        statements.forEach(function(el) {
            addGraphElem(el, res);
        });

        return res;
    };

    modelHelper.buildItems = function(statements) {
        var res = {},
            val;

        statements.forEach(function(el) {
            addItemElem(el, res, val);
        });

        return res;
    };

    modelHelper.buildTargets = function(statements) {
        var res = {};
        var flat = [];
        statements.forEach(function(el) {
            addTargetElem(el, res, flat);
        });

        return {
            'obj': res,
            'flat': flat
        };
    };

    modelHelper.buildAllData = function(statements) {
        error = false;
        errorMessage = '';
        var res = {
                'graph': {},
                'items': {},
                'target': {},
                'flatTargets': []
            },
            val;

        statements.forEach(function(el) {
            addGraphElem(el, res.graph);
            addItemElem(el, res.items, val);
            addTargetElem(el, res.target, res.flatTargets);
        });
        
        if (modelHelper.options.mode === 'mode1') {
            res.target = undefined;
        }

        return res;
    };

    modelHelper.getLastError = function() {
        return {
            error: error,
            errorMessage: errorMessage
        }
    };

    modelHelper.hasError = function() {
        return !error;
    };

    modelHelper.parseAnnotations = function(data) {
        if( typeof(data) === "undefined" ||
            typeof(data.graph) === "undefined" ||
            typeof(data.metadata) === "undefined" ||
            typeof(data.items) === "undefined" ||
            typeof(data.target) === "undefined") {
            error = true;
            errorMessage = "Malformed annotations data";
            return;
        }

        // Cycling metadata.
        for (var metadataURI in data.metadata) {
            // Get metadata object
            var metadata = data.metadata[metadataURI];
            // Get graph URI.
            var graphURI = metadata.hasBody[0].value;
            // Get graph.
            var graph = data.graph[graphURI];
        }
    };

    return modelHelper;
});
