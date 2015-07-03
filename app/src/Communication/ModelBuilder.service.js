angular.module('Pundit2.Communication')
.constant('MODELBUILDERDEFAULTS', {
    annotationServerPrefix: 'http://purl.org/pundit/local/'
})
.service('ModelBuilder', function(BaseComponent, MODELBUILDERDEFAULTS, Consolidation, XpointersHelper, MyPundit, TripleComposer, NameSpace, TypesHelper, md5) {

    var modelBuilder = new BaseComponent("ModelBuilder", MODELBUILDERDEFAULTS);

    var targetURIs = function(uri) {
        var md5URI = md5.createHash(uri);
        return {
            'target': modelBuilder.options.annotationServerPrefix + 'target/' + md5URI,
            'selector': modelBuilder.options.annotationServerPrefix + 'selector/' + md5URI
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
            res[triple.subject.uri][triple.predicate.uri] = [modelBuilder.buildObject(triple.object)];
        }
        else {
            // subject uri already exists
            if (typeof(res[triple.subject.uri][triple.predicate.uri]) === 'undefined') {
                // predicate uri not exist (happy it's easy)
                res[triple.subject.uri][triple.predicate.uri] = [modelBuilder.buildObject(triple.object)];
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
                    arr.push(modelBuilder.buildObject(triple.object));
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

    var addTargetElem = function(el, res) {
        var triple = el.scope.get(),
            uris;

        // Skip incomplete triple.
        if (triple.subject === null || triple.predicate === null || triple.object === null) {
            return;
        }

        // Subject.
        [triple.subject, triple.object].forEach(function (a, i, arr) {
            var statementPart = arr[i];
            if (typeof statementPart === 'string') {
                return;
            }
            if (statementPart.isTextFragment() ||
            statementPart.isImage() ||
            statementPart.isImageFragment() ||
            statementPart.isWebPage()
            ) {
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
                    // hasSelector.
                    target[NameSpace.annotation.hasSelector] = [
                        {
                            "value": uris.selector,
                            "type": "uri"
                        }
                    ];
                    // hasScope.
                    target[NameSpace.annotation.hasScope] = [
                        {
                            "value": XpointersHelper.getSafePageContext(),
                            "type": "uri"
                        }
                    ];
                    // hasSource.
                    target[NameSpace.annotation.hasSource] = [
                        {
                            "value": XpointersHelper.getSafePageContext(),
                            "type": "uri"
                        }
                    ];
                    // type
                    target[NameSpace.rdf.type] = [];
                    for (var i in statementPart.type) {
                        target[NameSpace.rdf.type].push({
                            'value': statementPart.type[i],
                            'type': 'uri'
                        });
                    }

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

                        // Value
                        selector[NameSpace.rdfs.label] = [
                            {
                                "value": statementPart.label,
                                "type": "literal"
                                // "lang": "it"
                            }
                        ];
                    }
                    else {
                        // TODO check other types.
                    }

                    res[uris.target] = target;
                    res[uris.selector] = selector;

                }
            }
        });
    };

    modelBuilder.buildObject = function(item) {
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

    modelBuilder.buildGraph = function(statements) {
        var res = {};

        statements.forEach(function(el) {
            addGraphElem(el, res);
        });

        return res;
    };

    modelBuilder.buildItems = function(statements) {
        var res = {},
            val;

        statements.forEach(function(el) {
            addItemElem(el, res, val);
        });

        return res;
    };

    modelBuilder.buildTargets = function(statements) {
        var res = {};
        statements.forEach(function(el) {
            addTargetElem(el, res);
        });
        return res;
    };

    modelBuilder.buildAllData = function(statements) {
        var res = {
                'graph': {},
                'items': {},
                'target': {}
            },
            val;

        statements.forEach(function(el) {
            addGraphElem(el, res.graph);
            addItemElem(el, res.items, val);
            addTargetElem(el, res.target);
        });

        return res;
    };

    return modelBuilder;
});
