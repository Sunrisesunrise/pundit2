angular.module('Pundit2.Communication')
.constant('MODELBUILDERDEFAULTS', {

})
.service('ModelBuilder', function(BaseComponent, MODELBUILDERDEFAULTS, MyPundit, TripleComposer, NameSpace, TypesHelper) {

    var modelBuilder = new BaseComponent("ModelBuilder", MODELBUILDERDEFAULTS);

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

    modelBuilder.buildGraph = function(tripleComposerName) {
        var res = {},
            statements = TripleComposer.getStatements(tripleComposerName);

        statements.forEach(function(el) {
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
        });

        return res;
    };

    modelBuilder.buildItems = function(tripleComposerName) {
        var res = {},
            statements = TripleComposer.getStatements(tripleComposerName),
            val;

        statements.forEach(function(el) {
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

        });

        return res;
    };

    modelBuilder.buildTargets = function(tripleComposerName) {
        var res = {},
        statements = TripleComposer.getStatements(tripleComposerName);

        return res;
    };

    return modelBuilder;
});
